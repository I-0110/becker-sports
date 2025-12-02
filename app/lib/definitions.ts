// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Admin = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Subscriber = {
  id: string;
  name: string;
  email: string;
  // image_url: string;
};

export type Post = {
  id: string; // Will be created on the db
  admin_id: string;
  date: string; 
  title: string;
  content: string;
  image_url?: string;
  video_url?: string;
  category: '101' | 'chiefs' | 'draft' | 'fantasy' | 'hof';
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'draft' or 'publish'.
  status: 'draft' | 'publish';
};

export type Revenue = {
  month: string;
  // revenue: number;
};

export type LatestPost = {
  id: string;
  name: string; //Admin name
  title: string;
  category: string;
  image_url: string;
  video_url: string;
  // email: string;
  // amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestPostRaw = {
  id: string;
  name: string;
  title: string;
  category: string;
  image_url: string;
  video_url: string;
};

export type PostsTable = {
  id: string;
  admin_id: string;
  name: string;
  title: string;
  content: string;
  image_url: string;
  video_url: string;
  date: string;
  category: string;
  status: 'draft' | 'publish';
};

export type AdminsTableType = {
  id: string;
  name: string;
  email: string;
  total_posts: number;
};

export type FormattedSubscribersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_posts: number;
  // total_invoices: number;
  // total_pending: string;
  // total_paid: string;
};

export type AdminField = {
  id: string;
  name: string;
};

export type PostForm = {
  id: string;
  admin_id: string;
  title: string;
  content: string;
  category: '101' | 'chiefs' | 'draft' | 'fantasy' | 'hof';
  status: 'draft' | 'publish';
};

// Category stats for dashboard
export type CategoryStats = {
  category: string;
  count: number;
}

// SNF videos
export type Video = {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt?: string;
    viewCount?: string;
};

export type VideoSearchItem = {
    id: { videoId: string };
    snippet: {
        title: string;
        thumbnails: { high: { url: string } };
        publishedAt: string;   
    };
};

export type VideoItem = {
    id: string;
    snippet: {
        title: string;
        thumbnails: { high: { url: string } };
    };
    statistics: {
        viewCount: string;
    };
};

export type VideoGridProps = {
    videos: Video[];
}


