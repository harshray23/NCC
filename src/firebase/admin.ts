
import * as admin from 'firebase-admin';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

if (getApps().length === 0) {
  // This is the recommended secure way to initialize the Admin SDK.
  // It uses environment variables, which are set in your hosting environment.
  // This prevents your private key from being checked into source control.
  const credential = cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // When storing the private key in an environment variable, newlines
    // must be escaped. The 'replace' function un-escapes them.
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  });

  initializeApp({
    credential,
  });
}

// Export the initialized admin services.
// These can be imported and used in any server-side code.
export const auth = admin.auth();
export const db = admin.firestore();
