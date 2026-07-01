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
import GlassCard from '../ui/GlassCard';

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
    <section className="relative min-h-[100svh] overflow-hidden hercules-ambient-noise bg-[#fafafa]" aria-label="Hero">
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" aria-hidden="true" />
      
      {/* Massive premium gradients */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-orange-200/40 via-blue-100/20 to-transparent blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-64 top-[20%] h-[800px] w-[800px] rounded-full bg-orange-100/30 blur-[150px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-64 top-[40%] h-[800px] w-[800px] rounded-full bg-blue-100/20 blur-[150px]" aria-hidden="true" />

      <div className="container-premium relative z-10 flex min-h-[100svh] flex-col justify-center pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-4xl"
          >
            {hero.badge && (
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-orange-200/50 bg-white/70 px-5 py-2.5 shadow-[0_8px_30px_-12px_rgba(228,111,30,0.25)] backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e46f1e] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e46f1e]"></span>
                </span>
                <p className="font-inter text-[11px] font-bold uppercase tracking-[0.25em] text-slate-800">
                  {hero.badge}
                </p>
              </div>
            )}

            <h1 className="font-inter text-[3.25rem] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]">
              {hero.headline}{' '}
              {hero.headlineAccent && (
                <span className="hercules-gradient-text block mt-2 lg:inline lg:mt-0">{hero.headlineAccent}</span>
              )}
              {hero.headlineSuffix && (
                <span className="text-slate-900 block mt-2 lg:inline lg:mt-0"> {hero.headlineSuffix}</span>
              )}
            </h1>

            {hero.subheadline && (
              <p className="mt-8 max-w-2xl font-inter text-lg leading-[1.8] text-slate-500 md:text-xl lg:text-2xl lg:leading-[1.7]">
                {hero.subheadline}
              </p>
            )}

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-5">
              {hero.primaryCta && (
                <HerculesButton
                  href={primaryHref}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto px-10 py-4 text-base"
                  external={hero.primaryCta.external}
                >
                  {hero.primaryCta.label}
                </HerculesButton>
              )}
              {hero.secondaryCta && (
                <HerculesButton 
                  href={hero.secondaryCta.href} 
                  variant="secondary" 
                  size="lg"
                  className="w-full sm:w-auto px-10 py-4 text-base bg-white/50 backdrop-blur-md border-slate-200/60 shadow-[0_12px_30px_-15px_rgba(15,23,42,0.1)]"
                >
                  {hero.secondaryCta.label}
                </HerculesButton>
              )}
            </div>
          </motion.div>

          <div className="mt-24 w-full max-w-6xl relative">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] z-0 opacity-40 md:opacity-100 mix-blend-multiply md:mix-blend-normal"
            >
              <HeroVisual />
            </motion.div>
            
            <GlassCard padding="lg" className="relative z-10 mx-auto mt-32 md:mt-64 max-w-5xl bg-white/60 backdrop-blur-2xl border-white/80 shadow-[0_40px_100px_-30px_rgba(15,23,42,0.1)]">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6 divide-x divide-slate-200/50">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    className="group flex flex-col items-center text-center px-4"
                  >
                    <IconBox icon={stat.icon} variant={stat.variant} size="sm" className="mb-5 shadow-sm" />
                    <p className="font-inter text-3xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-[#e46f1e] md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 font-inter text-[12px] font-semibold uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
