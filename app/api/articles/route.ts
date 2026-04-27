import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/server/mongodb';
import { seedIfEmpty } from '@/lib/server/seed';
import { ArticleModel } from '@/lib/server/models';
import { normalizeDoc } from '@/lib/server/normalize';

export async function GET() {
  await connectMongo();
  await seedIfEmpty();
  const articles = await ArticleModel.find().sort({ publishedAt: -1 }).lean();
  return NextResponse.json(articles.map(normalizeDoc));
}
