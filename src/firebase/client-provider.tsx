'use client';
import { createContext, useContext, ReactNode, memo } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

interface FirebaseClientContextValue {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
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
}: {
  children: ReactNode;
} & FirebaseClientContextValue) {
  return (
    <FirebaseClientContext.Provider value={{ app, auth, firestore }}>
      {children}
    </FirebaseClientContext.Provider>
  );
});
