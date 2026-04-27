import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/server/mongodb';
import { seedIfEmpty } from '@/lib/server/seed';
import { SlideModel } from '@/lib/server/models';
import { normalizeDoc } from '@/lib/server/normalize';

export async function GET() {
  await connectMongo();
  await seedIfEmpty();
  const slides = await SlideModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(slides.map(normalizeDoc));
}
