'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Target, BarChart3, Monitor, Calendar } from 'lucide-react';
import { getSchedulingUrl } from '@/lib/scheduling';
import type { CaseStudy } from '@/lib/case-studies';
import { caseStudies } from '@/lib/case-studies';
import { useProjectMediaMap, heroImageFor, galleryImagesFor } from '@/lib/use-project-media';

export default function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const mediaMap = useProjectMediaMap();
  const currentIndex = caseStudies.findIndex((s) => s.slug === study.slug);
  const prev = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const next = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;
  const related = caseStudies.filter((s) => s.industry === study.industry && s.slug !== study.slug).slice(0, 2);

  const projectMedia = mediaMap.get(study.slug);
  const heroImg = heroImageFor(projectMedia) || study.thumbnail;
  const galleryImages = galleryImagesFor(projectMedia).length > 0 ? galleryImagesFor(projectMedia) : study.images;

  return (
    <main id="main-content" className="bg-white">
      {/* Hero */}
      <section className="relative px-6 pb-14 pt-36 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 subtle-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-50/40 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl relative z-10">
          <Link
            href="/case-studies"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors font-inter"
          >
            <ArrowLeft size={16} /> All case studies
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-100">
                  {study.industry}
                </span>
                <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100">
                  {study.projectType}
                </span>
              </div>
              <h1 className="font-poppins text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                {study.title}
              </h1>
              <p className="mt-2 text-lg font-inter text-slate-400">
                {study.client}
              </p>
              <p className="mt-6 max-w-xl font-inter text-lg leading-relaxed text-slate-500">
                {study.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {study.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex flex-wrap gap-8 justify-end">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="text-right">
                  <strong className="block font-poppins text-4xl font-bold text-slate-900">
                    {metric.value}
                  </strong>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {heroImg && (
        <section className="px-6 pb-20 lg:px-8">
          <div className="relative mx-auto aspect-[16/9] max-w-7xl overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={heroImg}
              alt={`${study.title} project`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* Metrics Bar (mobile) */}
      <section className="border-y border-slate-100 px-6 py-8 lg:hidden">
        <div className="mx-auto flex max-w-4xl flex-wrap gap-8">
          {study.metrics.map((metric) => (
            <div key={metric.label}>
              <strong className="font-poppins text-3xl text-slate-900">
                {metric.value}
              </strong>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Client Challenge */}
      <section className="px-6 py-20 lg:py-28 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
            <Target size={12} /> The Challenge
          </span>
          <h2 className="mt-6 font-poppins text-3xl font-bold text-slate-900 md:text-4xl tracking-tight">
            {study.context}
          </h2>
          <p className="mt-6 font-inter text-lg leading-8 text-slate-600">
            {study.challenge}
          </p>

          {study.painPoints.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {study.painPoints.map((point, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="text-xs font-bold text-slate-400 font-inter">
                    Pain point {i + 1}
                  </span>
                  <p className="mt-2 text-sm font-inter text-slate-600 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 py-20 lg:py-28 lg:px-8 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-blue-600 bg-blue-50 border border-blue-100/60">
            <Lightbulb size={12} /> Our Approach
          </span>
          <h2 className="mt-6 font-poppins text-3xl font-bold text-slate-900 md:text-4xl tracking-tight">
            Decisions that moved the work forward.
          </h2>
          <div className="mt-10 grid gap-5">
            {study.approach.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl bg-white border border-slate-100"
              >
                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold font-poppins">
                  {i + 1}
                </span>
                <p className="font-inter leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      {galleryImages.length > 0 && (
        <section className="px-6 py-20 lg:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-purple-600 bg-purple-50 border border-purple-100/60">
              <Monitor size={12} /> Screenshots
            </span>
            <h2 className="mt-6 font-poppins text-3xl font-bold text-slate-900 md:text-4xl tracking-tight max-w-2xl">
              A look at the final product.
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 border border-slate-100"
                >
                  <Image
                    src={img}
                    alt={`${study.title} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Outcomes */}
      <section className="px-6 py-20 lg:py-28 lg:px-8 bg-orange-50/50 border-y border-orange-100">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-emerald-600 bg-emerald-50 border border-emerald-100/60">
            <BarChart3 size={12} /> The Outcome
          </span>
          <h2 className="mt-6 font-poppins text-3xl font-bold text-slate-900 md:text-4xl tracking-tight">
            Measurable results.
          </h2>
          <p className="mt-6 font-inter text-lg leading-8 text-slate-600">
            {study.outcome}
          </p>

          {study.keyResults.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {study.keyResults.map((result, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white border border-orange-100 text-center"
                >
                  <CheckCircle className="mx-auto text-emerald-500" size={20} />
                  <p className="mt-3 text-sm font-inter text-slate-700 leading-relaxed">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Summary */}
      <section className="px-6 py-20 lg:py-28 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
            Impact Summary
          </span>
          <h2 className="mt-6 font-poppins text-3xl font-bold text-slate-900 md:text-4xl tracking-tight">
            Project Outcome
          </h2>
          <p className="mt-6 font-inter text-lg leading-8 text-slate-600">
            {study.outcome}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-inter">Key Results</h3>
              <ul className="mt-4 space-y-3">
                {study.keyResults.slice(0, 3).map((result, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm font-inter text-slate-700">
                    <CheckCircle size={14} className="mt-0.5 text-emerald-500 flex-shrink-0" />
                    {result}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-inter">Client Impact</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-2.5 text-sm font-inter text-slate-700">
                  <CheckCircle size={14} className="mt-0.5 text-emerald-500 flex-shrink-0" />
                  {study.metrics.map(m => `${m.value} ${m.label}`).join(' — ')}
                </li>
                <li className="flex items-start gap-2.5 text-sm font-inter text-slate-700">
                  <CheckCircle size={14} className="mt-0.5 text-emerald-500 flex-shrink-0" />
                  {study.industry} industry — {study.projectType}
                </li>
                <li className="flex items-start gap-2.5 text-sm font-inter text-slate-700">
                  <CheckCircle size={14} className="mt-0.5 text-emerald-500 flex-shrink-0" />
                  {study.client}
                </li>
              </ul>
            </div>
            {study.testimonial ? (
              <div className="p-5 rounded-xl bg-orange-50 border border-orange-100 flex flex-col">
                <h3 className="text-xs font-bold uppercase tracking-widest text-orange-500 font-inter">Client Quote</h3>
                <blockquote className="mt-3 font-inter text-sm leading-relaxed text-slate-700 flex-1">
                  &ldquo;{study.testimonial.content}&rdquo;
                </blockquote>
                <div className="mt-3 pt-3 border-t border-orange-200/60 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold font-poppins text-[10px] flex-shrink-0">
                    {study.testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic text-xs font-semibold text-slate-900 font-poppins block">
                      {study.testimonial.name}
                    </cite>
                    <span className="text-[10px] text-slate-400 font-inter">{study.testimonial.role}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-orange-50 border border-orange-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-orange-500 font-inter">Technologies</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.technologies.slice(0, 5).map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-700 bg-white border border-orange-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technology Stack Recap */}
      <section className="px-6 py-20 lg:py-28 lg:px-8 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-slate-600 bg-slate-50 border border-slate-100/60">
            Technology Stack
          </span>
          <h2 className="mt-6 font-poppins text-3xl font-bold text-slate-900 md:text-4xl tracking-tight">
            Built with modern tools.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {study.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="px-6 py-20 lg:py-28 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
              className="max-w-2xl mb-10"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                Related Work
              </span>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 font-poppins tracking-tight">
                More {study.industry.toLowerCase()} projects.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {related.map((project, i) => {
                const relatedMedia = mediaMap.get(project.slug);
                const relatedThumb = heroImageFor(relatedMedia) || project.thumbnail;
                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={`/case-studies/${project.slug}`}
                      className="group flex items-center gap-5 p-5 rounded-xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        {relatedThumb ? (
                          <Image
                            src={relatedThumb}
                            alt={project.title}
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-slate-100" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          {project.client}
                        </p>
                        <h3 className="text-base font-bold text-slate-900 font-poppins mt-0.5 truncate">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-inter mt-1 line-clamp-1">
                          {project.summary}
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-slate-300 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <section className="border-t border-slate-100 px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div>
            {prev ? (
              <Link
                href={`/case-studies/${prev.slug}`}
                className="group inline-flex items-center gap-2 text-sm font-inter text-slate-400 hover:text-orange-600 transition-colors"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Previous</p>
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-orange-600 transition-colors mt-0.5">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div>
            {next ? (
              <Link
                href={`/case-studies/${next.slug}`}
                className="group inline-flex items-center gap-2 text-sm font-inter text-slate-400 hover:text-orange-600 transition-colors"
              >
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Next</p>
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-orange-600 transition-colors mt-0.5">
                    {next.title}
                  </p>
                </div>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:py-28 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-inter text-lg text-slate-500 leading-relaxed">
            Want to see how we can solve a similar challenge for your business?
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-orange-500 text-white text-sm font-semibold transition-all duration-300 ease-out hover:bg-orange-600 hover:shadow-[0_12px_30px_-8px_rgba(249,115,22,0.5)] hover:-translate-y-0.5"
            >
              Start a Conversation
            </Link>
            <a
              href={getSchedulingUrl(`case-study-${study.slug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-transparent text-slate-800 text-sm font-semibold border border-slate-200 transition-all duration-300 ease-out hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5"
            >
              <Calendar size={16} />
              Book a Discovery Call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
