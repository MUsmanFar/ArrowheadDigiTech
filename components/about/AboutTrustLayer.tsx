'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useProjects } from '@/lib/use-projects';
import { useTestimonials } from '@/lib/use-testimonials';
import { useCaseStudies } from '@/lib/use-case-studies';

export default function AboutTrustLayer() {
  const { projects } = useProjects();
  const { testimonials } = useTestimonials();
  const { studies } = useCaseStudies();

  const caseStudyProjects = projects.filter((p) => p.caseStudy);
  const industries = [...new Set(caseStudyProjects.map((p) => p.industry).filter(Boolean))];
  const allTechnologies = [...new Set(studies.flatMap((s) => s.technologies))].sort();
  const featuredTestimonials = testimonials.filter((t) => t.featured).slice(0, 3);
  const displayTestimonials = featuredTestimonials.length > 0 ? featuredTestimonials : testimonials.slice(0, 3);

  return (
    <>
      <section className="py-16 px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: caseStudyProjects.length.toString(), label: 'Projects Delivered' },
              { value: industries.length.toString(), label: 'Industries Served' },
              { value: caseStudyProjects.length.toString(), label: 'Case Studies' },
              { value: displayTestimonials.length.toString(), label: 'Client Testimonials' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-orange-500 font-poppins tracking-tighter mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs font-inter">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {allTechnologies.length > 0 && (
        <section className="py-16 px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                Technologies
              </span>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900 font-poppins tracking-tight">
                What we work with.
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {allTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {displayTestimonials.length > 0 && (
        <section className="py-16 px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                Testimonials
              </span>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900 font-poppins tracking-tight">
                What clients say.
              </h2>
            </motion.div>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {displayTestimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative p-6 rounded-xl bg-slate-50 border border-slate-100 flex flex-col"
                >
                  <Quote className="text-orange-200 mb-3" size={22} />
                  <blockquote className="font-inter text-sm leading-relaxed text-slate-700 flex-1">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold font-poppins text-xs flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <cite className="not-italic text-xs font-semibold text-slate-900 font-poppins block truncate">
                        {testimonial.name}
                      </cite>
                      <span className="text-[10px] text-slate-400 font-inter">
                        {testimonial.role || testimonial.company || ''}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
