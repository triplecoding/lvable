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

export type DashboardData = {
  profile: { name: string; email: string; plan: string };
  downloadHistory: PdfItem[];
  recentlyRead: Article[];
  subscriptionStatus: { active: boolean; renewalDate: string };
};
