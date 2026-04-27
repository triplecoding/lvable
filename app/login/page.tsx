'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await api.login({ email: String(data.get('email')), password: String(data.get('password')) });
    setMessage('Login request sent successfully.');
  }

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" required className="w-full rounded-lg border px-3 py-2" />
        <input name="password" type="password" placeholder="Password" required className="w-full rounded-lg border px-3 py-2" />
        <button className="w-full rounded-lg bg-brand-500 py-2 font-semibold text-white">Sign in</button>
      </form>
      {message && <p className="text-sm text-emerald-600">{message}</p>}
      <p className="text-sm">No account? <Link href="/register" className="text-brand-700">Register</Link></p>
    </div>
  );
}
