'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '@/lib/case-studies';

const testimonials = caseStudies
  .filter((s) => s.testimonial)
  .slice(0, 3)
  .map((s) => ({
    ...s.testimonial!,
    slug: s.slug,
    client: s.client,
    industry: s.industry,
  }));

const cardBgGradients = [
  'from-orange-500/5 via-orange-500/[0.02] to-transparent',
  'from-blue-500/5 via-blue-500/[0.02] to-transparent',
  'from-emerald-500/5 via-emerald-500/[0.02] to-transparent',
];

export default function TestimonialSection() {
  if (testimonials.length === 0) return null;

  return (
    <section className="relative py-28 md:py-36 bg-slate-950 overflow-hidden" aria-label="Client Testimonials">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle at center, #f97316, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins tracking-tight">
            What our clients say.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
              className="relative group"
            >
              <div className="relative p-7 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl flex flex-col h-full transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.1] hover:shadow-[0_8px_32px_-8px_rgba(249,115,22,0.1)]">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${cardBgGradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative">
                  <svg className="w-8 h-8 text-orange-500/20 mb-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <blockquote className="font-inter text-sm md:text-base leading-relaxed text-slate-300 flex-1">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold font-poppins text-sm flex-shrink-0 shadow-lg shadow-orange-500/20">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <cite className="not-italic text-sm font-semibold text-white font-poppins block truncate">
                        {t.name}
                      </cite>
                      <span className="text-xs text-slate-500 font-inter">{t.role}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
