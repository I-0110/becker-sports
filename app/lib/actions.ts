'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    adminId: z.string({
        invalid_type_error: 'Please select an admin.',
    }),
    title: z.string().min(1, { message: 'Please enter a title.' }),
    content: z.string().min(1, { message: 'Please enter a content.' }),
    imageUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    category: z.enum(['101', 'chiefs', 'draft', 'fantasy', 'hof' ]),
    status: z.enum(['draft', 'publish'], {
        invalid_type_error: 'Please select a post status.',
    }),
    date: z.string(),
});

const CreatePost = FormSchema.omit({ id: true, date: true });

const UpdatePost = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        adminId?: string[];
        title?: string[];
        content?: string[];
        category?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createPost(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreatePost.safeParse({
    adminId: formData.get('adminId'),
    title: formData.get('title'),
    content: formData.get('content'),
    category: formData.get('category'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }
 
  // Prepare data for insertion into the database
  const { adminId, title, content, category, status } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO posts (admin_id, title, content, category, status, date)
      VALUES (${adminId}, ${title}, ${content}, ${category}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Post.',
    };
  }
 
  // Revalidate the cache for the posts page and redirect the Admin.
  revalidatePath('/admin-dashboard/posts');
  redirect('/admin-dashboard/posts');
}

export async function editPost(
  id: string, 
  prevState: State,
  formData: FormData
) {
    const validatedFields = UpdatePost.safeParse({
        adminId: formData.get('adminId'),
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Edit Post.',
      }
    }

    const { adminId, title, content, category, status } = validatedFields.data;

    try{
        await sql`
            UPDATE posts
            SET admin_id = ${adminId}, title = ${title}, content = ${content}, category = ${category}, status = ${status}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error(error);
        return {
            message: 'Database Error: Failed to Edit Post.',
        };
    }

    revalidatePath('/admin-dashboard/posts');
    redirect('/admin-dashboard/posts');
}

export async function deletePost(id: string) {
    try{
        await sql`DELETE FROM posts WHERE id = ${id}`;
        revalidatePath('/admin-dashboard/posts');
        return { message: 'Post deleted successfully.'}
    } catch (error) {
        console.error(error);
        return {
            message: 'Database Error: Failed to Delete Post.'
        }
    }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}