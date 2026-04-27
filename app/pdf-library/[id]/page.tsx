import Link from 'next/link';
import { api } from '@/lib/api';

export default async function PdfDetailPage({ params }: { params: { id: string } }) {
  const pdf = await api.getPdfById(params.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{pdf.title}</h1>
        <p className="mt-2 text-slate-600">{pdf.summary}</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <iframe src={pdf.fileUrl} title={pdf.title} className="h-[65vh] w-full" />
      </div>
      <Link href={pdf.fileUrl} target="_blank" className="inline-block rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white">
        Download PDF
      </Link>
    </div>
  );
}
