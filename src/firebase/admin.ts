
import * as admin from 'firebase-admin';
import { cert, getApps, initializeApp, getApp } from 'firebase-admin/app';

function getAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    const missing = [];
    if (!projectId) missing.push('FIREBASE_PROJECT_ID');
    if (!clientEmail) missing.push('FIREBASE_CLIENT_EMAIL');
    if (!privateKey) missing.push('FIREBASE_PRIVATE_KEY');
    
    if (typeof window === 'undefined') {
      console.warn(`Firebase Admin: Missing environment variables: ${missing.join(', ')}. Administrative operations will fail.`);
    }
    return null;
  }

  // Handle potential double-escaped newlines and multi-line strings
  privateKey = privateKey.replace(/\\n/g, '\n');
  // If it's wrapped in extra quotes from .env, strip them
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.substring(1, privateKey.length - 1);
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const app = getAdminApp();

// Only export auth and db if app was successfully initialized to avoid crash on import
export const auth = app ? admin.auth(app) : ({} as admin.auth.Auth);
export const db = app ? admin.firestore(app) : ({} as admin.firestore.Firestore);
