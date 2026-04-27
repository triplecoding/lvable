import { api } from '@/lib/api';
import { buildMetadata } from '@/lib/seo';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const port = await api.getPortBySlug(params.slug);
  return buildMetadata({
    title: `${port.name} Port Intelligence | HeyMariner`,
    description: `${port.name} in ${port.country}: services, congestion, and harbour operational summary.`,
    path: `/ports/${params.slug}`
  });
}

export default async function PortDetailPage({ params }: Props) {
  const port = await api.getPortBySlug(params.slug);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-brand-700">{port.country} · {port.region}</p>
        <h1 className="text-3xl font-bold">{port.name}</h1>
        <p className="mt-2 text-slate-600">{port.summary}</p>
      </header>
      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-xl font-semibold">Available Services</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
          {port.services.map((service) => <li key={service}>{service}</li>)}
        </ul>
      </section>
      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-xl font-semibold">Congestion</h2>
        <p className="mt-2 text-sm text-slate-700">Current congestion level: {port.congestionLevel}</p>
      </section>
    </div>
  );
}
