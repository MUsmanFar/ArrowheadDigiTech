'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import MagneticButton from './MagneticButton';
import SectionBackdrop from './shared/SectionBackdrop';

export default function CtaPremium() {
  const { section: cta } = useSiteSection('site.cta');
  const { section: nav } = useSiteSection('site.nav');
  const { studies } = useCaseStudies();
  const highlight = useMemo(
    () => studies.flatMap((s) => s.metrics).find((m) => m.value && m.label),
    [studies],
  );
  const portfolioLabel = nav.items.find((i) => i.href === '/portfolio')?.name ?? nav.items[1]?.name ?? '';

  return (
    <SectionBackdrop variant="cta" className="py-28 md:py-44">
      <section aria-label="Call to action">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.75rem] border border-[#E5E7EB]/80"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#E46F1E] via-[#E46F1E] to-[#f59e42]" />
            <div className="home-noise absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#2B6EF2]/20 blur-3xl" />

            <div className="relative grid gap-10 p-10 md:grid-cols-12 md:items-center md:p-16 lg:p-20">
              <div className="md:col-span-7">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-montserrat font-semibold uppercase tracking-widest text-white">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {cta.badge}
                </span>
                <h2 className="text-4xl font-bold font-poppins leading-[1.04] tracking-tight text-white md:text-5xl lg:text-6xl">
                  {cta.headline}
                  {cta.headlineAccent && (
                    <>
                      <br />
                      <span className="text-orange-100">{cta.headlineAccent}</span>
                    </>
                  )}
                </h2>
                <p className="mt-6 max-w-xl text-lg font-montserrat leading-relaxed text-orange-50/90">
                  {cta.description}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href={cta.buttonHref}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-10 py-4 text-sm font-bold font-montserrat text-[#E46F1E] shadow-xl transition-colors hover:bg-orange-50"
                  >
                    {cta.buttonLabel}
                    <ArrowUpRight size={18} />
                  </Link>
                  <MagneticButton
                    href="/portfolio"
                    variant="secondary"
                    className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
                  >
                    {portfolioLabel}
                    <ArrowUpRight size={18} />
                  </MagneticButton>
                </div>
              </div>

              <div className="hidden md:col-span-5 md:block">
                <div className="home-glass relative ml-auto aspect-square max-w-sm rounded-[2rem] p-8">
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/40 to-transparent" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <p className="text-xs font-montserrat uppercase tracking-widest text-slate-400">
                        {highlight?.label ?? cta.badge}
                      </p>
                      <p className="mt-2 text-5xl font-bold font-poppins text-[#111827]">
                        {highlight?.value ?? '↑'}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 rounded-full bg-[#E5E7EB]/80">
                        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#E46F1E] to-[#2B6EF2]" />
                      </div>
                      <div className="h-2 rounded-full bg-[#E5E7EB]/80">
                        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#2B6EF2] to-[#60a5fa]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
