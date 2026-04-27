import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Mariner Wiki Network | HeyMariner',
  description: 'Professional mariner profiles, verified badges, and LinkedIn-style maritime knowledge sharing.',
  path: '/mariner-wiki'
});

const profiles = [
  { name: 'Captain Amelia Hart', role: 'Master Mariner', verified: true, badge: 'Blue Sea Verified', about: '20+ years in tanker operations and crew mentoring.' },
  { name: 'Chief Engineer Noor Rahman', role: 'Chief Engineer', verified: true, badge: 'Engine Room Expert', about: 'Specialized in fuel efficiency and maintenance strategy.' }
];

export default function MarinerWikiPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mariner Wiki</h1>
      <p className="text-slate-600">LinkedIn-style maritime network with profile verification via seaman book review and professional badge assignment.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {profiles.map((profile) => (
          <article key={profile.name} className="rounded-2xl border bg-white p-5">
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-slate-500">{profile.role}</p>
            <p className="mt-2 text-sm text-slate-700">{profile.about}</p>
            <p className="mt-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {profile.verified ? `Verified · ${profile.badge}` : 'Pending Verification'}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
