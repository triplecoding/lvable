export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/server/mongodb';
import { seedIfEmpty } from '@/lib/server/seed';
import { PdfModel } from '@/lib/server/models';
import { normalizeDoc } from '@/lib/server/normalize';

export async function GET() {
  await connectMongo();
  await seedIfEmpty();
  const pdfs = await PdfModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(pdfs.map(normalizeDoc));
}
