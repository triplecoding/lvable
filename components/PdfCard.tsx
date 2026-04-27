import Link from 'next/link';
import { PdfItem } from '@/lib/types';

export function PdfCard({ item }: { item: PdfItem }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <img src={item.previewImage} alt={item.title} className="h-40 w-full rounded-xl object-cover" />
      <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{item.summary}</p>
      <Link href={`/pdf-library/${item.id}`} className="mt-3 inline-block text-sm font-semibold text-brand-700">
        Open PDF →
      </Link>
    </article>
  );
}
