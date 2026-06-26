'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';

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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/api/public/testimonials')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data)) return;
        const featured = data.filter((t) => t.featured);
        setTestimonials((featured.length > 0 ? featured : data).slice(0, 6));
      })
      .catch(() => {});
  }, []);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  return (
    <section className="relative py-28 md:py-36 bg-white" aria-label="Testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-orange-500 mb-4">
              {page.badge}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 tracking-tight leading-[1.05]">
              {page.headline}
              <span className="block text-slate-400">{page.headlineAccent}</span>
            </h2>
            <p className="mt-4 text-slate-500 font-montserrat">{page.subheadline}</p>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          <div className="lg:col-span-8 relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[2rem] bg-white/60 backdrop-blur-2xl border border-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.15)] p-10 md:p-14"
              >
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-orange-50/50 via-white to-blue-50/30 pointer-events-none" />
                <Quote className="relative w-10 h-10 text-orange-200 mb-6" />
                <blockquote className="relative text-xl md:text-2xl font-montserrat text-slate-700 leading-relaxed">
                  &ldquo;{current.content}&rdquo;
                </blockquote>
                <div className="relative mt-8 pt-6 border-t border-slate-200/60 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold font-poppins">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic font-bold font-poppins text-slate-900">{current.name}</cite>
                    <p className="text-sm text-slate-500 font-montserrat">
                      {current.role || current.company || ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-orange-500' : 'w-2 bg-slate-200'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
