'use client';

import { useMemo } from 'react';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';

export default function HeroTrustStrip() {
  const { projects } = useProjects();
  const { studies } = useCaseStudies();
  const { section: labels } = useSiteSection('home.metrics-labels');

  const stats = useMemo(() => {
    const projectCount = projects.length || studies.length;
    const industries = new Set(
      [...projects.map((p) => p.industry), ...studies.map((s) => s.industry)].filter(Boolean),
    );
    return [
      { value: projectCount, label: labels.projectsLabel },
      { value: industries.size, label: labels.industriesLabel },
    ];
  }, [projects, studies, labels.projectsLabel, labels.industriesLabel]);

  if (!stats.some((s) => s.value > 0)) return null;

  return (
    <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/[0.08] pt-8">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="font-poppins text-2xl font-bold tracking-tight text-white md:text-3xl">
            {stat.value}+
          </p>
          <p className="mt-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
