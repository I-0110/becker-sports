import { merriweather } from '@/app/ui/fonts';
import Link from 'next/link';
import { getMixedVideos } from '../../../lib/snf-videos';
import VideoGrid from '../../../ui/snf/video-grid';
import NavBar from '@/app/ui/nav';

export default async function Page() {
    const videos = await getMixedVideos();

    return(
        <main className="flex min-h-screen flex-col p-6">
            <NavBar />
            <div className="justify-center items-center text-center gap-4 rounded-lg bg-chief-50 dark:bg-chief-400 dark:border-2 dark:border-chief-50 px-6 py-10">
                <p className={`${merriweather.className}text-lg text-gray-800 dark:text-chief-50`}>
                    <strong>Sunday Night Foodball Videos</strong>
                    <br/> 
                    Subscribe and Like{' '}
                    <Link href="https://www.youtube.com/@sundaynightfoodball" className="text-chief-400 dark:text-chief-100 dark:hover:text-chief-300">
                    @sundaynightfoodball
                    </Link>
                </p>   
            </div>
            <VideoGrid videos={videos} />
        </main>
    );
}