export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/server/mongodb';
import { seedIfEmpty } from '@/lib/server/seed';
import { PdfModel } from '@/lib/server/models';
import { normalizeDoc } from '@/lib/server/normalize';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectMongo();
  await seedIfEmpty();
  const pdf = await PdfModel.findById(params.id).lean();

  if (!pdf) {
    return NextResponse.json({ message: 'PDF not found' }, { status: 404 });
  }

  return NextResponse.json(normalizeDoc(pdf as Record<string, unknown>));
}
