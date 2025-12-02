import PostGrid from '../../../ui/posts/post-grid';

export default async function Page() {  
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Kansas City Chiefs Coverage
        </h1>
        <p className="text-gray-600">
          All the latest news, analysis, and insights about the Kansas City Chiefs
        </p>
      </div>
      <div>
        <PostGrid category='chiefs'/>
      </div>
    </div>
  );
}