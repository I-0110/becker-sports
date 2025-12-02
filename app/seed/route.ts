import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { posts, subscribers, revenue, admins } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function dropAdminsTable() {
  await sql `DROP TABLE IF EXISTS admins CASCADE`;
}

async function dropPostsTable() {
  await sql `DROP TABLE IF EXISTS posts CASCADE`;
}

async function dropSubscribersTable() {
  await sql`DROP TABLE IF EXISTS subscribers CASCADE`;
}

async function seedAdmins() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      image_url VARCHAR(255)
    );
  `;

  const insertedAdmins = await Promise.all(
    admins.map(async (admin) => {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      return sql`
        INSERT INTO admins (id, name, email, password)
        VALUES (${admin.id}, ${admin.name}, ${admin.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedAdmins;
}

async function seedPosts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      admin_id UUID NOT NULL,
      title VARCHAR(250) NOT NULL,
      content TEXT NOT NULL,
      image_url VARCHAR(255),
      video_url VARCHAR(255),
      category VARCHAR(50) NOT NULL,
      status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'publish')),
      date DATE NOT NULL,
      FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
    );
  `;

  const insertedPosts = await Promise.all(
    posts.map(
      (post) => sql`
        INSERT INTO posts (admin_id, title, content, image_url, video_url, category, status, date)
        VALUES (
          ${post.admin_id}, 
          ${post.title}, 
          ${post.content || 'Default content'},
          ${post.image_url || null},
          ${post.video_url || null},
          ${post.category},
          ${post.status}, 
          ${post.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPosts;
}

async function seedSubscribers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      image_url VARCHAR(255)
    );
  `;

  const insertedSubscribers = await Promise.all(
    subscribers.map(
      (subscriber) => sql`
        INSERT INTO subscribers (id, name, email, image_url)
        VALUES (${subscriber.id}, ${subscriber.name}, ${subscriber.email}, ${subscriber.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedSubscribers;
}

async function seedRevenue() {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL DEFAULT 0
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, 0)
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      // Drop tables in correct order (posts must be dropped before admins due to foreign key)
      await dropPostsTable();
      await dropSubscribersTable();
      await dropAdminsTable();

      // Seed in correct order (admins must exist before posts)
      await seedAdmins();
      await seedSubscribers();
      await seedPosts();
      await seedRevenue();
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return Response.json({ error }, { status: 500 });
  }
}