
import * as admin from 'firebase-admin';

let serviceAccount: admin.ServiceAccount;

// Check if the service account key is available as an environment variable
if (process.env.SERVICE_ACCOUNT) {
  try {
    // Parse the service account key from the environment variable
    serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
  } catch (error) {
    console.error('Error parsing SERVICE_ACCOUNT environment variable:', error);
    process.exit(1);
  }
} else {
  // Fallback to requiring the file for local development
  try {
    // We are using require here because the service account key is a JSON file.
    // Using a direct import can sometimes cause issues with module resolution.
    serviceAccount = require('../../../serviceAccountKey.json');
  } catch (error) {
    console.error('serviceAccountKey.json not found. Please set the SERVICE_ACCOUNT environment variable or create the file for local development.');
    process.exit(1);
  }
}


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
