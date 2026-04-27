import Link from 'next/link';
import { Article } from '@/lib/types';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold text-brand-700">{article.category}</p>
      <h3 className="mt-2 text-lg font-semibold">{article.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{article.excerpt}</p>
      <Link href={`/articles/${article.slug}`} className="mt-4 inline-block text-sm font-semibold text-brand-700">
        Read article →
      </Link>
    </article>
  );
}
