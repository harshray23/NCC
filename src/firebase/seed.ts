import { auth, db } from './admin';
import { FieldValue } from 'firebase-admin/firestore';

const seedDatabase = async () => {
  console.log('--- COMMAND PORTAL DATABASE SEED INITIALIZED ---');
  
  if (!auth || !db) {
    console.error('CRITICAL ERROR: Firebase Admin not initialized. Check your .env file.');
    process.exit(1);
  }

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

      await auth.setCustomUserClaims(userRecord.uid, { role: userData.role });
      console.log(`- SECURITY CLAIMS ASSIGNED: role=${userData.role}`);

      const userDoc: { [key: string]: any; } = {
        displayName: userData.displayName,
        email: userData.email,
        role: userData.role,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
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
