'use client';

import { useEffect, useMemo, useState } from 'react';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { PdfCard } from '@/components/PdfCard';
import { api } from '@/lib/api';
import { PdfItem } from '@/lib/types';

export default function PdfLibraryPage() {
  const [items, setItems] = useState<PdfItem[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPdfs().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const value = filter.toLowerCase();
    return items.filter((p) => p.category.toLowerCase().includes(value) || p.tags.some((t) => t.toLowerCase().includes(value)));
  }, [items, filter]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">PDF Library</h1>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by category/tag"
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />
      {loading ? <LoadingSkeleton rows={5} /> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => <PdfCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
}
