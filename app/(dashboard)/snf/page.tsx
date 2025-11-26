import { merriweather } from '@/app/ui/fonts';
import Link from 'next/link';
import { getMixedVideos } from '../../lib/snf-videos';
import VideoGrid from '../../ui/snf/video-grid';
import NavBar from '@/app/ui/nav';

export default async function Page() {
    const videos = await getMixedVideos();

    return(
        <main className="flex min-h-screen flex-col p-6">
            <NavBar />
            <h1 className={`${merriweather.className} mb-4 text-xl md:text-2xl`}>Sunday Night Foodball Videos</h1>
            <h3>Subscribe and Like</h3>
            <Link href="https://www.youtube.com/@sundaynightfoodball">
                @sundaynightfoodball
            </Link>
            <VideoGrid videos={videos} />
        </main>
    );
}