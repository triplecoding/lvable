import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dashboardData } from '@/lib/mockData';
import { connectMongo } from '@/lib/server/mongodb';
import { normalizeDoc } from '@/lib/server/normalize';
import { seedIfEmpty } from '@/lib/server/seed';
import {
  ArticleModel,
  CalculatorModel,
  ChatLogModel,
  ImpaCodeModel,
  NewsModel,
  PdfModel,
  PortModel,
  SlideModel,
  UserModel
} from '@/lib/server/models';
import { sendWelcomeEmail } from '@/lib/server/email';

function articleSuggestions(items: Array<{ title: string; slug: string }>) {
  return items.slice(0, 3).map((a) => ({ title: a.title, href: `/articles/${a.slug}` }));
}

export async function GET(request: Request) {
  await connectMongo();
  await seedIfEmpty();

  const action = new URL(request.url).searchParams.get('action');

  switch (action) {
    case 'slides':
      return NextResponse.json((await SlideModel.find().lean()).map(normalizeDoc));
    case 'articles':
      return NextResponse.json((await ArticleModel.find().sort({ publishedAt: -1 }).lean()).map(normalizeDoc));
    case 'articles_latest':
      return NextResponse.json((await ArticleModel.find().sort({ publishedAt: -1 }).limit(6).lean()).map(normalizeDoc));
    case 'article_by_slug': {
      const slug = new URL(request.url).searchParams.get('slug');
      const article = await ArticleModel.findOne({ slug }).lean();
      if (!article) return NextResponse.json({ message: 'Not found' }, { status: 404 });
      return NextResponse.json(normalizeDoc(article));
    }
    case 'pdfs':
      return NextResponse.json((await PdfModel.find().lean()).map(normalizeDoc));
    case 'pdfs_featured':
      return NextResponse.json((await PdfModel.find({ featured: true }).limit(6).lean()).map(normalizeDoc));
    case 'pdf_by_id': {
      const id = new URL(request.url).searchParams.get('id');
      const pdf = await PdfModel.findById(id).lean();
      if (!pdf) return NextResponse.json({ message: 'Not found' }, { status: 404 });
      return NextResponse.json(normalizeDoc(pdf));
    }
    case 'calculators':
      return NextResponse.json((await CalculatorModel.find().lean()).map(normalizeDoc));
    case 'ports':
      return NextResponse.json((await PortModel.find().lean()).map(normalizeDoc));
    case 'port_by_slug': {
      const slug = new URL(request.url).searchParams.get('slug');
      const port = await PortModel.findOne({ slug }).lean();
      if (!port) return NextResponse.json({ message: 'Not found' }, { status: 404 });
      return NextResponse.json(normalizeDoc(port));
    }
    case 'news':
      return NextResponse.json((await NewsModel.find().sort({ publishedAt: -1 }).lean()).map(normalizeDoc));
    case 'impa_codes':
      return NextResponse.json((await ImpaCodeModel.find().limit(150).lean()).map(normalizeDoc));
    case 'dashboard':
      return NextResponse.json(dashboardData);
    default:
      return NextResponse.json({ message: 'Unknown action' }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await connectMongo();
  await seedIfEmpty();

  const body = await request.json();
  const { action } = body as { action: string };

  if (action === 'register') {
    const { name, email, password } = body;
    if (!name || !email || !password) return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    const exists = await UserModel.findOne({ email }).lean();
    if (exists) return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, passwordHash, verified: false });
    await sendWelcomeEmail(email, name);
    return NextResponse.json({ id: String(user._id), name: user.name, email: user.email }, { status: 201 });
  }

  if (action === 'login') {
    const { email, password } = body;
    const user = await UserModel.findOne({ email });
    if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    return NextResponse.json({ id: String(user._id), name: user.name, email: user.email, verified: user.verified, badge: user.badge });
  }

  if (action === 'chat') {
    const query = String(body.query || '');
    const geoCountry = String(body.geoCountry || 'Global');
    const related = await ArticleModel.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { tags: { $regex: query, $options: 'i' } }] }).limit(3).lean();
    const suggestions = articleSuggestions(related as Array<{ title: string; slug: string }>);
    const answer = `Hi, I can help with ${query || 'maritime operations'}. For ${geoCountry}, I recommend checking port advisories, weather windows, and fuel indexes before final planning.`;
    await ChatLogModel.create({ query, geoCountry, answer, suggestedArticles: suggestions });
    return NextResponse.json({ answer, suggestedArticles: suggestions });
  }

  return NextResponse.json({ message: 'Unknown action' }, { status: 400 });
}
