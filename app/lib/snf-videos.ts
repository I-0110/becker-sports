import { Video, VideoSearchItem, VideoItem } from '@/app/lib/definitions';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export async function getLatestVideos(maxResults = 9): Promise<Video[]> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`,
    { 
        next: { revalidate: 3600 } // Cache for 1 hour
    } as RequestInit & { next?: { revalidate: number } }
  );
  
  const data = await response.json();
  
  return data.items.map((item: VideoSearchItem) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
  }));
}

export async function getPopularVideos(maxResults = 9): Promise<Video[]> {
    const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=id&order=viewCount&maxResults=${maxResults}&type=video`,
        { 
            next: { revalidate: 3600 } //Cached for 1 hour
        } as RequestInit & { next?: { revalidate: number} }
    );

    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map((item: VideoSearchItem) => item.id.videoId).join(',');

    // Get video statistics to sort by views
    const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,statistics`,
        { 
            next: { revalidate: 3600 } // Cached for 1 hour 
        } as RequestInit & { next?: { revalidate: number} }
    );

    const statsData = await statsResponse.json();

    // Sort by view count and take top results
    return statsData.items
        .sort((a: VideoItem, b: VideoItem) => parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount))
        .slice(0, maxResults)
        .map((item: VideoItem) => ({
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            viewCount: item.statistics.viewCount,
        }));
};

export async function getMixedVideos() {
    const popular = await getPopularVideos(6);
    const recent = await getLatestVideos(3); 

    // Remove duplicates (if a recent video is also popular)
    const popularIds = new Set(popular.map((v: Video) => v.id));
    const uniqueRecent = recent.filter((v: Video) => !popularIds.has(v.id));

    return [...popular, ...uniqueRecent];
}