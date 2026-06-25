'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';

export default function PortfolioHero() {
  const { section: hero } = useSiteSection('portfolio.hero');

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-white" aria-label="Portfolio Hero">
      <div className="absolute inset-0 subtle-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-50/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 mt-16">
        {hero.badge && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
              {hero.badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 font-poppins tracking-tight leading-[1.05]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {hero.headline}
          {hero.headlineAccent && (
            <>
              <br />
              <span className="text-orange-500">{hero.headlineAccent}</span>
            </>
          )}
        </motion.h1>

        {hero.subheadline && (
          <motion.p
            className="mt-6 text-lg md:text-xl text-slate-500 font-inter leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {hero.subheadline}
          </motion.p>
        )}
      </div>
    </section>
  );
}
