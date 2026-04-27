'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArticleCard } from '@/components/ArticleCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { api } from '@/lib/api';
import { Article } from '@/lib/types';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const q = query.toLowerCase();
      return a.category.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q));
    });
  }, [articles, query]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Articles</h1>
      <input
        placeholder="Filter by category or tag"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />
      {loading ? <LoadingSkeleton rows={6} /> : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      )}
    </div>
  );
}
