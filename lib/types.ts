export type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  faq: { question: string; answer: string }[];
  publishedAt: string;
};

export type PdfItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  previewImage: string;
  fileUrl: string;
};

export type CalculatorDefinition = {
  id: string;
  title: string;
  description: string;
  fields: {
    id: string;
    label: string;
    type: 'number';
    unit?: string;
  }[];
  formula: string;
};

export type PortDetail = {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  summary: string;
  services: string[];
  congestionLevel: 'Low' | 'Medium' | 'High';
};

export type MaritimeNews = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
};

export type ImpaCode = {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  spec: string;
};

export type DashboardData = {
  profile: { name: string; email: string; plan: string; verified: boolean; badge?: string };
  downloadHistory: PdfItem[];
  recentlyRead: Article[];
  subscriptionStatus: { active: boolean; renewalDate: string };
  seoAgent: { mode: 'manual+ai'; queuedTasks: number; lastRun: string };
};

export type ChatResponse = {
  answer: string;
  suggestedArticles: { title: string; href: string }[];
};
