'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCaseStudies } from '@/lib/use-case-studies';

export default function DynamicOutcomesTicker() {
  const { studies } = useCaseStudies();

  const outcomes = useMemo(() => {
    const fromKeyResults = studies.flatMap((s) => s.keyResults).filter(Boolean);
    if (fromKeyResults.length > 0) return fromKeyResults;
    return studies
      .flatMap((s) => s.metrics.map((m) => `${m.value} ${m.label}`.trim()))
      .filter(Boolean);
  }, [studies]);

  if (outcomes.length === 0) return null;

  return (
    <section className="bg-slate-50 border-y border-slate-100 py-10 overflow-hidden" aria-label="Key Outcomes">
      <div className="flex">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 30,
          }}
        >
          {[...outcomes, ...outcomes].map((text, index) => (
            <div key={index} className="flex items-center mx-6">
              <span className="text-lg md:text-xl font-bold text-slate-700 font-inter tracking-tight">
                {text}
              </span>
              <span className="mx-6 text-orange-300 text-xl font-light">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
