import Link from 'next/link';
import { ArticleCard } from '@/components/ArticleCard';
import { CalculatorRenderer } from '@/components/CalculatorRenderer';
import { HeroSlider } from '@/components/HeroSlider';
import { PdfCard } from '@/components/PdfCard';
import { api } from '@/lib/api';

export default async function HomePage() {
  const [slides, featuredPdfs, latestArticles, calculators] = await Promise.all([
    api.getSlides(),
    api.getFeaturedPdfs(),
    api.getLatestArticles(),
    api.getCalculators()
  ]);

  return (
    <div className="space-y-10">
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
        <h2 className="mb-4 text-2xl font-bold">Calculator Section</h2>
        <CalculatorRenderer calculators={calculators} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-brand-700 p-6 text-white">
          <h3 className="text-xl font-bold">Join HeyMariner Pro</h3>
          <p className="mt-2 text-sm text-blue-100">Get unlimited PDF downloads and premium analytics.</p>
          <Link href="/register" className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700">Get Started</Link>
        </div>
        <div className="rounded-2xl bg-slate-900 p-6 text-white">
          <h3 className="text-xl font-bold">Need Enterprise Access?</h3>
          <p className="mt-2 text-sm text-slate-300">Custom onboarding, team billing, and route-specific toolkits.</p>
          <Link href="/dashboard" className="mt-4 inline-block rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold">See Dashboard</Link>
        </div>
      </section>
    </div>
  );
}
