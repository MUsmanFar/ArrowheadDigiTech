'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useTestimonials } from '@/lib/use-testimonials';
import { useSiteSection } from '@/lib/use-site-content';

export default function FounderSection() {
  const [founder, setFounder] = useState<any>(null);
  const { studies } = useCaseStudies();
  const { testimonials } = useTestimonials();
  const { section: labels } = useSiteSection('about.section-labels');

  const industries = [...new Set(studies.map((s) => s.industry))];
  const allTechnologies = [...new Set(studies.flatMap((s) => s.technologies))].sort();
  const totalProjects = studies.length;

  useEffect(() => {
    fetch('/api/public/founders')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setFounder(data[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white relative z-10 border-b border-slate-100" aria-label="Founder">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
              className="sticky top-32"
            >
              <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden relative bg-slate-100 border border-slate-200 shadow-lg shadow-slate-200/30">
                {founder?.photo ? (
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                    <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-slate-500 font-poppins">
                        {founder ? founder.name.charAt(0) : 'A'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-600 font-poppins text-center">
                      {founder?.name || 'Arrowhead DigiTech'}
                    </p>
                    {founder?.position && (
                      <p className="text-xs text-slate-400 font-inter text-center mt-1">{founder.position}</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                {labels.founderBadge}
              </span>

              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-poppins tracking-tight">
                {founder?.name || 'Usman Farooqi'}
              </h2>
              <p className="mt-2 text-base md:text-lg text-orange-500 font-semibold font-inter">
                {founder?.position || 'Founder & CEO, Arrowhead DigiTech'}
              </p>
              <p className="mt-6 text-base leading-relaxed text-slate-600 font-inter">
                {founder?.biography || `I lead a team that has delivered ${totalProjects} digital platforms across ${industries.length} industries — from ride-sharing and healthcare recruitment to travel booking and automotive marketplaces. Every project we ship is built around the business outcome first, not the technology stack.`}
              </p>
            </motion.div>

            {/* Experience Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mt-12"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-inter mb-4">
                {labels.experienceTitle}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: labels.statProjectsDelivered, value: totalProjects.toString() },
                  { label: labels.statIndustriesServed, value: industries.length.toString() },
                  { label: labels.statClientTestimonials, value: testimonials.length.toString() },
                  { label: labels.statTechnologiesUsed, value: allTechnologies.length.toString() },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-2xl font-bold text-orange-500 font-poppins">{stat.value}</p>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-inter mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Core Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-10"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-inter mb-4">
                {labels.coreExpertiseTitle}
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Industries Served */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-inter mb-4">
                {labels.industriesServedTitle}
              </h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <span
                    key={industry}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-100"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Projects Delivered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-inter mb-4">
                {labels.projectsDeliveredTitle}
              </h3>
              <div className="flex flex-wrap gap-2">
                {studies.slice(0, 7).map((study) => (
                  <span
                    key={study.slug}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100"
                  >
                    {study.title}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
