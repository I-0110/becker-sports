import Link from 'next/link';
import NavBar from '@/app/ui/nav';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <NavBar />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-6">
          Could not find the requested post.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-chief-500 px-4 py-2 text-sm font-medium text-white hover:bg-chief-400"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}