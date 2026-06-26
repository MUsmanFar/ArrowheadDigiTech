'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

export default function ProcessTimeline() {
  const { section: process } = useSiteSection('about.process');

  return (
    <SectionBackdrop variant="cool" className="py-28 md:py-40">
      <section aria-label="Our process">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center md:mb-20"
          >
            <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
              {process.badge}
            </p>
            <h2 className="text-4xl font-bold font-poppins tracking-tight text-[#111827] md:text-5xl">
              {process.title}
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-[#E5E7EB] lg:block" />
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
              {process.steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative min-w-[260px] flex-shrink-0 snap-start lg:min-w-0"
                >
                  {i < process.steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                      className="absolute top-7 hidden h-px w-full origin-left bg-gradient-to-r from-[#E46F1E]/70 to-[#2B6EF2]/30 lg:block"
                      style={{ left: '50%' }}
                    />
                  )}
                  <div className="home-glass relative z-[1] h-full rounded-[1.75rem] p-6 transition-all duration-500 hover:-translate-y-1 md:p-7">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E46F1E] to-[#f59e42] text-sm font-bold font-poppins text-white shadow-[0_12px_30px_-10px_rgba(228,111,30,0.55)]">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg font-bold font-poppins text-[#111827]">{step.title}</h3>
                    <p className="mt-2 text-sm font-montserrat leading-relaxed text-slate-500">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
