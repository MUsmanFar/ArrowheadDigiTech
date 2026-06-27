'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import type { HeroContent } from '@/lib/site-content';
import { getSchedulingUrl } from '@/lib/scheduling';
import MagneticButton from './MagneticButton';
import SectionBackdrop from './shared/SectionBackdrop';
import NeuralBackground from './shared/NeuralBackground';

function FloatingWidgets() {
  return (
    <>
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="figma-glass absolute right-[8%] top-[28%] hidden w-52 rounded-2xl p-4 lg:block"
      >
        <p className="text-[10px] font-montserrat uppercase tracking-widest text-slate-400">Analytics</p>
        <div className="mt-2 flex items-end gap-1 h-16">
          {[40, 65, 45, 80, 55, 92].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-[#2B6EF2] to-[#60a5fa]/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="figma-glass absolute left-[6%] top-[38%] hidden rounded-2xl px-4 py-3 lg:block"
      >
        <TrendingUp className="h-4 w-4 text-[#E46F1E]" />
        <p className="mt-1 text-lg font-bold font-poppins text-white">+214%</p>
        <p className="text-[10px] font-montserrat text-slate-400">Growth</p>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="figma-glass absolute bottom-[22%] right-[18%] hidden rounded-2xl px-4 py-3 lg:block"
      >
        <p className="text-[10px] font-montserrat text-slate-400">AI Nodes</p>
        <p className="text-sm font-bold font-poppins text-white">Active</p>
      </motion.div>
    </>
  );
}

export default function HeroRedesign({ hero }: { hero: HeroContent }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 80, damping: 20 });
  const springY = useSpring(my, { stiffness: 80, damping: 20 });
  const parallaxX = useTransform(springX, [-120, 120], [-12, 12]);
  const parallaxY = useTransform(springY, [-120, 120], [-8, 8]);

  const primaryHref = hero.primaryCta?.external
    ? getSchedulingUrl('hero')
    : hero.primaryCta?.href || getSchedulingUrl('hero');

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <SectionBackdrop theme="hero-dark" className="border-b border-white/5" bottomFade>
      <section
        ref={ref}
        onMouseMove={onMove}
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-24 pb-20"
        aria-label="Hero"
      >
        <NeuralBackground />
        <FloatingWidgets />

        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          className="container-premium relative z-10 max-w-4xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold font-poppins leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {hero.headline}{' '}
            {hero.headlineAccent && (
              <span className="text-gradient-brand">{hero.headlineAccent}</span>
            )}{' '}
            {hero.headlineSuffix}
          </motion.h1>

          {hero.subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.8 }}
              className="mx-auto mt-7 max-w-2xl text-base font-montserrat leading-relaxed text-slate-400 md:text-lg"
            >
              {hero.subheadline}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {hero.primaryCta && (
              <MagneticButton href={primaryHref} external={hero.primaryCta.external}>
                {hero.primaryCta.label}
                <ArrowUpRight size={18} />
              </MagneticButton>
            )}
            {hero.secondaryCta && (
              <MagneticButton
                href={hero.secondaryCta.href}
                variant="secondary"
                className="!border-white/20 !bg-white/5 !text-white hover:!bg-white/10"
              >
                {hero.secondaryCta.label}
                <ArrowUpRight size={18} />
              </MagneticButton>
            )}
          </motion.div>
        </motion.div>
      </section>
    </SectionBackdrop>
  );
}
