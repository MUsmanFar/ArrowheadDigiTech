'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

export default function ProcessTimeline() {
  const { section: process } = useSiteSection('about.process');
  const [active, setActive] = useState(0);

  return (
    <SectionBackdrop theme="light" topFade className="py-28 md:py-40">
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

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative pl-8">
              <div className="absolute bottom-0 left-[15px] top-0 w-px bg-[#E5E7EB]" aria-hidden="true" />
              <motion.div
                className="absolute left-[15px] w-px origin-top bg-gradient-to-b from-[#E46F1E] to-[#2B6EF2]"
                initial={{ height: 0 }}
                whileInView={{ height: `${((active + 1) / process.steps.length) * 100}%` }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                style={{ top: 0 }}
                aria-hidden="true"
              />
              <ul className="space-y-6">
                {process.steps.map((step, i) => (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className={`group relative w-full rounded-2xl p-5 text-left transition-all duration-300 ${
                        active === i
                          ? 'figma-glass-light shadow-[0_24px_60px_-30px_rgba(17,24,39,0.15)]'
                          : 'hover:bg-white/60'
                      }`}
                    >
                      <span
                        className={`absolute -left-8 top-6 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold font-poppins transition-colors ${
                          active === i
                            ? 'border-[#E46F1E] bg-[#E46F1E] text-white shadow-[0_0_20px_rgba(228,111,30,0.5)]'
                            : 'border-[#E5E7EB] bg-white text-slate-400'
                        }`}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-bold font-poppins text-[#111827] md:text-xl">{step.title}</h3>
                      <p className="mt-2 text-sm font-montserrat leading-relaxed text-slate-500">{step.desc}</p>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="figma-glass-light relative min-h-[320px] overflow-hidden rounded-[2rem] p-10 md:min-h-[400px] md:p-12"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(43,110,242,0.12),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(228,111,30,0.1),transparent_50%)]" />
              <div className="relative flex h-full flex-col justify-center">
                <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
                  Step {String(active + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 text-3xl font-bold font-poppins text-[#111827] md:text-4xl">
                  {process.steps[active]?.title}
                </h3>
                <p className="mt-4 max-w-md font-montserrat leading-relaxed text-slate-500">
                  {process.steps[active]?.desc}
                </p>
                <div className="mt-10 space-y-3">
                  {[82, 68, 94].map((w, i) => (
                    <div key={i} className="h-2 overflow-hidden rounded-full bg-[#E5E7EB]/80">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#E46F1E] to-[#2B6EF2]"
                        initial={{ width: 0 }}
                        animate={{ width: `${w}%` }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
