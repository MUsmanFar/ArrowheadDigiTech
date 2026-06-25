'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';

const industryColors: Record<string, { border: string; bg: string; text: string; gradient: string }> = {
  Transportation: {
    border: 'border-orange-100',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    gradient: 'from-orange-500 to-amber-400',
  },
  Healthcare: {
    border: 'border-blue-100',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-400',
  },
  Travel: {
    border: 'border-emerald-100',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-400',
  },
  'E-commerce': {
    border: 'border-purple-100',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-400',
  },
  Automotive: {
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    gradient: 'from-slate-500 to-slate-400',
  },
};

function getIndustryColor(industry: string | null) {
  return industryColors[industry || ''] || {
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    gradient: 'from-slate-500 to-slate-400',
  };
}

const featuredVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
  },
};

export default function ProjectShowcase() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const mediaMap = useProjectMediaMap();

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/public/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.length > 0 ? data : []);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  const featured = projects.filter((p: any) => p.featured).slice(0, 3);
  const secondary = projects.filter((p: any) => !p.featured);

  return (
    <section className="py-20 md:py-28 bg-white relative z-10" aria-label="Project Showcase">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="max-w-xl mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
            Selected Projects
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 font-poppins tracking-tight">
            Featured work
          </h2>
        </motion.div>

        {featured.length === 0 && secondary.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-inter">
            No projects to display yet.
          </div>
        )}

        {featured.length > 0 && (
          <div className="space-y-16 md:space-y-24 mb-24">
            {featured.map((project: any, index: number) => {
              const colors = getIndustryColor(project.industry);
              const metricsList = project.metrics
                ? project.metrics.split(',').map((m: string) => m.trim())
                : [];
              const projectMedia = mediaMap.get(project.slug);
              const thumb = thumbnailFor(projectMedia) || project.thumbnail || null;

              return (
                <motion.div
                  key={project.slug}
                  variants={featuredVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <Link
                    href={`/case-studies/${project.slug}`}
                    className="group block"
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                        index % 2 === 1 ? 'lg:direction-rtl' : ''
                      }`}
                    >
                      <div
                        className={`lg:col-span-7 ${
                          index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                        }`}
                      >
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-xl">
                          {thumb ? (
                            <Image
                              src={thumb}
                              alt={project.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 60vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                            />
                          ) : (
                            <div
                              className={`w-full h-full bg-gradient-to-br ${colors.gradient} opacity-30`}
                            />
                          )}
                          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500" />
                          <span
                            className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border} backdrop-blur-sm`}
                          >
                            {project.industry || 'Project'}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`lg:col-span-5 ${
                          index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                        }`}
                      >
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 font-poppins tracking-tight">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-slate-500 font-inter leading-relaxed text-sm md:text-base">
                          {project.description}
                        </p>

                        {metricsList.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {metricsList.map((metric: string, i: number) => (
                              <span
                                key={i}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}
                              >
                                <TrendingUp size={12} />
                                {metric}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-600 group/link">
                          <span>View Case Study</span>
                          <ArrowUpRight
                            size={15}
                            className="transition-transform duration-300 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {secondary.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
              className="max-w-xl mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-poppins tracking-tight">
                More projects
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondary.map((project: any, index: number) => {
                const colors = getIndustryColor(project.industry);
                const metricsList = project.metrics
                  ? project.metrics.split(',').map((m: string) => m.trim())
                  : [];
                const projectMedia = mediaMap.get(project.slug);
                const thumb = thumbnailFor(projectMedia) || project.thumbnail || null;

                return (
                  <motion.div
                    key={project.slug}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/case-studies/${project.slug}`}
                      className="group block h-full"
                    >
                      <div className="h-full rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-slate-200">
                        <div className="relative aspect-[16/9] bg-slate-50 overflow-hidden">
                          {thumb ? (
                            <Image
                              src={thumb}
                              alt={project.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div
                              className={`w-full h-full bg-gradient-to-br ${colors.gradient} opacity-20`}
                            />
                          )}
                        </div>

                        <div className="p-5">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border} mb-3`}
                          >
                            {project.industry || 'Project'}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 font-poppins">
                            {project.title}
                          </h3>
                          {metricsList.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {metricsList.map((metric: string, i: number) => (
                                <span
                                  key={i}
                                  className={`text-xs font-medium ${colors.text}`}
                                >
                                  {metric}
                                  {i < metricsList.length - 1 ? ',' : ''}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
