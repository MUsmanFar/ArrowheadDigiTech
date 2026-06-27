'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
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

export default function TestimonialsCarousel() {
  const { section: page } = useSiteSection('testimonials.page');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);

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

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const t = testimonials[active];

  return (
    <SectionBackdrop theme="dark-glow" topFade bottomFade className="py-28 md:py-40">
      <section aria-label="Testimonials">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
              {page.badge}
            </p>
            <h2 className="text-4xl font-bold font-poppins leading-[1.04] tracking-tight text-white md:text-5xl">
              {page.headline}
              {page.headlineAccent && (
                <span className="mt-1 block text-gradient-brand">{page.headlineAccent}</span>
              )}
            </h2>
            {page.subheadline && (
              <p className="mt-4 font-montserrat text-slate-400">{page.subheadline}</p>
            )}
          </motion.div>

          <div className="relative mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 24, rotateX: 8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -16, rotateX: -8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="figma-glass relative overflow-hidden rounded-[2rem] p-10 md:p-14"
                style={{ transformPerspective: 1200 }}
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2B6EF2]/20 blur-[80px]" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#E46F1E]/15 blur-[60px]" />

                <div className="relative flex items-start justify-between">
                  <Quote className="h-10 w-10 text-[#E46F1E]/40" aria-hidden="true" />
                  <div className="flex gap-1" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#E46F1E] text-[#E46F1E]" />
                    ))}
                  </div>
                </div>

                <blockquote className="relative mt-6 text-xl font-montserrat leading-relaxed text-slate-200 md:text-2xl">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                <div className="relative mt-10 flex items-center gap-4 border-t border-white/10 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#E46F1E] to-[#2B6EF2] text-base font-bold font-poppins text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic text-base font-bold font-poppins text-white">{t.name}</cite>
                    <p className="text-sm font-montserrat text-slate-400">
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            {testimonials.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? 'w-8 bg-[#E46F1E]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Show testimonial ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
