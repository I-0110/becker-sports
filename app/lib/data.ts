import postgres from 'postgres';
import {
  AdminField,
  AdminsTableType,
  PostForm,
  PostsTable,
  LatestPostRaw,
  Revenue,
  CategoryStats,
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    const data = await sql<Revenue[]>`SELECT * FROM revenue`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestPosts() {
  try {
    const data = await sql<LatestPostRaw[]>`
      SELECT 
        posts.id, 
        posts.title, 
        posts.category, 
        posts.image_url, 
        posts.video_url, 
        admins.name
      FROM posts
      JOIN admins ON posts.admin_id = admins.id
      WHERE posts.status = 'publish'
      ORDER BY posts.date DESC
      LIMIT 5`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest posts.');
  }
}

export async function fetchCardData() {
  try {
    const postCountPromise = sql`SELECT COUNT(*) FROM posts`;
    const subscriberCountPromise = sql`SELECT COUNT(*) FROM subscribers`;
    const postStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'publish' THEN 1 ELSE 0 END) AS "published",
         SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) AS "draft"
         FROM posts`;

    const data = await Promise.all([
      postCountPromise,
      subscriberCountPromise,
      postStatusPromise,
    ]);

    const numberOfPosts = Number(data[0][0].count ?? '0');
    const numberOfSubscribers = Number(data[1][0].count ?? '0');
    const totalPublishedPosts = Number(data[2][0].published ?? '0');
    const totalDraftPosts = Number(data[2][0].draft ?? '0');

    return {
      numberOfSubscribers,
      numberOfPosts,
      totalPublishedPosts,
      totalDraftPosts,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchCategoryStats() {
  try {
    const data = await sql<CategoryStats[]>`
      SELECT 
        category,
        COUNT(*) as count
      FROM posts
      WHERE status = 'publish'
      GROUP BY category
      ORDER BY count DESC
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch category stats.');
  }
}

const ITEMS_PER_PAGE = 6;

// This is for ADMIN DASHBOARD - searching/filtering posts
export async function fetchFilteredPosts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const posts = await sql<PostsTable[]>`
      SELECT
        posts.id,
        posts.admin_id,
        posts.title,
        posts.content,
        posts.category,
        posts.image_url,
        posts.video_url,
        posts.date,
        posts.status,
        admins.name
      FROM posts
      JOIN admins ON posts.admin_id = admins.id
      WHERE
        admins.name ILIKE ${`%${query}%`} OR
        posts.title ILIKE ${`%${query}%`} OR
        posts.content ILIKE ${`%${query}%`} OR
        posts.date::text ILIKE ${`%${query}%`} OR
        posts.category ILIKE ${`%${query}%`} OR
        posts.status ILIKE ${`%${query}%`}
      ORDER BY posts.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return posts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts.');
  }
}

// This is for PUBLIC PAGES - getting posts by specific category
export async function fetchPostsByCategory(category: string, limit?: number) {
  try {
    const posts = await sql<PostsTable[]>`
      SELECT
        posts.id,
        posts.admin_id,
        posts.title,
        posts.content,
        posts.category,
        posts.image_url,
        posts.video_url,
        posts.date,
        posts.status,
        admins.name
      FROM posts
      JOIN admins ON posts.admin_id = admins.id
      WHERE posts.category = ${category} AND posts.status = 'publish'
      ORDER BY posts.date DESC
      ${limit ? sql`LIMIT ${limit}` : sql``}
    `;

    return posts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts by category.');
  }
}

// This is for PUBLIC PAGES - getting all published posts
export async function fetchPublishedPosts(limit?: number) {
  try {
    const posts = await sql<PostsTable[]>`
      SELECT
        posts.id,
        posts.admin_id,
        posts.title,
        posts.content,
        posts.category,
        posts.image_url,
        posts.video_url,
        posts.date,
        posts.status,
        admins.name
      FROM posts
      JOIN admins ON posts.admin_id = admins.id
      WHERE posts.status = 'publish'
      ORDER BY posts.date DESC
      ${limit ? sql`LIMIT ${limit}` : sql``}
    `;

    return posts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch published posts.');
  }
}

export async function fetchPostsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM posts
    JOIN admins ON posts.admin_id = admins.id
    WHERE
      admins.name ILIKE ${`%${query}%`} OR
      posts.title ILIKE ${`%${query}%`} OR
      posts.content ILIKE ${`%${query}%`} OR
      posts.category ILIKE ${`%${query}%`} OR
      posts.date::text ILIKE ${`%${query}%`} OR
      posts.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of posts.');
  }
}

export async function fetchPostById(id: string) {
  try {
    const data = await sql<PostForm[]>`
      SELECT
        posts.id,
        posts.admin_id,
        posts.title,
        posts.content,
        posts.category,
        posts.status
      FROM posts
      WHERE posts.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post.');
  }
}

export async function fetchAdmins() {
  try {
    const admins = await sql<AdminField[]>`
      SELECT
        id,
        name
      FROM admins
      ORDER BY name ASC
    `;

    return admins;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all admins.');
  }
}

export async function fetchFilteredAdmins(query: string) {
  try {
    const data = await sql<AdminsTableType[]>`
		SELECT
		  admins.id,
		  admins.name,
		  admins.email,
		  COUNT(posts.id) AS total_posts
		FROM admins
		LEFT JOIN posts ON admins.id = posts.admin_id
		WHERE
		  admins.name ILIKE ${`%${query}%`} OR
      admins.email ILIKE ${`%${query}%`}
		GROUP BY admins.id, admins.name, admins.email
		ORDER BY admins.name ASC
	  `;

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch admins table.');
  }
}