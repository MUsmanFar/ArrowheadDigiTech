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

export default function TestimonialSection() {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-white" aria-label="Client Testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="max-w-2xl mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins tracking-tight">
            What our clients say.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative p-6 md:p-8 rounded-xl border border-slate-200 flex flex-col"
            >
              <blockquote className="font-inter text-sm md:text-base leading-relaxed text-slate-600 flex-1">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold font-poppins text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <cite className="not-italic text-sm font-semibold text-slate-900 font-poppins block truncate">
                    {t.name}
                  </cite>
                  <span className="text-xs text-slate-400 font-inter">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
