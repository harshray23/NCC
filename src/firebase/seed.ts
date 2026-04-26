
import dotenv from 'dotenv';
// Load environment variables before any other imports
dotenv.config();

import { firestore } from 'firebase-admin';
import { auth, db } from './admin';

const seedDatabase = async () => {
  console.log('--- COMMAND PORTAL DATABASE SEED INITIALIZED ---');
  
  // Verify Env Vars
  const requiredVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
  const missing = requiredVars.filter(v => !process.env[v]);
  
  if (missing.length > 0) {
    console.error('CRITICAL ERROR: Missing environment variables in .env:', missing.join(', '));
    console.error('Please ensure your .env file is in the project root and contains these keys.');
    process.exit(1);
  }

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
      console.log(`\nPROVISIONING ACCESS: ${userData.email}...`);
      
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(userData.email);
        console.log(`- IDENTITY VERIFIED: User already exists.`);
      } catch (e: any) {
        if (e.code === 'auth/user-not-found') {
          userRecord = await auth.createUser({
            email: userData.email,
            password: userData.password,
            displayName: userData.displayName,
          });
          console.log(`- AUTH RECORD CREATED: Success.`);
        } else {
          throw e;
        }
      }

      // 2. Set custom claim for role-based access control
      await auth.setCustomUserClaims(userRecord.uid, { role: userData.role });
      console.log(`- SECURITY CLAIMS ASSIGNED: role=${userData.role}`);

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
      
      await db.collection('users').doc(userRecord.uid).set(userDoc, { merge: true });
      console.log(`- FIRESTORE DOSSIER INITIALIZED: Success.`);

    } catch (error: any) {
      console.error(`\nPROTOCOL FAILURE for ${userData.email}:`, error.message);
    }
  }

  console.log('\n--- DATABASE SEED PROTOCOL COMPLETE ---');
  process.exit(0);
};

seedDatabase().catch((err) => {
  console.error('\nCRITICAL SEED SCRIPT FAILURE:', err);
  process.exit(1);
});
