'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';
import { Badge } from '@/components/design-system';
import Button from '@/components/design-system/Button';

export default function ServicesHeroRedesign() {
  const { section: hero } = useSiteSection('services.hero');
  const { section: nav } = useSiteSection('site.nav');

  return (
    <section className="relative overflow-hidden bg-page-surface pt-32 pb-20 md:pt-40 md:pb-28" aria-label="Services hero">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-orange-200/20 blur-3xl" />
      </div>

      <div className="container-premium relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          className="max-w-4xl"
        >
          {hero.badge && <Badge>{hero.badge}</Badge>}
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 font-poppins tracking-tight leading-[1.02]">
            {hero.headline}
            {hero.headlineAccent && (
              <>
                <br />
                <span className="text-gradient-orange">{hero.headlineAccent}</span>
              </>
            )}
          </h1>
          {hero.subheadline && (
            <p className="mt-6 text-lg md:text-xl text-slate-500 font-montserrat leading-relaxed max-w-2xl">
              {hero.subheadline}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={nav.ctaHref} variant="primary">
              {nav.ctaLabel}
            </Button>
            <Button href="/case-studies" variant="secondary">
              {nav.items.find((i) => i.href.includes('case'))?.name ?? 'Case studies'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
