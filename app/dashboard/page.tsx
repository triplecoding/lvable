'use client';

import { useEffect, useState } from 'react';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { api } from '@/lib/api';
import { DashboardData } from '@/lib/types';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.getDashboard().then(setData);
  }, []);

  if (!data) return <LoadingSkeleton rows={8} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="mt-2 text-slate-700">
          {data.profile.name} · {data.profile.email} · {data.profile.plan}
        </p>
        <p className="mt-2 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          {data.profile.verified ? data.profile.badge || 'Verified' : 'Pending Verification'}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold">Download History</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {data.downloadHistory.map((d) => <li key={d.id}>• {d.title}</li>)}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold">Recently Read</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {data.recentlyRead.map((a) => <li key={a.id}>• {a.title}</li>)}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold">Subscription Status</h2>
        <p className="mt-2 text-slate-700">{data.subscriptionStatus.active ? 'Active' : 'Inactive'} · Renewal: {data.subscriptionStatus.renewalDate}</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold">SEO Automation Agent</h2>
        <p className="mt-2 text-sm text-slate-700">Mode: {data.seoAgent.mode} · Queued tasks: {data.seoAgent.queuedTasks} · Last run: {data.seoAgent.lastRun}</p>
      </section>
    </div>
  );
}
