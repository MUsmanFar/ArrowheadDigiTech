'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getSchedulingUrl } from '@/lib/scheduling';
import { useSiteSection } from '@/lib/use-site-content';

export default function HeroSection() {
  const { section: hero } = useSiteSection('home.hero');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const primaryHref = hero.primaryCta?.external
    ? getSchedulingUrl('hero')
    : hero.primaryCta?.href || getSchedulingUrl('hero');

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-slate-950" aria-label="Hero">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle at center, #f97316, transparent 70%)' }} />
      </motion.div>

      <motion.div style={{ y: contentY, opacity }} className="container-premium relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          {hero.badge && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}>
              <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase text-orange-300/80 bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-8">
                {hero.badge}
              </span>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0, 1] }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[1.05] font-poppins">
              {hero.headline}{' '}
              {hero.headlineAccent && (
                <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                  {hero.headlineAccent}
                </span>
              )}{' '}
              {hero.headlineSuffix}
            </h1>
          </motion.div>

          {hero.subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
              className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-inter"
            >
              {hero.subheadline}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            className="mt-12 flex flex-wrap gap-5 items-center justify-center"
          >
            {hero.primaryCta && (
              <a
                href={primaryHref}
                target={hero.primaryCta.external ? '_blank' : undefined}
                rel={hero.primaryCta.external ? 'noopener noreferrer' : undefined}
                className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-b from-orange-500 to-orange-600 text-white text-base font-semibold shadow-[0_8px_24px_-4px_rgba(249,115,22,0.4)] transition-all duration-300 ease-out hover:shadow-[0_12px_36px_-6px_rgba(249,115,22,0.6)] hover:-translate-y-0.5"
              >
                <span className="relative">{hero.primaryCta.label}</span>
                <ArrowUpRight size={18} className="relative" />
              </a>
            )}
            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-white/5 text-white text-base font-semibold border border-white/10 backdrop-blur-sm transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5"
              >
                <span>{hero.secondaryCta.label}</span>
                <ArrowUpRight size={18} />
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
