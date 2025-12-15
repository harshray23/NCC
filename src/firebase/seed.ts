
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../../serviceAccountKey.json');

// Initialize Firebase Admin SDK
try {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
  }
} catch (error: any) {
    if (error.code !== 'app/duplicate-app') {
        console.error('Firebase Admin SDK initialization error:', error);
        process.exit(1);
    }
}

const auth = admin.auth();
const db = admin.firestore();

const seedDatabase = async () => {
  console.log('Starting database seed...');
  const serverTimestamp = firestore.FieldValue.serverTimestamp();

  const usersToSeed = [
    {
      displayName: 'Harsh',
      regimentalNumber: 'WB2024SDIA9160860',
      email: 'wb2024sdia9160860@cadet.ncc.portal',
      password: 'harsh@1234',
      role: 'cadet' as const,
      year: 1,
      dept: 'CSE',
    },
    {
      displayName: 'Raj Pattanayak',
      email: 'raj2105pattanayak@gmail.com',
      password: 'ncc@123',
      role: 'admin' as const,
    },
    {
      displayName: 'Harsh Ray',
      email: 'harshray2007@gmail.com',
      password: 'Harsh@2007',
      role: 'manager' as const,
    },
  ];

  for (const userData of usersToSeed) {
    try {
      // 1. Create user in Firebase Authentication
      const userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.displayName,
      });
      console.log(`Successfully created auth user: ${userData.email}`);

      // 2. Set custom claim for role-based access control
      await auth.setCustomUserClaims(userRecord.uid, { role: userData.role });

      // 3. Create a corresponding user document in Firestore
      const userDoc: { [key: string]: any; } = {
        displayName: userData.displayName,
        email: userData.email,
        role: userData.role,
        createdAt: serverTimestamp,
        updatedAt: serverTimestamp,
        phone: '',
      };

      if (userData.role === 'cadet') {
        userDoc.regimentalNumber = userData.regimentalNumber;
        userDoc.year = userData.year;
        userDoc.dept = userData.dept;
      }
      
      await db.collection('users').doc(userRecord.uid).set(userDoc);
      console.log(`Created firestore document for: ${userData.email}`);

    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        console.log(`User with email ${userData.email} already exists. Skipping.`);
      } else {
        console.error(`Error creating user ${userData.email}:`, error.message);
      }
    }
  }

  console.log('Database seed finished.');
  setTimeout(() => process.exit(0), 1000);
};

seedDatabase();
