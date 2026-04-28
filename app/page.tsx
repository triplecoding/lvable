import Link from 'next/link';
import { ArticleCard } from '@/components/ArticleCard';
import { CalculatorRenderer } from '@/components/CalculatorRenderer';
import { HeroSlider } from '@/components/HeroSlider';
import { PdfCard } from '@/components/PdfCard';
import { SchemaScript } from '@/components/SchemaScript';
import { api } from '@/lib/api';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'HeyMariner | Maritime AI, Port & Harbour Intelligence',
  description: 'Professional maritime platform with AI chat, ports, harbour insights, calculators, PDFs, and expert articles.',
  path: '/'
});

export default async function HomePage() {
  const [slides, featuredPdfs, latestArticles, calculators, ports, news, impa] = await Promise.all([
    api.getSlides(),
    api.getFeaturedPdfs(),
    api.getLatestArticles(),
    api.getCalculators(),
    api.getPorts(),
    api.getNews(),
    api.getImpaCodes()
  ]);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HeyMariner',
    url: 'https://www.heymariner.com'
  };

  return (
    <div className="space-y-10">
      <SchemaScript schema={websiteSchema} />
      <HeroSlider slides={slides} />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured PDFs</h2>
          <Link href="/pdf-library" className="text-sm font-semibold text-brand-700">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPdfs.map((pdf) => <PdfCard key={pdf.id} item={pdf} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Latest Articles</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {latestArticles.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Port & Harbour Highlights</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {ports.map((port) => (
            <Link key={port.id} href={`/ports/${port.slug}`} className="rounded-2xl border bg-white p-5 hover:border-brand-300">
              <p className="text-xs font-semibold text-brand-700">{port.region}</p>
              <h3 className="mt-1 text-lg font-semibold">{port.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{port.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-2xl font-bold">Calculator Section</h2>
          <p className="mb-3 mt-1 text-sm text-slate-600">Dynamic JSON-powered calculators for voyage planning.</p>
          <CalculatorRenderer calculators={calculators} />
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-2xl font-bold">Daily Port News</h2>
          <div className="mt-3 space-y-3">
            {news.map((n) => (
              <article key={n.id} className="rounded-xl border border-slate-200 p-3">
                <h3 className="font-semibold">{n.title}</h3>
                <p className="text-sm text-slate-600">{n.summary}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">IMPA listing today: {impa.length} items.</p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-brand-700 p-6 text-white">
          <h3 className="text-xl font-bold">Join HeyMariner Pro</h3>
          <p className="mt-2 text-sm text-blue-100">Get unlimited PDF downloads, port intelligence, and AI workflow tools.</p>
          <Link href="/register" className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700">Get Started</Link>
        </div>
        <div className="rounded-2xl bg-slate-900 p-6 text-white">
          <h3 className="text-xl font-bold">Need Enterprise Access?</h3>
          <p className="mt-2 text-sm text-slate-300">Custom onboarding, team verification badges, and SEO automation agent.</p>
          <Link href="/dashboard" className="mt-4 inline-block rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold">See Dashboard</Link>
        </div>
      </section>
    </div>
  );
}
