'use client';

import React, { useMemo, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowUpRight,
  Bell,
  Bot,
  ChevronDown,
  Megaphone,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import type { ClientLogoData } from '@/lib/media';
import type { HeroContent } from '@/lib/site-content';
import { getSchedulingUrl } from '@/lib/scheduling';
import MagneticButton from './MagneticButton';
import AnimatedCounter from './AnimatedCounter';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useTestimonials } from '@/lib/use-testimonials';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

function HeroVisualScene() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 22 });
  const springY = useSpring(my, { stiffness: 120, damping: 22 });
  const rotateY = useTransform(springX, [-80, 80], [6, -6]);
  const rotateX = useTransform(springY, [-80, 80], [-4, 4]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto w-full max-w-[680px] perspective-[1400px] lg:ml-auto"
    >
      <motion.div style={{ rotateY, rotateX }} className="relative preserve-3d">
        {/* MacBook */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative rounded-[1.25rem] border border-[#E5E7EB]/90 bg-[#111827] p-2 shadow-[0_50px_120px_-40px_rgba(17,24,39,0.45)]"
        >
          <div className="rounded-[0.85rem] overflow-hidden bg-[#FAFAFA] border border-white/10">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#E5E7EB]/80 bg-white/90">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
              <div className="ml-2 h-5 flex-1 rounded-md bg-[#FAFAFA] border border-[#E5E7EB]/80" />
            </div>
            <div className="grid grid-cols-12 gap-2 p-3 min-h-[220px] md:min-h-[280px]">
              <div className="col-span-8 rounded-xl border border-[#E5E7EB]/80 bg-white p-3 shadow-sm">
                <p className="text-[9px] font-montserrat font-semibold uppercase tracking-widest text-slate-400">
                  Revenue Analytics
                </p>
                <div className="mt-2 flex items-end gap-1 h-20">
                  {[35, 55, 42, 68, 50, 82, 64, 95, 72, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                      className="flex-1 rounded-t bg-gradient-to-t from-[#E46F1E] to-[#f59e42]/70"
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-4 flex flex-col gap-2">
                <div className="rounded-xl border border-[#E5E7EB]/80 bg-gradient-to-br from-[#2B6EF2]/10 to-white p-2.5 flex-1">
                  <Megaphone className="h-3.5 w-3.5 text-[#2B6EF2]" />
                  <p className="mt-1 text-[9px] font-montserrat text-slate-500">Meta Ads ROAS</p>
                  <p className="text-lg font-bold font-poppins text-[#111827]">4.8×</p>
                </div>
                <div className="rounded-xl border border-[#E5E7EB]/80 bg-gradient-to-br from-[#E46F1E]/10 to-white p-2.5">
                  <TrendingUp className="h-3.5 w-3.5 text-[#E46F1E]" />
                  <p className="text-[9px] font-montserrat text-slate-500">Google Ads</p>
                  <p className="text-sm font-bold font-poppins text-[#111827]">+214%</p>
                </div>
              </div>
              <div className="col-span-12 rounded-xl home-glass-dark p-3 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-montserrat uppercase tracking-widest text-slate-400">AI Pipeline</p>
                    <p className="text-xl font-bold font-poppins">847 leads</p>
                  </div>
                  <Bot className="h-5 w-5 text-[#2B6EF2]" />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-1 h-2 w-[38%] rounded-b-lg bg-gradient-to-b from-[#374151] to-[#1f2937]" />
        </motion.div>

        {/* Phone */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-2 top-12 w-[118px] md:w-[132px] rounded-[1.4rem] border-[3px] border-[#111827] bg-[#111827] p-1 shadow-[0_30px_60px_-20px_rgba(17,24,39,0.35)]"
        >
          <div className="rounded-[1.1rem] overflow-hidden bg-white min-h-[180px]">
            <div className="h-5 bg-[#FAFAFA] border-b border-[#E5E7EB]" />
            <div className="p-2 space-y-2">
              <div className="rounded-lg bg-[#2B6EF2]/10 p-2">
                <p className="text-[8px] font-montserrat text-slate-500">Notifications</p>
                <p className="text-[10px] font-semibold font-poppins text-[#111827]">12 new leads</p>
              </div>
              <div className="rounded-lg bg-[#E46F1E]/10 p-2">
                <p className="text-[8px] font-montserrat text-slate-500">Conversion</p>
                <p className="text-[10px] font-bold font-poppins text-[#E46F1E]">+38%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating cards */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -left-4 top-8 hidden md:block home-glass rounded-2xl px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#E46F1E]" />
            <span className="text-xs font-montserrat font-semibold text-[#111827]">Automation live</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -left-2 bottom-16 hidden md:block home-glass rounded-2xl px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-[#2B6EF2]" />
            <span className="text-xs font-montserrat font-semibold text-[#111827]">Campaign optimized</span>
          </div>
        </motion.div>
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
  const { testimonials } = useTestimonials();
  const { section: labels } = useSiteSection('home.metrics-labels');
  const { section: clientStrip } = useSiteSection('site.client-logos');
  const { section: trustedBy } = useSiteSection('services.trusted-by');
  const { section: sectionLabels } = useSiteSection('about.section-labels');

  const stats = useMemo(() => {
    const projectCount = projects.length || studies.length;
    const industries = new Set(
      [...projects.map((p) => p.industry), ...studies.map((s) => s.industry)].filter(Boolean),
    );
    const highlightMetrics = studies
      .flatMap((s) => s.metrics)
      .filter((m) => m.value && m.label)
      .slice(0, 2);
    return [
      { value: String(projectCount), label: labels.projectsLabel },
      { value: String(industries.size), label: labels.industriesLabel },
      ...highlightMetrics.map((m) => ({ value: m.value, label: m.label })),
    ];
  }, [projects, studies, labels.projectsLabel, labels.industriesLabel]);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const primaryHref = hero.primaryCta?.external
    ? getSchedulingUrl('hero')
    : hero.primaryCta?.href || getSchedulingUrl('hero');

  const sortedLogos = [...logos].sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 6);
  const ratingMetric = stats.find((s) => /rating|score|star/i.test(s.label));

  return (
    <SectionBackdrop variant="hero">
      <section
        ref={ref}
        className="relative min-h-[100svh] flex flex-col justify-center"
        aria-label="Hero"
      >
        <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(229,231,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(229,231,235,0.5) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
        </motion.div>

        <div className="container-premium relative w-full pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              {hero.badge && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="home-glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#E46F1E]" />
                  <span className="text-xs font-montserrat font-semibold tracking-wide text-slate-600">
                    {hero.badge}
                  </span>
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="text-[2.65rem] font-bold font-poppins leading-[1.02] tracking-[-0.035em] text-[#111827] sm:text-5xl md:text-6xl lg:text-[4.5rem]"
              >
                {hero.headline}{' '}
                {hero.headlineAccent && (
                  <span className="text-gradient-orange">{hero.headlineAccent}</span>
                )}{' '}
                {hero.headlineSuffix}
              </motion.h1>

              {hero.subheadline && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="mt-7 max-w-xl text-lg font-montserrat leading-relaxed text-slate-500 md:text-xl"
                >
                  {hero.subheadline}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
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

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <div className="home-glass flex items-center gap-2 rounded-full px-4 py-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#E46F1E] text-[#E46F1E]" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-xs font-montserrat font-semibold text-slate-600">
                    {ratingMetric?.value ?? testimonials.length} {sectionLabels.statClientTestimonials}
                  </span>
                </div>
                <div className="home-glass rounded-full px-4 py-2 text-xs font-montserrat font-semibold text-[#2B6EF2]">
                  {trustedBy.badge}
                </div>
              </motion.div>

              {stats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
                >
                  {stats.slice(0, 4).map((stat) => (
                    <div key={stat.label} className="home-glass rounded-2xl px-4 py-5">
                      <AnimatedCounter
                        value={stat.value}
                        className="block text-2xl font-bold font-poppins tracking-tight text-[#111827] md:text-3xl"
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
                  transition={{ delay: 0.5 }}
                  className="mt-12 border-t border-[#E5E7EB]/80 pt-8"
                >
                  <p className="mb-4 text-[10px] font-montserrat font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {clientStrip.label}
                  </p>
                  <div className="flex flex-wrap items-center gap-5">
                    {sortedLogos.map((logo) => (
                      <SafeImage
                        key={logo.id}
                        src={logo.logo}
                        alt={logo.companyName}
                        width={100}
                        height={32}
                        className="h-7 w-auto max-w-[90px] object-contain opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <HeroVisualScene />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400"
          aria-hidden="true"
        >
          <span className="text-[10px] font-montserrat uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </section>
    </SectionBackdrop>
  );
}
