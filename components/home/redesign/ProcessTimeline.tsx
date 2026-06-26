'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';

export default function ProcessTimeline() {
  const { section: process } = useSiteSection('about.process');

  return (
    <section className="relative py-28 md:py-36 bg-[#fafafa] overflow-hidden" aria-label="Our process">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_0%_50%,rgba(251,146,60,0.06),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-orange-500 mb-4">
            {process.badge}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 tracking-tight">
            {process.title}
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {process.steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center lg:text-left"
              >
                <div className="relative inline-flex lg:flex mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.15)] flex items-center justify-center mx-auto lg:mx-0">
                    <span className="text-lg font-bold font-poppins text-orange-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {i < process.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-orange-300 to-transparent origin-left"
                      />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold font-poppins text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 font-montserrat leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
