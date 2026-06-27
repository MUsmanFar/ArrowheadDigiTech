'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import AnimatedCounter from './AnimatedCounter';
import SectionBackdrop from './shared/SectionBackdrop';

function MiniChart() {
  const points = [20, 35, 28, 45, 38, 55, 48, 72, 65, 88, 78, 95];
  const max = Math.max(...points);
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - (p / max) * 100;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(43,110,242,0.4)" />
          <stop offset="100%" stopColor="rgba(43,110,242,0)" />
        </linearGradient>
      </defs>
      <path d={`${path} L 100 100 L 0 100 Z`} fill="url(#chartGrad)" />
      <path d={path} fill="none" stroke="#2B6EF2" strokeWidth="1.5" />
    </svg>
  );
}

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
    <SectionBackdrop theme="dark" className="py-28 md:py-36">
      <section aria-label="Key metrics">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="figma-glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(228,111,30,0.18),transparent_45%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(43,110,242,0.15),transparent_40%)]" />

            <div className="relative mb-10 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={`${stat.label}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-2">
                    <AnimatedCounter
                      value={stat.value}
                      className="text-3xl font-bold font-poppins tracking-tight text-white md:text-4xl"
                    />
                    <TrendingUp className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-[10px] font-montserrat font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="relative grid gap-6 lg:grid-cols-3">
              <div className="figma-glass rounded-2xl p-6 lg:col-span-2">
                <p className="text-xs font-montserrat uppercase tracking-widest text-slate-400">Growth</p>
                <div className="mt-4 h-32">
                  <MiniChart />
                </div>
              </div>
              <div className="figma-glass rounded-2xl p-6">
                <p className="text-xs font-montserrat uppercase tracking-widest text-slate-400">Distribution</p>
                <div className="mt-6 space-y-3">
                  {[72, 58, 84].map((w, i) => (
                    <div key={i} className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#E46F1E] to-[#2B6EF2]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${w}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
