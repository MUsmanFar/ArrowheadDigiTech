'use client';

import React from 'react';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import { SectionHeading } from '@/components/design-system';

export default function ServicesIndustries() {
  const { studies } = useCaseStudies();
  const { section: caseHero } = useSiteSection('case-studies.hero');
  const industries = [...new Set(studies.map((s) => s.industry).filter(Boolean))];

  if (industries.length === 0) return null;

  return (
    <section className="hercules-section-muted py-20 md:py-28" aria-label="Industries served">
      <div className="container-premium">
        <SectionHeading
          badge={caseHero.badge}
          title={caseHero.headline}
          description={caseHero.subheadline}
          align="center"
          className="mx-auto mb-12"
        />
        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-slate-200/80 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 font-montserrat shadow-sm"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
