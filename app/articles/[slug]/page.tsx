import { Metadata } from 'next';
import { api } from '@/lib/api';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await api.getArticleBySlug(params.slug);
  return {
    title: `${article.title} | HeyMariner Articles`,
    description: article.excerpt
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await api.getArticleBySlug(params.slug);
  const toc = article.content.split('\n').filter((line) => line.startsWith('##')).map((l) => l.replace('##', '').trim());

  return (
    <article className="space-y-8">
      <header>
        <p className="text-sm font-semibold text-brand-700">{article.category}</p>
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="mt-2 text-slate-600">{article.excerpt}</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold">Table of Contents</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          {toc.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-xl font-semibold">Article Body</h2>
        <pre className="whitespace-pre-wrap font-sans text-slate-700">{article.content}</pre>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-xl font-semibold">FAQ</h2>
        <div className="space-y-3">
          {article.faq.map((item) => (
            <details key={item.question} className="rounded-lg border border-slate-200 p-3">
              <summary className="cursor-pointer font-medium">{item.question}</summary>
              <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
