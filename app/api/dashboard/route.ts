export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { dashboardData } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(dashboardData);
}
