'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

const femaleNamesByCountry: Record<string, string> = {
  US: 'Emma',
  IN: 'Ananya',
  PH: 'Maria',
  SG: 'Aisha'
};

export function SmartChatbot() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [links, setLinks] = useState<{ title: string; href: string }[]>([]);

  const country = useMemo(() => (Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1] || 'US').toUpperCase(), []);
  const assistantName = femaleNamesByCountry[country] || 'Amelia';

  async function ask() {
    const { data } = await api.chat({ query, geoCountry: country });
    setAnswer(data.answer);
    setLinks(data.suggestedArticles);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setOpen((v) => !v)} className="rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-lg">
        Chat with {assistantName}
      </button>
      {open && (
        <div className="mt-2 w-[min(92vw,360px)] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <p className="text-sm text-slate-600">Hi, I am {assistantName}. Ask anything about maritime operations.</p>
          <textarea value={query} onChange={(e) => setQuery(e.target.value)} className="mt-2 h-24 w-full rounded-lg border p-2 text-sm" />
          <button onClick={ask} className="mt-2 rounded-lg bg-brand-500 px-3 py-2 text-sm font-semibold text-white">Ask</button>
          {answer && <p className="mt-3 text-sm text-slate-700">{answer}</p>}
          {!!links.length && (
            <div className="mt-3 space-y-1">
              <p className="text-xs font-semibold text-slate-500">Recommended articles</p>
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-brand-700 hover:underline">
                  {link.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
