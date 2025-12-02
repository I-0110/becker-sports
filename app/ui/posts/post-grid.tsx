import { fetchPostsByCategory } from '@/app/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateToLocal } from '@/app/lib/utils';
import CategoryBadge from './category-badge';

export default async function PostGrid({ category }: { category: string }) {
  const posts = await fetchPostsByCategory(category);

  return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="group rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-300 hover:shadow-md transition-all"
            >
              {post.image_url && (
                <div className="mb-4 aspect-video relative overflow-hidden rounded-md">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}

              <div className='mb-2'>
                <CategoryBadge category={post.category} />
              </div>

              <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-chief-300 transition-colors">
                {post.title}
              </h2>

              <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                {post.content}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>By {post.name}</span>
                <span>{formatDateToLocal(post.date)}</span>
              </div>
            </Link>
          ))
        )}
      </div>
  );
}