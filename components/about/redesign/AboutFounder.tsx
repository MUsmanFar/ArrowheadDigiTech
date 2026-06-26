'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useTestimonials } from '@/lib/use-testimonials';
import { useSiteSection } from '@/lib/use-site-content';
import { SectionHeading, GlassCard, ImageFrame } from '@/components/design-system';
import { Quote } from 'lucide-react';

export default function AboutFounder() {
  const [founder, setFounder] = useState<{
    name: string;
    position?: string;
    biography?: string;
    photo?: string;
  } | null>(null);
  const { studies } = useCaseStudies();
  const { testimonials } = useTestimonials();
  const { section: labels } = useSiteSection('about.section-labels');

  const industries = [...new Set(studies.map((s) => s.industry))];
  const allTechnologies = [...new Set(studies.flatMap((s) => s.technologies))].sort();

  useEffect(() => {
    fetch('/api/public/founders')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setFounder(data[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-shell bg-white" aria-label="Founder">
      <div className="container-premium">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <ImageFrame
              src={founder?.photo}
              alt={founder?.name || 'Founder'}
              aspect="portrait"
              priority
              overlay
              fallback={
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50/30 p-8">
                  <span className="text-5xl font-bold text-slate-400 font-poppins">
                    {(founder?.name || 'A').charAt(0)}
                  </span>
                </div>
              }
            />
          </motion.div>

          <div className="lg:col-span-7 space-y-10">
            <SectionHeading
              badge={labels.founderBadge}
              title={founder?.name || 'Founder'}
              description={
                founder?.biography ||
                `I lead a team that has delivered ${studies.length} digital platforms across ${industries.length} industries — built around business outcomes first.`
              }
            />

            <p className="text-orange-600 font-montserrat font-semibold">
              {founder?.position || 'Founder & CEO'}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { value: studies.length, label: labels.statProjectsDelivered },
                { value: industries.length, label: labels.statIndustriesServed },
                { value: testimonials.length, label: labels.statClientTestimonials },
                { value: allTechnologies.length, label: labels.statTechnologiesUsed },
              ].map((stat) => (
                <GlassCard key={stat.label} className="p-6">
                  <p className="text-3xl font-bold font-poppins text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-xs font-montserrat uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </p>
                </GlassCard>
              ))}
            </div>

            {allTechnologies.length > 0 && (
              <div>
                <h3 className="text-sm font-montserrat font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
                  {labels.coreExpertiseTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-page-surface px-3 py-1.5 text-xs font-medium text-slate-600 font-montserrat"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutTrustQuotes() {
  const { testimonials } = useTestimonials();
  const { section: labels } = useSiteSection('about.section-labels');
  const featured = testimonials.filter((t) => t.featured).slice(0, 3);
  const display = featured.length > 0 ? featured : testimonials.slice(0, 3);

  if (display.length === 0) return null;

  return (
    <section className="section-shell bg-page-surface" aria-label="Client trust">
      <div className="container-premium">
        <SectionHeading
          badge={labels.testimonialsTitle}
          title={labels.testimonialsSubtitle}
          className="mb-12"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {display.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard className="h-full p-8 flex flex-col">
                <Quote className="text-orange-300 mb-4" size={22} aria-hidden="true" />
                <blockquote className="flex-1 text-sm text-slate-600 font-montserrat leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <cite className="not-italic text-sm font-semibold font-poppins text-slate-900">
                    {t.name}
                  </cite>
                  <p className="text-xs text-slate-400 font-montserrat mt-1">
                    {t.role || t.company}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
