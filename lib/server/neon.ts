import { neon } from '@neondatabase/serverless';
import { articles, calculators, dashboardData, impaCodes, maritimeNews, pdfs, ports, slides } from '@/lib/mockData';

const DATABASE_URL = process.env.DATABASE_URL;

function getSql() {
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is required for Neon mode');
  }
  return neon(DATABASE_URL);
}

export async function initNeonSchema() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS content_store (
      key TEXT PRIMARY KEY,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS app_users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      verified BOOLEAN DEFAULT FALSE,
      badge TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS chat_logs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      query TEXT,
      geo_country TEXT,
      answer TEXT,
      suggested_articles JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

async function countKey(key: string) {
  const sql = getSql();
  const rows = await sql`SELECT key FROM content_store WHERE key = ${key} LIMIT 1;`;
  return rows.length;
}

async function setKey(key: string, payload: unknown) {
  const sql = getSql();
  await sql`
    INSERT INTO content_store (key, payload, updated_at)
    VALUES (${key}, ${JSON.stringify(payload)}::jsonb, NOW())
    ON CONFLICT (key)
    DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW();
  `;
}

export async function seedNeonIfEmpty() {
  if (!(await countKey('slides'))) await setKey('slides', slides);
  if (!(await countKey('articles'))) await setKey('articles', articles);
  if (!(await countKey('pdfs'))) await setKey('pdfs', pdfs);
  if (!(await countKey('calculators'))) await setKey('calculators', calculators);
  if (!(await countKey('ports'))) await setKey('ports', ports);
  if (!(await countKey('news'))) await setKey('news', maritimeNews);
  if (!(await countKey('impa_codes'))) await setKey('impa_codes', impaCodes);
  if (!(await countKey('dashboard'))) await setKey('dashboard', dashboardData);
}

export async function getContent<T>(key: string): Promise<T> {
  const sql = getSql();
  const rows = await sql`SELECT payload FROM content_store WHERE key = ${key} LIMIT 1;`;
  return (rows[0]?.payload ?? null) as T;
}

export async function createUserNeon(input: { name: string; email: string; passwordHash: string }) {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO app_users (name, email, password_hash)
    VALUES (${input.name}, ${input.email}, ${input.passwordHash})
    RETURNING id, name, email, verified, badge;
  `;
  return rows[0];
}

export async function getUserByEmailNeon(email: string) {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, email, password_hash, verified, badge FROM app_users WHERE email = ${email} LIMIT 1;
  `;
  return rows[0] || null;
}

export async function createChatLogNeon(input: { query: string; geoCountry: string; answer: string; suggestedArticles: unknown }) {
  const sql = getSql();
  await sql`
    INSERT INTO chat_logs (query, geo_country, answer, suggested_articles)
    VALUES (${input.query}, ${input.geoCountry}, ${input.answer}, ${JSON.stringify(input.suggestedArticles)}::jsonb);
  `;
}
