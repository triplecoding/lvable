export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectMongo } from '@/lib/server/mongodb';
import { UserModel } from '@/lib/server/models';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  await connectMongo();
  const user = await UserModel.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ id: user._id, name: user.name, email: user.email, plan: user.plan });
}
