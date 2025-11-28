import Pagination from "@/app/ui/posts/pagination";
import Search from "@/app/ui/search";
import Table from '@/app/ui/posts/table';
import { merriweather } from '@/app/ui/fonts';
import { SubscribersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchPostsPages } from '@/app/lib/data';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Subscribers',
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchPostsPages(query);

    return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${merriweather.className} text-2xl`}>Posts</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search posts..." />
      </div>
       <Suspense key={query + currentPage} fallback={<SubscribersTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>     
    )
}