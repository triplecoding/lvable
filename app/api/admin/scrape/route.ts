import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/server/mongodb';
import { ImpaCodeModel, NewsModel } from '@/lib/server/models';

export async function POST() {
  await connectMongo();

  const now = new Date().toISOString().slice(0, 10);

  const generatedNews = await NewsModel.create({
    slug: `auto-harbour-brief-${now}`,
    title: `Automated Harbour Brief ${now}`,
    summary: 'Daily auto-generated maritime brief. Replace with scraper feed in production.',
    source: 'Automation Agent',
    publishedAt: now
  });

  const count = await ImpaCodeModel.countDocuments();
  if (count < 150) {
    const missing = 150 - count;
    await ImpaCodeModel.insertMany(Array.from({ length: missing }).map((_, i) => ({
      code: `99${String(count + i + 1).padStart(4, '0')}`,
      name: `Auto IMPA Item ${count + i + 1}`,
      category: 'Auto',
      unit: 'EA',
      spec: 'Auto-generated spec'
    })));
  }

  return NextResponse.json({ ok: true, generatedNews: generatedNews.title });
}
