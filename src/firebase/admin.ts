
import * as admin from 'firebase-admin';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

if (getApps().length === 0) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
    // Handle potential double-escaped newlines and multi-line strings
    privateKey = privateKey.replace(/\\n/g, '\n');
    // If it's wrapped in extra quotes from .env, strip them
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.substring(1, privateKey.length - 1);
    }
  }

  if (projectId && clientEmail && privateKey) {
    const credential = cert({
      projectId,
      clientEmail,
      privateKey,
    });

    initializeApp({
      credential,
    });
  } else {
    // Only log error in server context where it's needed
    if (typeof window === 'undefined') {
        console.warn('Firebase Admin: Missing environment variables. Administrative operations will fail.');
    }
  }
}

export const auth = admin.auth();
export const db = admin.firestore();
