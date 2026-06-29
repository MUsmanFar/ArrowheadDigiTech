'use client';

import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import GlassCard from '@/components/hercules/ui/GlassCard';
import Reveal from '@/components/hercules/ui/Reveal';

interface Testimonial {
  id: string;
  name: string;
  role?: string | null;
  company?: string | null;
  content: string;
  featured?: boolean;
}

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/public/testimonials')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data)) return;
        const featured = data.filter((t) => t.featured);
        const source = featured.length > 0 ? featured : data;
        setTestimonials(source.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="hercules-section-warm py-24 md:py-32" aria-label="Client Testimonials">
      <div className="container-premium">
        <Reveal className="mb-14 max-w-2xl">
          <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e46f1e]">
            Client Results
          </p>
          <h2 className="mt-4 font-poppins text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            What our clients say.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 80}>
              <GlassCard hover padding="lg" className="flex h-full flex-col">
                <Quote className="mb-4 h-8 w-8 text-orange-100" aria-hidden="true" />
                <blockquote className="flex-1 font-montserrat text-sm leading-relaxed text-slate-600 md:text-base">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-50 font-poppins text-sm font-bold text-[#e46f1e]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-poppins text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="font-montserrat text-xs text-slate-500">
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
