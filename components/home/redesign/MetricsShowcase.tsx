'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import AnimatedCounter from './AnimatedCounter';
import SectionBackdrop from './shared/SectionBackdrop';

export default function MetricsShowcase() {
  const { projects } = useProjects();
  const { studies } = useCaseStudies();
  const { section: labels } = useSiteSection('home.metrics-labels');

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

  if (stats.length === 0) return null;

  return (
    <SectionBackdrop variant="dark" className="py-28 md:py-36">
      <section aria-label="Key metrics">
        <div className="container-premium">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 home-glass-dark p-10 md:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(228,111,30,0.22),transparent_45%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(43,110,242,0.18),transparent_40%)]" />
            <div className="relative grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={`${stat.label}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <AnimatedCounter
                    value={stat.value}
                    className="block text-4xl font-bold font-poppins tracking-tight text-white md:text-5xl lg:text-6xl"
                  />
                  <p className="mt-3 text-xs font-montserrat font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
