'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import MagneticButton from './MagneticButton';
import SectionBackdrop from './shared/SectionBackdrop';

export default function CtaPremium() {
  const { section: cta } = useSiteSection('site.cta');
  const { section: nav } = useSiteSection('site.nav');
  const portfolioLabel = nav.items.find((i) => i.href === '/portfolio')?.name ?? nav.items[1]?.name ?? '';

  return (
    <SectionBackdrop theme="aurora" className="py-32 md:py-48">
      <section aria-label="Call to action">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-4xl text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -left-8 top-0 h-2 w-2 rounded-full bg-[#E46F1E]/60 blur-sm"
              aria-hidden="true"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="pointer-events-none absolute -right-4 bottom-12 h-3 w-3 rounded-full bg-[#2B6EF2]/50 blur-sm"
              aria-hidden="true"
            />

            <p className="mb-6 text-xs font-montserrat font-semibold uppercase tracking-[0.28em] text-[#E46F1E]">
              {cta.badge}
            </p>
            <h2 className="text-4xl font-bold font-poppins leading-[1.04] tracking-tight text-white md:text-6xl lg:text-7xl">
              {cta.headline}
              {cta.headlineAccent && (
                <>
                  <br />
                  <span className="text-gradient-brand">{cta.headlineAccent}</span>
                </>
              )}
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg font-montserrat leading-relaxed text-slate-400">
              {cta.description}
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href={cta.buttonHref}>{cta.buttonLabel}</MagneticButton>
              <MagneticButton
                href="/portfolio"
                variant="secondary"
                className="!border-white/20 !bg-white/5 !text-white hover:!bg-white/10"
              >
                {portfolioLabel}
                <ArrowUpRight size={18} />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
