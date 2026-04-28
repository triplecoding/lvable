import { Schema, model, models } from 'mongoose';

const slideSchema = new Schema({
  title: String,
  subtitle: String,
  image: String,
  ctaLabel: String,
  ctaHref: String
}, { timestamps: true });

const articleSchema = new Schema({
  slug: { type: String, unique: true },
  title: String,
  excerpt: String,
  content: String,
  category: String,
  tags: [String],
  faq: [{ question: String, answer: String }],
  publishedAt: String
}, { timestamps: true });

const pdfSchema = new Schema({
  title: String,
  summary: String,
  category: String,
  tags: [String],
  previewImage: String,
  fileUrl: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const calculatorSchema = new Schema({
  title: String,
  description: String,
  fields: [{ id: String, label: String, type: String, unit: String }],
  formula: String
}, { timestamps: true });

const portSchema = new Schema({
  slug: { type: String, unique: true },
  name: String,
  country: String,
  region: String,
  summary: String,
  services: [String],
  congestionLevel: String
}, { timestamps: true });

const newsSchema = new Schema({
  slug: { type: String, unique: true },
  title: String,
  summary: String,
  source: String,
  publishedAt: String
}, { timestamps: true });

const impaCodeSchema = new Schema({
  code: { type: String, unique: true },
  name: String,
  category: String,
  unit: String,
  spec: String
}, { timestamps: true });

const chatLogSchema = new Schema({
  query: String,
  geoCountry: String,
  answer: String,
  suggestedArticles: [{ title: String, href: String }]
}, { timestamps: true });

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  plan: { type: String, default: 'Free' },
  verified: { type: Boolean, default: false },
  badge: String
}, { timestamps: true });

export const SlideModel = models.Slide || model('Slide', slideSchema);
export const ArticleModel = models.Article || model('Article', articleSchema);
export const PdfModel = models.Pdf || model('Pdf', pdfSchema);
export const CalculatorModel = models.Calculator || model('Calculator', calculatorSchema);
export const PortModel = models.Port || model('Port', portSchema);
export const NewsModel = models.News || model('News', newsSchema);
export const ImpaCodeModel = models.ImpaCode || model('ImpaCode', impaCodeSchema);
export const ChatLogModel = models.ChatLog || model('ChatLog', chatLogSchema);
export const UserModel = models.User || model('User', userSchema);
