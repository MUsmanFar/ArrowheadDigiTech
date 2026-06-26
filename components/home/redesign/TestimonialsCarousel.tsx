'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Quote, Star } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

interface Testimonial {
  id: string;
  name: string;
  role?: string | null;
  company?: string | null;
  content: string;
  featured?: boolean;
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="home-glass mx-3 w-[340px] shrink-0 rounded-[1.75rem] p-7 md:w-[380px]">
      <div className="flex items-center justify-between">
        <Quote className="h-8 w-8 text-[#E46F1E]/30" aria-hidden="true" />
        <div className="flex gap-0.5" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-[#E46F1E] text-[#E46F1E]" />
          ))}
        </div>
      </div>
      <blockquote className="mt-4 line-clamp-4 text-sm font-montserrat leading-relaxed text-slate-600 md:text-base">
        &ldquo;{t.content}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-3 border-t border-[#E5E7EB]/80 pt-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E46F1E] to-[#2B6EF2] text-sm font-bold font-poppins text-white">
          {t.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <cite className="not-italic text-sm font-bold font-poppins text-[#111827]">{t.name}</cite>
          <p className="truncate text-xs font-montserrat text-slate-400">
            {t.role || t.company || ''}
          </p>
        </div>
        <button
          type="button"
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/80 text-slate-400"
          aria-label={`Video testimonial placeholder for ${t.name}`}
        >
          <Play className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default function TestimonialsCarousel() {
  const { section: page } = useSiteSection('testimonials.page');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/public/testimonials')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data)) return;
        const featured = data.filter((t) => t.featured);
        setTestimonials((featured.length > 0 ? featured : data).slice(0, 8));
      })
      .catch(() => {});
  }, []);

  if (testimonials.length === 0) return null;

  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

  return (
    <SectionBackdrop variant="warm" className="py-28 md:py-40">
      <section aria-label="Testimonials">
        <div className="container-premium mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
              {page.badge}
            </p>
            <h2 className="text-4xl font-bold font-poppins leading-[1.04] tracking-tight text-[#111827] md:text-5xl">
              {page.headline}
              <span className="mt-1 block text-gradient-blue">{page.headlineAccent}</span>
            </h2>
            <p className="mt-4 font-montserrat text-slate-500">{page.subheadline}</p>
          </motion.div>
        </div>

        <div className="space-y-6 overflow-hidden">
          <div className="flex w-max animate-scroll">
            {row1.map((t, i) => (
              <TestimonialCard key={`${t.id}-a-${i}`} t={t} />
            ))}
          </div>
          <div className="flex w-max animate-scroll [animation-direction:reverse] [animation-duration:55s]">
            {row2.map((t, i) => (
              <TestimonialCard key={`${t.id}-b-${i}`} t={t} />
            ))}
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
