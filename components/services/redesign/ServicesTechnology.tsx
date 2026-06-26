'use client';

import React from 'react';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import { SectionHeading } from '@/components/design-system';

export default function ServicesTechnology() {
  const { studies } = useCaseStudies();
  const { section: labels } = useSiteSection('about.section-labels');
  const technologies = [...new Set(studies.flatMap((s) => s.technologies))].sort();

  if (technologies.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-slate-900 text-white" aria-label="Technology stack">
      <div className="container-premium">
        <SectionHeading
          badge={labels.technologiesTitle}
          title={labels.technologiesSubtitle}
          align="center"
          badgeVariant="neutral"
          className="mx-auto mb-12 [&_h2]:text-white"
        />
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-montserrat text-slate-200 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
