'use client';
import {
  initializeApp,
  getApp,
  getApps,
  FirebaseApp,
} from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

import { firebaseConfig } from './config';
import { FirebaseClientProvider } from './client-provider';

export function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
} {
  if (!firebaseConfig) {
    throw new Error(
      'Firebase config is missing. Please add it to src/firebase/config.ts'
    );
  }
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  return { app, auth, firestore, storage };
}

export { FirebaseClientProvider };
export { useFirebase, useFirebaseApp, useFirestore, useAuth, useStorage } from './provider';
export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
