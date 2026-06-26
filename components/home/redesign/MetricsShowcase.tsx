'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import AnimatedCounter from './AnimatedCounter';

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
    <section className="relative py-28 md:py-32 bg-white" aria-label="Key metrics">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 md:p-16 relative overflow-hidden shadow-[0_40px_100px_-40px_rgba(15,23,42,0.4)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.2),transparent_45%)]" />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
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
                  className="block text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-white tracking-tight"
                />
                <p className="mt-2 text-xs font-montserrat font-semibold uppercase tracking-[0.15em] text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
