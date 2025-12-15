'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  memo,
  useState,
  useEffect,
} from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { initializeFirebase } from './';
import { FirebaseClientProvider } from './client-provider';
import { firebaseConfig } from './config';

interface FirebaseContextValue {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined,
);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
export const useFirebaseApp = () => useFirebase().app;
export const useFirestore = () => useFirebase().firestore;
export const useAuth = () => useFirebase().auth;

export const FirebaseProvider = memo(function FirebaseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const firebase = useMemo(() => {
    if (!firebaseConfig) {
      return null;
    }
    return initializeFirebase();
  }, []);

  if (!firebase) {
    // This can happen if the config is not set.
    // The initializeFirebase function will throw an error in this case.
    return <>{children}</>;
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      <FirebaseClientProvider {...firebase}>{children}</FirebaseClientProvider>
    </FirebaseContext.Provider>
  );
});
