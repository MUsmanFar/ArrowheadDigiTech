'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/lib/use-projects';
import { useTestimonials } from '@/lib/use-testimonials';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import { SectionHeading, StatCard } from '@/components/design-system';

export default function AboutAchievements() {
  const { projects } = useProjects();
  const { testimonials } = useTestimonials();
  const { studies } = useCaseStudies();
  const { section: labels } = useSiteSection('about.section-labels');

  const caseStudyProjects = projects.filter((p) => p.caseStudy);
  const industries = [...new Set(caseStudyProjects.map((p) => p.industry).filter(Boolean))];
  const featuredTestimonials = testimonials.filter((t) => t.featured);
  const displayCount =
    featuredTestimonials.length > 0 ? featuredTestimonials.length : testimonials.length;

  const stats = [
    { value: caseStudyProjects.length, label: labels.statProjectsDelivered },
    { value: industries.length, label: labels.statIndustriesServed },
    { value: studies.length, label: labels.statCaseStudies },
    { value: displayCount, label: labels.statClientTestimonials },
  ];

  return (
    <section className="py-20 md:py-24 bg-white border-y border-slate-100" aria-label="Achievements">
      <div className="container-premium">
        <SectionHeading
          badge="Impact"
          title="Measurable outcomes across industries"
          align="center"
          className="mx-auto mb-12"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <StatCard value={stat.value} label={stat.label} animate />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
