import axios from 'axios';
import { articles, calculators, dashboardData, impaCodes, maritimeNews, pdfs, ports, slides } from './mockData';
import { Article, CalculatorDefinition, ChatResponse, DashboardData, ImpaCode, MaritimeNews, PdfItem, PortDetail, Slide } from './types';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1',
  timeout: 8000
});

async function safeGet<T>(action: string, fallback: T, params?: Record<string, string>): Promise<T> {
  try {
    const { data } = await client.get<T>('', { params: { action, ...params } });
    return data;
  } catch {
    return fallback;
  }
}

export const api = {
  getSlides: () => safeGet<Slide[]>('slides', slides),
  getFeaturedPdfs: () => safeGet<PdfItem[]>('pdfs_featured', pdfs),
  getLatestArticles: () => safeGet<Article[]>('articles_latest', articles),
  getArticles: () => safeGet<Article[]>('articles', articles),
  getArticleBySlug: async (slug: string) => {
    const found = articles.find((a) => a.slug === slug);
    return safeGet<Article>('article_by_slug', found || articles[0], { slug });
  },
  getPdfs: () => safeGet<PdfItem[]>('pdfs', pdfs),
  getPdfById: async (id: string) => {
    const found = pdfs.find((p) => p.id === id);
    return safeGet<PdfItem>('pdf_by_id', found || pdfs[0], { id });
  },
  getCalculators: () => safeGet<CalculatorDefinition[]>('calculators', calculators),
  getPorts: () => safeGet<PortDetail[]>('ports', ports),
  getPortBySlug: async (slug: string) => {
    const found = ports.find((p) => p.slug === slug);
    return safeGet<PortDetail>('port_by_slug', found || ports[0], { slug });
  },
  getNews: () => safeGet<MaritimeNews[]>('news', maritimeNews),
  getImpaCodes: () => safeGet<ImpaCode[]>('impa_codes', impaCodes),
  login: (payload: { email: string; password: string }) => client.post('', { action: 'login', ...payload }),
  register: (payload: { name: string; email: string; password: string }) => client.post('', { action: 'register', ...payload }),
  getDashboard: () => safeGet<DashboardData>('dashboard', dashboardData),
  chat: (payload: { query: string; geoCountry: string }) => client.post<ChatResponse>('', { action: 'chat', ...payload })
};
