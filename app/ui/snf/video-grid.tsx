import { VideoGridProps } from '@/app/lib/definitions';

export default function VideoGrid({ videos }: VideoGridProps) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
           {videos.map((video) => (
            <div key={video.id} className='flex flex-col'>
                <div className='aspect-video relative rounded-lg overflow-hidden bg-chief-200/50 dark:bg-chief-200'>
                    <iframe 
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        className='w-full h-full'
                    />
                </div>
                <h3 className='mt-3 text-sm font-medium line-clamp-2'>
                    {video.title}
                </h3>
                {video.viewCount && (
                    <p className='text-xs text-chief-400/50 dark:text-chief-50/50 mt-1'>
                        {parseInt(video.viewCount).toLocaleString()} views
                    </p>
                )}
            </div>
           ))} 
        </div>
    );
}