'use client';

import { useMemo, useState } from 'react';
import { CalculatorDefinition } from '@/lib/types';

function compute(formula: string, values: Record<string, number>) {
  const keys = Object.keys(values);
  const fn = new Function(...keys, `return ${formula};`) as (...args: number[]) => number;
  return fn(...keys.map((k) => values[k] || 0));
}

export function CalculatorRenderer({ calculators }: { calculators: CalculatorDefinition[] }) {
  const [activeId, setActiveId] = useState(calculators[0]?.id || '');
  const [values, setValues] = useState<Record<string, number>>({});

  const active = useMemo(() => calculators.find((c) => c.id === activeId) || calculators[0], [calculators, activeId]);
  const result = active ? compute(active.formula, values) : 0;

  if (!active) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {calculators.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`rounded-lg px-4 py-2 text-sm ${c.id === active.id ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
            {c.title}
          </button>
        ))}
      </div>
      <p className="mb-6 text-sm text-slate-600">{active.description}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {active.fields.map((field) => (
          <label key={field.id} className="space-y-2 text-sm">
            <span className="font-medium">{field.label} {field.unit ? `(${field.unit})` : ''}</span>
            <input
              type="number"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              onChange={(e) => setValues((p) => ({ ...p, [field.id]: Number(e.target.value) }))}
            />
          </label>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-brand-50 p-4 text-lg font-semibold text-brand-700">Result: {Number.isFinite(result) ? result.toFixed(2) : '0.00'}</div>
    </section>
  );
}
