'use client';

import { AdminField, PostForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { editPost, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditPostForm({
  post,
  admins,
}: {
  post: PostForm;
  admins: AdminField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updatePostWithId = editPost.bind(null, post.id);
  const [state, formAction] = useActionState(updatePostWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-chief-50 p-4 md:p-6">
        {/* Admin Name */}
        <div className="mb-4">
          <label htmlFor="admin" className="mb-2 block text-sm font-medium">
            Choose Admin
          </label>
          <div className="relative">
            <select
              id="admin"
              name="adminId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-chief-500"
              defaultValue={post.admin_id}
            >
              <option value="" disabled>
                Select an admin
              </option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-chief-500" />
          </div>
        </div>

        {/* Post Title */}

        {/* Post Content */}

        {/* Post's Image URL */}

        {/* Post's Video URL */}

        {/* Post Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the post status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="draft"
                  name="status"
                  type="radio"
                  value="draft"
                  defaultChecked={post.status === 'draft'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="draft"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Draft <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="publish"
                  name="status"
                  type="radio"
                  value="publish"
                  defaultChecked={post.status === 'publish'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="publish"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Publish <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Post</Button>
      </div>
    </form>
  );
}
