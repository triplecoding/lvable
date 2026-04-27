import Link from 'next/link';

const nav = [
  ['Articles', '/articles'],
  ['PDF Library', '/pdf-library'],
  ['Calculators', '/calculators'],
  ['Dashboard', '/dashboard']
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand-700">HeyMariner</Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-slate-600 transition hover:text-brand-700">
              {label}
            </Link>
          ))}
          <Link href="/login" className="rounded-lg bg-brand-500 px-3 py-2 text-white">Login</Link>
        </nav>
      </div>
    </header>
  );
}
