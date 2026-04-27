'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Slide } from '@/lib/types';

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[active];

  return (
    <section className="gradient-bg relative overflow-hidden rounded-3xl p-6 sm:p-10">
      <img src={slide.image} alt={slide.title} className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="relative z-10 max-w-2xl space-y-4">
        <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-brand-700">HeyMariner Insights</span>
        <h1 className="text-3xl font-bold sm:text-5xl">{slide.title}</h1>
        <p className="text-slate-700">{slide.subtitle}</p>
        <Link href={slide.ctaHref} className="inline-block rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white">
          {slide.ctaLabel}
        </Link>
      </div>
      <div className="relative z-10 mt-6 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            className={`h-2 w-8 rounded-full ${i === active ? 'bg-brand-500' : 'bg-slate-300'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
