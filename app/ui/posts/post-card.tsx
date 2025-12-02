import Link from "next/link";
import Image from "next/image";
import { formatDateToLocal } from "@/app/lib/utils";
import { PostsTable } from "@/app/lib/definitions";
import CategoryBadge from "./category-badge";

export default async function PostCard({ post }: { post: PostsTable }) {
  return (
    <Link
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

      <div className="mb-2">
        <CategoryBadge category={post.category} />
      </div>

      <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
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
  );
}
