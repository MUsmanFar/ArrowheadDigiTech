'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building2, FolderKanban, Sparkles, Users } from 'lucide-react';
import type { HeroContent } from '@/lib/site-content';
import { getSchedulingUrl } from '@/lib/scheduling';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import HerculesButton from '../ui/HerculesButton';
import HeroVisual from '../ui/HeroVisual';
import IconBox from '../ui/IconBox';

export default function HerculesHero({ hero }: { hero: HeroContent }) {
  const { projects } = useProjects();
  const { studies } = useCaseStudies();
  const { section: labels } = useSiteSection('home.metrics-labels');
  const { section: aboutLabels } = useSiteSection('about.section-labels');

  const primaryHref = hero.primaryCta?.external
    ? getSchedulingUrl('hero')
    : hero.primaryCta?.href || getSchedulingUrl('hero');

  const stats = useMemo(() => {
    const projectCount = projects.length || studies.length || 0;
    const industries = new Set(
      [...projects.map((p) => p.industry), ...studies.map((s) => s.industry)].filter(Boolean),
    );
    return [
      { value: `${Math.max(projectCount, 1)}+`, label: labels.projectsLabel, icon: FolderKanban, variant: 'orange' as const },
      { value: `${Math.max(industries.size, 1)}+`, label: labels.industriesLabel, icon: Building2, variant: 'blue' as const },
      { value: `${Math.max(studies.length, 1)}+`, label: aboutLabels.statCaseStudies, icon: Briefcase, variant: 'emerald' as const },
      { value: '7+', label: 'Years Experience', icon: Users, variant: 'violet' as const },
    ];
  }, [projects, studies, labels, aboutLabels.statCaseStudies]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden hercules-hero-bg hercules-ambient-noise" aria-label="Hero">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(15,23,42,0.04) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-orange-200/20 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-32 h-80 w-80 rounded-full bg-blue-200/15 blur-[90px]" aria-hidden="true" />

      <div className="container-premium relative flex min-h-[100svh] flex-col justify-center pt-32 pb-24 md:pt-36 md:pb-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-2xl"
          >
            {hero.badge && (
              <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-200/60 bg-white/90 px-5 py-2.5 shadow-[0_12px_40px_-20px_rgba(228,111,30,0.3)] backdrop-blur-xl">
                <Sparkles size={14} className="text-[#e46f1e]" aria-hidden="true" />
                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e46f1e]">
                  {hero.badge}
                </p>
              </div>
            )}

            <h1 className="mt-10 font-poppins text-[2.875rem] font-bold leading-[1.02] tracking-[-0.04em] text-slate-900 sm:text-5xl md:text-[3.5rem] lg:text-6xl xl:text-[4.25rem]">
              {hero.headline}{' '}
              {hero.headlineAccent && (
                <span className="hercules-gradient-text">{hero.headlineAccent}</span>
              )}
              {hero.headlineSuffix && (
                <span className="text-slate-900"> {hero.headlineSuffix}</span>
              )}
            </h1>

            {hero.subheadline && (
              <p className="mt-8 max-w-xl font-montserrat text-lg leading-[1.75] text-slate-500 md:text-xl">
                {hero.subheadline}
              </p>
            )}

            <div className="mt-12 flex flex-wrap items-center gap-4">
              {hero.primaryCta && (
                <HerculesButton
                  href={primaryHref}
                  variant="primary"
                  size="lg"
                  external={hero.primaryCta.external}
                >
                  {hero.primaryCta.label}
                </HerculesButton>
              )}
              {hero.secondaryCta && (
                <HerculesButton href={hero.secondaryCta.href} variant="secondary" size="lg">
                  {hero.secondaryCta.label}
                </HerculesButton>
              )}
            </div>

            <div className="mt-16 grid grid-cols-2 gap-5 border-t border-slate-200/60 pt-12 sm:grid-cols-4 sm:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  className="group"
                >
                  <IconBox icon={stat.icon} variant={stat.variant} size="sm" className="mb-4" />
                  <p className="font-poppins text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#e46f1e] md:text-[1.75rem]">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 font-montserrat text-[11px] font-medium leading-snug text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 md:flex">
        <span className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">
          Scroll
        </span>
        <div className="flex h-10 w-5 items-start justify-center rounded-full border border-slate-300/70 p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-slate-400"
          />
        </div>
      </div>
    </section>
  );
}
