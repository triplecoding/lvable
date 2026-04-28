import { SchemaScript } from '@/components/SchemaScript';
import { api } from '@/lib/api';
import { buildMetadata, faqSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'FAQ | HeyMariner',
  description: 'Common maritime operational, compliance, and platform questions answered by HeyMariner experts.',
  path: '/faq'
});

export default async function FaqPage() {
  const articles = await api.getArticles();
  const faq = articles.flatMap((a) => a.faq).slice(0, 12);

  return (
    <div className="space-y-5">
      <SchemaScript schema={faqSchema(faq)} />
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      <p className="text-slate-600">Automatically generated from expert article knowledge base.</p>
      <div className="space-y-3">
        {faq.map((item) => (
          <details key={`${item.question}-${item.answer}`} className="rounded-xl border bg-white p-4">
            <summary className="cursor-pointer font-semibold">{item.question}</summary>
            <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
