'use client';
import { createContext, useContext, ReactNode, memo } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';

interface FirebaseClientContextValue {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
}

const FirebaseClientContext = createContext<
  FirebaseClientContextValue | undefined
>(undefined);

export const useFirebaseClient = () => {
  const context = useContext(FirebaseClientContext);
  if (context === undefined) {
    throw new Error(
      'useFirebaseClient must be used within a FirebaseClientProvider',
    );
  }
  return context;
};

export const FirebaseClientProvider = memo(function FirebaseClientProvider({
  children,
  app,
  auth,
  firestore,
  storage,
}: {
  children: ReactNode;
} & FirebaseClientContextValue) {
  return (
    <FirebaseClientContext.Provider value={{ app, auth, firestore, storage }}>
      {children}
    </FirebaseClientContext.Provider>
  );
});
