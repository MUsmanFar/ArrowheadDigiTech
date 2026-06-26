'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import type { ClientLogoData } from '@/lib/media';
import type { HeroContent } from '@/lib/site-content';
import { getSchedulingUrl } from '@/lib/scheduling';
import MagneticButton from './MagneticButton';
import AnimatedCounter from './AnimatedCounter';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';

function DashboardComposition() {
  return (
    <div className="relative w-full max-w-[640px] mx-auto lg:mx-0 lg:ml-auto perspective-[1200px]">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative rounded-[2rem] border border-white/60 bg-white/50 backdrop-blur-2xl shadow-[0_40px_100px_-30px_rgba(15,23,42,0.18)] p-4 md:p-5"
      >
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="w-3 h-3 rounded-full bg-rose-300/80" />
          <div className="w-3 h-3 rounded-full bg-amber-300/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-300/80" />
          <div className="ml-3 flex-1 h-7 rounded-lg bg-slate-100/80 border border-slate-200/50" />
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-7 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 p-4 shadow-sm">
            <p className="text-[10px] font-montserrat font-semibold uppercase tracking-widest text-slate-400 mb-2">
              Growth Analytics
            </p>
            <div className="flex items-end gap-1 h-24">
              {[40, 65, 45, 80, 55, 92, 70, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.6, ease: 'easeOut' }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-orange-500/90 to-orange-300/70"
                />
              ))}
            </div>
          </div>
          <div className="col-span-5 flex flex-col gap-3">
            <div className="rounded-2xl bg-white border border-slate-100 p-3 shadow-sm flex-1">
              <TrendingUp className="w-4 h-4 text-emerald-500 mb-2" />
              <p className="text-2xl font-bold font-poppins text-slate-900">+148%</p>
              <p className="text-[10px] text-slate-500 font-montserrat">Lead conversion</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100/60 p-3 shadow-sm">
              <Zap className="w-4 h-4 text-orange-500 mb-1" />
              <p className="text-xs font-montserrat text-slate-600">Ship velocity</p>
              <p className="text-lg font-bold font-poppins text-slate-900">3.2×</p>
            </div>
          </div>
          <div className="col-span-12 rounded-2xl bg-slate-900 p-4 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.35),transparent_50%)]" />
            <div className="relative flex justify-between items-center">
              <div>
                <p className="text-[10px] font-montserrat uppercase tracking-widest text-slate-400">Active projects</p>
                <p className="text-3xl font-bold font-poppins mt-1">24</p>
              </div>
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D'].map((l) => (
                  <div
                    key={l}
                    className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold"
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-6 top-16 hidden md:block rounded-2xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.2)] px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-montserrat font-semibold text-slate-700">Client retention 96%</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroRedesign({
  hero,
  logos,
}: {
  hero: HeroContent;
  logos: ClientLogoData[];
}) {
  const { projects } = useProjects();
  const { studies } = useCaseStudies();
  const { section: labels } = useSiteSection('home.metrics-labels');
  const { section: clientStrip } = useSiteSection('site.client-logos');

  const stats = useMemo(() => {
    const projectCount = projects.length || studies.length;
    const industries = new Set(
      [...projects.map((p) => p.industry), ...studies.map((s) => s.industry)].filter(Boolean),
    );
    const highlightMetrics = studies
      .flatMap((s) => s.metrics)
      .filter((m) => m.value && m.label)
      .slice(0, 2);
    const rows = [
      { value: String(projectCount), label: labels.projectsLabel },
      { value: String(industries.size), label: labels.industriesLabel },
      ...highlightMetrics.map((m) => ({ value: m.value, label: m.label })),
    ];
    return rows;
  }, [projects, studies, labels.projectsLabel, labels.industriesLabel]);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const primaryHref = hero.primaryCta?.external
    ? getSchedulingUrl('hero')
    : hero.primaryCta?.href || getSchedulingUrl('hero');

  const sortedLogos = [...logos].sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 5);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#fafafa]"
      aria-label="Hero"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(251,146,60,0.12),transparent)]" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-100/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-slate-200/30 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {hero.badge && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200/60 shadow-sm backdrop-blur-md mb-8"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-montserrat font-semibold tracking-wide text-slate-600">
                  {hero.badge}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold font-poppins text-slate-900 tracking-[-0.03em] leading-[1.02]"
            >
              {hero.headline}{' '}
              {hero.headlineAccent && (
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {hero.headlineAccent}
                </span>
              )}{' '}
              {hero.headlineSuffix}
            </motion.h1>

            {hero.subheadline && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 text-lg md:text-xl text-slate-500 font-montserrat leading-relaxed max-w-xl"
              >
                {hero.subheadline}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              {hero.primaryCta && (
                <MagneticButton href={primaryHref} external={hero.primaryCta.external}>
                  {hero.primaryCta.label}
                  <ArrowUpRight size={18} />
                </MagneticButton>
              )}
              {hero.secondaryCta && (
                <MagneticButton href={hero.secondaryCta.href} variant="secondary">
                  {hero.secondaryCta.label}
                  <ArrowUpRight size={18} />
                </MagneticButton>
              )}
            </motion.div>

            {stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {stats.slice(0, 4).map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.1)] px-4 py-5"
                  >
                    <AnimatedCounter
                      value={stat.value}
                      className="block text-2xl md:text-3xl font-bold font-poppins text-slate-900 tracking-tight"
                    />
                    <p className="mt-1 text-[10px] font-montserrat font-semibold uppercase tracking-widest text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {sortedLogos.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-8 border-t border-slate-200/60"
              >
                <p className="text-[10px] font-montserrat font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
                  {clientStrip.label}
                </p>
                <div className="flex flex-wrap items-center gap-6 opacity-70">
                  {sortedLogos.map((logo) => (
                    <SafeImage
                      key={logo.id}
                      src={logo.logo}
                      alt={logo.companyName}
                      width={100}
                      height={32}
                      className="h-8 w-auto max-w-[100px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <DashboardComposition />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        aria-hidden="true"
      >
        <span className="text-[10px] font-montserrat uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
