import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/server/mongodb';
import { seedIfEmpty } from '@/lib/server/seed';
import { ArticleModel } from '@/lib/server/models';
import { normalizeDoc } from '@/lib/server/normalize';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  await connectMongo();
  await seedIfEmpty();
  const article = await ArticleModel.findOne({ slug: params.slug }).lean();

  if (!article) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(normalizeDoc(article));
}
