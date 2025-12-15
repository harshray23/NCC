import * as admin from 'firebase-admin';

// This is the only place where the service account is imported.
// We are using require here because the service account key is a JSON file.
// Using a direct import can sometimes cause issues with module resolution.
const serviceAccount = require('../../serviceAccountKey.json');

// Check if the app is already initialized to prevent errors.
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
}

// Export the initialized admin services.
// These can be imported and used in any server-side code.
export const auth = admin.auth();
export const db = admin.firestore();
