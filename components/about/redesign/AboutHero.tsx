'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';
import { Badge } from '@/components/design-system';
import Button from '@/components/design-system/Button';

export default function AboutHero() {
  const { section: hero } = useSiteSection('about.hero');
  const { section: nav } = useSiteSection('site.nav');
  const portfolioItem = nav.items.find((i) => i.href === '/portfolio');

  return (
    <section className="relative overflow-hidden bg-page-surface pt-32 pb-20 md:pt-40 md:pb-28" aria-label="About hero">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-200/15 blur-3xl" />
      </div>

      <div className="container-premium relative">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            className="lg:col-span-8"
          >
            <Badge>{hero.badge}</Badge>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 font-poppins tracking-tight leading-[1.02] text-balance">
              {hero.headline}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            className="lg:col-span-4"
          >
            <p className="text-base md:text-lg text-slate-500 font-montserrat leading-relaxed">
              {hero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={nav.ctaHref} variant="primary">
                {nav.ctaLabel}
              </Button>
              {portfolioItem && (
                <Button href={portfolioItem.href} variant="secondary">
                  {portfolioItem.name}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
