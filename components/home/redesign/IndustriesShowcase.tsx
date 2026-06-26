'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';

const INDUSTRY_COLORS = [
  'from-orange-500 to-amber-400',
  'from-blue-500 to-cyan-400',
  'from-violet-500 to-purple-400',
  'from-emerald-500 to-teal-400',
  'from-rose-500 to-pink-400',
  'from-slate-600 to-slate-400',
];

export default function IndustriesShowcase() {
  const { projects } = useProjects();
  const { studies } = useCaseStudies();
  const { section: caseHero } = useSiteSection('case-studies.hero');

  const industries = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.industry && set.add(p.industry));
    studies.forEach((s) => s.industry && set.add(s.industry));
    return [...set].sort();
  }, [projects, studies]);

  if (industries.length === 0) return null;

  return (
    <section className="relative py-28 md:py-36 bg-[#fafafa]" aria-label="Industries">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-orange-500 mb-4">
            {caseHero.badge}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 tracking-tight max-w-xl">
            {caseHero.headline}
          </h2>
          <p className="mt-4 text-slate-500 font-montserrat max-w-lg">{caseHero.subheadline}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry, i) => (
            <motion.div
              key={industry}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative rounded-[1.5rem] bg-white border border-slate-100 p-8 shadow-[0_16px_50px_-24px_rgba(15,23,42,0.1)] hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.15)] transition-all duration-500 overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${INDUSTRY_COLORS[i % INDUSTRY_COLORS.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${INDUSTRY_COLORS[i % INDUSTRY_COLORS.length]} opacity-90 mb-5 flex items-center justify-center text-white font-bold font-poppins text-lg`}
              >
                {industry.charAt(0)}
              </div>
              <h3 className="text-xl font-bold font-poppins text-slate-900">{industry}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
