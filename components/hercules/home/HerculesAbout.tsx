'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import HerculesButton from '../ui/HerculesButton';
import GlassCard from '../ui/GlassCard';
import SectionHeader from '../ui/SectionHeader';
import AboutVisual from '../ui/AboutVisual';
import Reveal from '../ui/Reveal';

export default function HerculesAbout() {
  const { section: hero } = useSiteSection('about.hero');
  const { section: manifesto } = useSiteSection('about.manifesto');
  const { section: labels } = useSiteSection('home.metrics-labels');
  const { section: aboutLabels } = useSiteSection('about.section-labels');
  const { projects } = useProjects();
  const { studies } = useCaseStudies();

  const metrics = useMemo(() => {
    const projectCount = projects.length || studies.length || 0;
    const industries = new Set(
      [...projects.map((p) => p.industry), ...studies.map((s) => s.industry)].filter(Boolean),
    );
    return [
      { value: `${Math.max(projectCount, 1)}+`, label: labels.projectsLabel },
      { value: `${Math.max(industries.size, 1)}+`, label: aboutLabels.statIndustriesServed },
    ];
  }, [projects, studies, labels.projectsLabel, aboutLabels.statIndustriesServed]);

  const principles = manifesto.items.slice(0, 4).map((item) => item.title);

  return (
    <section className="hercules-section hercules-section-muted relative overflow-hidden" aria-label="About">
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-100/20 blur-[100px]" aria-hidden="true" />

      <div className="container-premium relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <Reveal className="lg:col-span-4">
            <AboutVisual />
          </Reveal>

          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Who We Are"
              title={hero.headline}
              description={hero.subheadline}
            />
            {manifesto.items[0] && (
              <p className="mt-8 font-montserrat text-base leading-[1.8] text-slate-500 md:text-lg">
                {manifesto.items[0].content}
              </p>
            )}
            <ul className="mt-8 space-y-4">
              {principles.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#e46f1e]">
                    <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="font-montserrat text-sm text-slate-600 md:text-base">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <HerculesButton href="/about" variant="secondary">
                Learn about our story
              </HerculesButton>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <GlassCard hover padding="lg" className={i === 1 ? 'lg:translate-x-4' : ''}>
                  <p className="font-poppins text-4xl font-bold tracking-tight text-slate-900">{m.value}</p>
                  <p className="mt-2 font-montserrat text-sm font-medium text-slate-500">{m.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
