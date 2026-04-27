import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.heymariner.com';
  return [
    '/',
    '/articles',
    '/pdf-library',
    '/calculators',
    '/ports',
    '/faq',
    '/mariner-wiki',
    '/dashboard'
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
