import Link from 'next/link';
import { api } from '@/lib/api';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Port & Harbour Directory | HeyMariner',
  description: 'Professional maritime directory with port services, congestion insights, and harbour intelligence.',
  path: '/ports'
});

export default async function PortsPage() {
  const ports = await api.getPorts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Port & Harbour Directory</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {ports.map((port) => (
          <Link key={port.id} href={`/ports/${port.slug}`} className="rounded-2xl border bg-white p-5 hover:border-brand-300">
            <p className="text-xs font-semibold text-brand-700">{port.country} · {port.region}</p>
            <h2 className="mt-1 text-xl font-semibold">{port.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{port.summary}</p>
            <p className="mt-2 text-xs text-slate-500">Congestion: {port.congestionLevel}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
