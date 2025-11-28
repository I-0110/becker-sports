import CardWrapper, { Card } from '@/app/ui/admin-dashboard/cards';
import RevenueChart from '../../ui/admin-dashboard/revenue-chart';
import LatestPosts from '../../ui/admin-dashboard/latest-posts';
import { merriweather } from '../../ui/fonts';
import { fetchCardData } from '../../lib/data';
import { Suspense } from 'react';
import { 
    RevenueChartSkeleton, 
    LatestPostsSkeleton,
    CardSkeleton, 
} from '@/app/ui/skeletons';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Metadata } from "next";
import { admins } from '@/app/lib/placeholder-data';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

export default async function Page() {
    return (
        <main>
            <h1 className={`${merriweather.className} mb-4 text-xl md:text-2xl`}>
                Admin Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestPostsSkeleton />}>
                    <LatestPosts />
                </Suspense>
            </div>
        </main>
    )
}