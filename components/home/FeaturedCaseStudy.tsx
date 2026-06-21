'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '@/lib/case-studies';

const allProjects = caseStudies.slice(0, 7);

const heroProject = allProjects[0];
const supportingProjects = allProjects.slice(1, 4);

export default function FeaturedCaseStudy() {
  return (
    <section className="py-28 md:py-36 bg-white" aria-label="Featured Case Studies">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins tracking-tight">
            Featured work.
          </h2>
          <p className="mt-3 text-lg text-slate-500 font-inter leading-relaxed">
            Real projects for real businesses. Every screenshot is a live
            application we built.
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          >
            <Link
              href={`/case-studies/${heroProject.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <Image
                  src={heroProject.thumbnail}
                  alt={heroProject.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                    {heroProject.industry}
                  </span>
                  <h3 className="mt-1 text-2xl md:text-3xl font-bold text-white font-poppins">
                    {heroProject.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/70 font-inter max-w-xl">
                    {heroProject.summary}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    {heroProject.metrics.slice(0, 2).map((m, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold text-white/80"
                      >
                        {m.value} {m.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {supportingProjects.map((study, i) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0, 1],
                }}
              >
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    {study.thumbnail ? (
                      <Image
                        src={study.thumbnail}
                        alt={study.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-100" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-[10px] font-medium text-white/70 uppercase tracking-wider">
                        {study.industry}
                      </span>
                      <h3 className="mt-0.5 text-base font-bold text-white font-poppins">
                        {study.title}
                      </h3>
                      <div className="mt-1.5 flex items-center gap-3">
                        {study.metrics.slice(0, 1).map((m, j) => (
                          <span
                            key={j}
                            className="text-[10px] font-semibold text-white/60"
                          >
                            {m.value} {m.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900 font-inter">
                        {study.client}
                      </p>
                      <p className="text-xs text-slate-400 font-inter">
                        {study.projectType}
                      </p>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-50 group-hover:border-orange-200">
                      <ArrowUpRight
                        size={12}
                        className="text-slate-400 transition-colors duration-300 group-hover:text-orange-500"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="mt-12 text-center"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5"
          >
            View All Projects
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
