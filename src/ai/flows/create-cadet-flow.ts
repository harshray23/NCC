'use server';
/**
 * @fileOverview A Genkit flow for creating a new cadet user.
 *
 * - createCadet - A function that handles the cadet creation process.
 * - CreateCadetInput - The input type for the createCadet function.
 * - CreateCadetOutput - The return type for the createCadet function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { auth, db } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const CreateCadetInputSchema = z.object({
  displayName: z.string().describe("The cadet's full name."),
  regimentalNumber: z.string().describe("The cadet's unique regimental number."),
  year: z.number().describe("The cadet's year of study (1, 2, or 3)."),
  dept: z.string().describe("The cadet's department/branch."),
  password: z.string().min(6).describe("The initial password for the cadet."),
});
export type CreateCadetInput = z.infer<typeof CreateCadetInputSchema>;

export const CreateCadetOutputSchema = z.object({
  uid: z.string(),
  email: z.string(),
});
export type CreateCadetOutput = z.infer<typeof CreateCadetOutputSchema>;


export async function createCadet(input: CreateCadetInput): Promise<CreateCadetOutput> {
    return createCadetFlow(input);
}


const createCadetFlow = ai.defineFlow(
  {
    name: 'createCadetFlow',
    inputSchema: CreateCadetInputSchema,
    outputSchema: CreateCadetOutputSchema,
  },
  async (input) => {
    const { displayName, regimentalNumber, year, dept, password } = input;
    const serverTimestamp = FieldValue.serverTimestamp();

    // Create a "shadow email" for the cadet to use with Firebase Auth
    const email = `${regimentalNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}@cadet.ncc.portal`;

    // 1. Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // 2. Set custom claim for role-based access control
    await auth.setCustomUserClaims(userRecord.uid, { role: 'cadet' });

    // 3. Create a corresponding user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      displayName,
      email, // The shadow email
      regimentalNumber,
      role: 'cadet',
      year,
      dept, // Storing dept
      phone: '', // Initialize phone as empty
      createdAt: serverTimestamp,
      updatedAt: serverTimestamp,
    });

    return {
      uid: userRecord.uid,
      email: email,
    };
  }
);
