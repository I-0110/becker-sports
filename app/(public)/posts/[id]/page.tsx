import { fetchPostById } from "@/app/lib/data";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDateToLocal } from "@/app/lib/utils";
import CategoryBadge from "@/app/ui/posts/category-badge";
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import NavBar from '@/app/ui/nav';

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    const post = await fetchPostById(id);

    if (!post) {
        notFound();
    }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <NavBar />
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to posts
      </Link>

      {/* Post header */}
      <div className="mb-6">
        <CategoryBadge category={post.category} />
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <span>By {post.name}</span>
          <span>•</span>
          <span>{formatDateToLocal(post.date)}</span>
        </div>
      </div>

      {/* Featured image */}
      {post.image_url && (
        <div className="mb-8 aspect-video relative overflow-hidden rounded-lg">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized 
          />
        </div>
      )}

      {/* Post content */}
      <article className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {post.content}
        </div>
      </article>

      {/* Video if exists */}
      {post.video_url && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Video</h3>
          <div className="aspect-video">
            <iframe width="560" height="315" src={post.video_url} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>  
  </main>
  );
}