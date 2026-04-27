'use client';

import Link from 'next/link';
import { useState } from 'react';

const nav = [
  ['Articles', '/articles'],
  ['PDF Library', '/pdf-library'],
  ['Calculators', '/calculators'],
  ['Ports', '/ports'],
  ['Mariner Wiki', '/mariner-wiki'],
  ['FAQ', '/faq'],
  ['Dashboard', '/dashboard']
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand-700">HeyMariner</Link>
        <button className="rounded-md border px-3 py-2 text-sm md:hidden" onClick={() => setOpen((v) => !v)}>Menu</button>
        <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-slate-600 transition hover:text-brand-700">
              {label}
            </Link>
          ))}
          <Link href="/login" className="rounded-lg bg-brand-500 px-3 py-2 text-white">Login</Link>
        </nav>
      </div>
      {open && (
        <div className="border-t px-4 py-3 md:hidden">
          <div className="grid gap-2 text-sm">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-md px-2 py-1 text-slate-700 hover:bg-slate-100" onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/login" className="rounded-md bg-brand-500 px-2 py-2 text-center font-semibold text-white" onClick={() => setOpen(false)}>
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
