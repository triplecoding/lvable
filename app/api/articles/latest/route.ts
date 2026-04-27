import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/server/mongodb';
import { seedIfEmpty } from '@/lib/server/seed';
import { ArticleModel } from '@/lib/server/models';
import { normalizeDoc } from '@/lib/server/normalize';

export async function GET() {
  await connectMongo();
  await seedIfEmpty();
  const latest = await ArticleModel.find().sort({ publishedAt: -1 }).limit(6).lean();
  return NextResponse.json(latest.map(normalizeDoc));
}
