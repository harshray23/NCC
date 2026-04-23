'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  collection,
  onSnapshot,
  Query,
  query,
  collectionGroup,
} from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

interface UseCollectionOptions {
  q?: (ref: any) => Query;
  isCollectionGroup?: boolean;
}

export function useCollection<T>(
  path: string,
  options: UseCollectionOptions = {},
) {
  const { q, isCollectionGroup } = options;
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const ref = useMemo(
    () => {
      if (!firestore || !path) return null;
      return isCollectionGroup
        ? collectionGroup(firestore, path)
        : collection(firestore, path);
    },
    [firestore, path, isCollectionGroup],
  );

  const finalQuery = useMemo(() => (q && ref ? q(ref) : ref), [q, ref]);

  useEffect(() => {
    if (!finalQuery) {
      setLoading(false);
      setData(null);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      finalQuery,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as T,
        );
        setData(docs);
        setLoading(false);
      },
      (err) => {
        const permissionError = new FirestorePermissionError({
          path: path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [finalQuery, path]);

  return { data, loading, error };
}
