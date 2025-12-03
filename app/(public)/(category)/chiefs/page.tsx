import PostGrid from '../../../ui/posts/post-grid';
import NavBar from '@/app/ui/nav';

export default async function Page() {  
  return (
    <main className="flex min-h-screen flex-col p-6">
      <NavBar />
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 m-2">
            The Kansas City Chiefs Section
          </h1>
          <p className="text-gray-600">
            All the latest news, analysis, and insights about the Kansas City Chiefs
          </p>
        </div>
        <div>
          <PostGrid category='chiefs'/>
        </div>
      </div>
    </main>
  );
}