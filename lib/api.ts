import axios from 'axios';
import { articles, calculators, dashboardData, pdfs, slides } from './mockData';
import { Article, CalculatorDefinition, DashboardData, PdfItem, Slide } from './types';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 5000
});

async function safeGet<T>(path: string, fallback: T): Promise<T> {
  try {
    const { data } = await client.get<T>(path);
    return data;
  } catch {
    return fallback;
  }
}

export const api = {
  getSlides: () => safeGet<Slide[]>('/homepage/slides', slides),
  getFeaturedPdfs: () => safeGet<PdfItem[]>('/pdfs/featured', pdfs),
  getLatestArticles: () => safeGet<Article[]>('/articles/latest', articles),
  getArticles: () => safeGet<Article[]>('/articles', articles),
  getArticleBySlug: async (slug: string) => {
    const found = articles.find((a) => a.slug === slug);
    return safeGet<Article>(`/articles/${slug}`, found || articles[0]);
  },
  getPdfs: () => safeGet<PdfItem[]>('/pdfs', pdfs),
  getPdfById: async (id: string) => {
    const found = pdfs.find((p) => p.id === id);
    return safeGet<PdfItem>(`/pdfs/${id}`, found || pdfs[0]);
  },
  getCalculators: () => safeGet<CalculatorDefinition[]>('/calculators', calculators),
  login: (payload: { email: string; password: string }) => client.post('/auth/login', payload),
  register: (payload: { name: string; email: string; password: string }) => client.post('/auth/register', payload),
  getDashboard: () => safeGet<DashboardData>('/dashboard', dashboardData)
};
