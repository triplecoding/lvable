import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-slate-500 md:grid-cols-4">
        <div>
          <p className="text-base font-semibold text-slate-800">HeyMariner</p>
          <p className="mt-2">Professional maritime intelligence platform for vessels, crews, and operators.</p>
        </div>
        <div>
          <p className="font-semibold text-slate-800">Resources</p>
          <div className="mt-2 space-y-1">
            <Link href="/articles" className="block hover:text-brand-700">Articles</Link>
            <Link href="/pdf-library" className="block hover:text-brand-700">PDF Library</Link>
            <Link href="/ports" className="block hover:text-brand-700">Ports</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-slate-800">Company</p>
          <div className="mt-2 space-y-1">
            <Link href="/faq" className="block hover:text-brand-700">FAQ</Link>
            <Link href="/mariner-wiki" className="block hover:text-brand-700">Mariner Wiki</Link>
            <Link href="/dashboard" className="block hover:text-brand-700">Dashboard</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-slate-800">Compliance</p>
          <p className="mt-2">SEO + AEO ready architecture with structured schema and metadata coverage.</p>
        </div>
      </div>
    </footer>
  );
}
