'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';

export default function TechStackGrid() {
  const { studies } = useCaseStudies();
  const { section: labels } = useSiteSection('about.section-labels');

  const technologies = useMemo(() => {
    const set = new Set<string>();
    studies.forEach((s) => s.technologies.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [studies]);

  if (technologies.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 bg-slate-900 overflow-hidden" aria-label="Technology stack">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.08),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-orange-400 mb-4">
            {labels.technologiesTitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white tracking-tight">
            {labels.technologiesSubtitle}
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-montserrat font-medium text-slate-300 hover:bg-white/10 hover:border-orange-500/30 hover:text-white transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
