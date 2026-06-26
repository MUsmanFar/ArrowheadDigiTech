'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

const ACCENTS = [
  'from-[#E46F1E] to-[#f59e42]',
  'from-[#2B6EF2] to-[#60a5fa]',
  'from-[#111827] to-[#374151]',
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
    <SectionBackdrop variant="silver" className="py-28 md:py-36">
      <section aria-label="Industries">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 max-w-xl"
          >
            <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
              {caseHero.badge}
            </p>
            <h2 className="text-4xl font-bold font-poppins tracking-tight text-[#111827] md:text-5xl">
              {caseHero.headline}
            </h2>
            <p className="mt-4 font-montserrat text-slate-500">{caseHero.subheadline}</p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="home-glass group overflow-hidden rounded-[1.75rem] p-8 transition-all duration-500 hover:-translate-y-1"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} text-lg font-bold font-poppins text-white shadow-lg`}
                >
                  {industry.charAt(0)}
                </div>
                <h3 className="text-xl font-bold font-poppins text-[#111827]">{industry}</h3>
                <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-[#E46F1E] to-[#2B6EF2] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
