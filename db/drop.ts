import { getDb } from "../api/queries/connection";

async function dropTables() {
  const db = getDb();
  await db.execute('DROP TABLE IF EXISTS newsletter_subscribers, testimonials, blog_posts, projects, contact_submissions, users');
  console.log('All tables dropped successfully');
}

dropTables().catch(console.error);
