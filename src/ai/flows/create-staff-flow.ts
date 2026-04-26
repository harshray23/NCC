'use server';
/**
 * @fileOverview A Genkit flow for creating a new staff user (Admin or Manager).
 *
 * - createStaff - A function that handles the staff creation process.
 * - CreateStaffInput - The input type for the createStaff function.
 * - CreateStaffOutput - The return type for the createStaff function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { auth, db } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const CreateStaffInputSchema = z.object({
  displayName: z.string().describe("The staff member's full name."),
  email: z.string().email().describe("The staff member's official email address."),
  role: z.enum(['admin', 'manager']).describe("The assigned command role."),
  password: z.string().min(6).describe("The initial access credential."),
});
export type CreateStaffInput = z.infer<typeof CreateStaffInputSchema>;

export const CreateStaffOutputSchema = z.object({
  uid: z.string(),
});
export type CreateStaffOutput = z.infer<typeof CreateStaffOutputSchema>;

export async function createStaff(input: CreateStaffInput): Promise<CreateStaffOutput> {
    return createStaffFlow(input);
}

const createStaffFlow = ai.defineFlow(
  {
    name: 'createStaffFlow',
    inputSchema: CreateStaffInputSchema,
    outputSchema: CreateStaffOutputSchema,
  },
  async (input) => {
    const { displayName, email, role, password } = input;
    const serverTimestamp = FieldValue.serverTimestamp();

    if (!auth || !db) {
        throw new Error('COMMAND_INITIALIZATION_ERROR: Secure services unavailable.');
    }

    // 1. Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // 2. Set custom claim for role-based access control
    await auth.setCustomUserClaims(userRecord.uid, { role });

    // 3. Create a corresponding user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      displayName,
      email,
      role,
      phone: '',
      createdAt: serverTimestamp,
      updatedAt: serverTimestamp,
    });

    return {
      uid: userRecord.uid,
    };
  }
);
