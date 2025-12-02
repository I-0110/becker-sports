import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { fetchLatestPosts } from '@/app/lib/data';
import CategoryBadge from '../posts/category-badge';

export default async function LatestPosts() {
  const latestPosts = await fetchLatestPosts();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">
        Latest Posts
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestPosts.map((post, i) => {
            return (
              <div
                key={post.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={`${post.title}'s post image`}
                      className="mr-4 rounded-md"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <div className="mr-4 h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-500">No img</span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {post.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      By {post.name}
                    </p>
                  </div>
                </div>
                <div className='mb-2'>
                  <CategoryBadge category={post.category} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}