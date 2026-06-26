'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';

export default function MetricsBar() {
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

    const rows = [
      { value: String(projectCount), label: labels.projectsLabel },
      { value: String(industries.size), label: labels.industriesLabel },
      ...highlightMetrics.map((m) => ({ value: m.value, label: m.label })),
    ];

    return rows.length > 0 ? rows : [];
  }, [projects, studies, labels.projectsLabel, labels.industriesLabel]);

  if (stats.length === 0) return null;

  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden" aria-label="Key Metrics">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
              className="relative group"
            >
              <div className="relative rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl p-6 md:p-8 text-center transition-all duration-500 hover:bg-white/[0.07] hover:border-white/[0.1] hover:shadow-[0_8px_32px_-8px_rgba(249,115,22,0.15)]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

                <div className="relative">
                  <div className="text-4xl md:text-5xl font-black font-poppins tracking-tighter mb-2 bg-gradient-to-b from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 font-bold uppercase tracking-[0.15em] text-[10px] md:text-xs font-inter">
                    {stat.label}
                  </div>
                </div>

                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
