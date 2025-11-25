import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { Admin } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getAdmin(email: string): Promise<Admin | undefined> {
  try {
    const admin = await sql<Admin[]>`SELECT * FROM admins WHERE email=${email}`;
    return admin[0];
  } catch (error) {
    console.error('Failed to fetch admin:', error);
    throw new Error('Failed to fetch admin.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const admin = await getAdmin(email);
          if (!admin) return null;
          const passwordMatch = await bcrypt.compare(password, admin.password);

          if (passwordMatch) return admin;
        }
        
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});