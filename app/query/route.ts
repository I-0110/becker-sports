import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listPosts() {
	const data = await sql`
    SELECT 
      posts.id,
      posts.title,
      posts.content,
      posts.category,
      posts.status,
      posts.date,
      admins.name as admin_name
    FROM posts
    JOIN admins ON posts.admin_id = admins.id
    ORDER BY posts.date DESC;
  `;

	return data;
}

async function listPostsByAdmin(adminName: string) {
  const data = await sql`
    SELECT
      posts.id,
      posts.title,
      posts.content,
      posts.category,
      posts.status,
      posts.date,
      admins.name as admin_name
      FROM posts
      JOIN admins ON posts.admin_id = admins.id
      WHERE admins.name ILIKE ${`%${adminName}%`}
      ORDER BY posts.date DESC;
    `;
  
  return data;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminName = searchParams.get('admin');
    
    if (adminName) {
      return Response.json(await listPostsByAdmin(adminName));
    }
    
  	return Response.json(await listPosts());
  } catch (error) {
    console.error('Query error:', error);
  	return Response.json({ error }, { status: 500 });
  }
}
