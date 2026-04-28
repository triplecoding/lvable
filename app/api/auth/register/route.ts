import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectMongo } from '@/lib/server/mongodb';
import { UserModel } from '@/lib/server/models';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  await connectMongo();
  const exists = await UserModel.findOne({ email }).lean();

  if (exists) {
    return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ name, email, passwordHash });

  return NextResponse.json({ id: user._id, name: user.name, email: user.email }, { status: 201 });
}
