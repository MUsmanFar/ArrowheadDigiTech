'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useProjects } from '@/lib/use-projects';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';

const CARD_GRADIENTS = [
  'from-blue-600 to-indigo-900',
  'from-emerald-600 to-teal-900',
  'from-purple-600 to-pink-900',
  'from-orange-500 to-red-900',
];

export default function HorizontalScrollGallery() {
  const { projects: allProjects, loading } = useProjects();
  const projects = allProjects.filter((p) => p.featured).slice(0, 4);
  const mediaMap = useProjectMediaMap();
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  if (loading) {
    return (
      <section className="py-32 bg-slate-950 flex justify-center">
        <div className="w-10 h-10 border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-slate-950" aria-label="Interactive Project Gallery">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-12 left-6 lg:left-12 z-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-montserrat tracking-tight">
            Selected Works
          </h2>
          <p className="text-slate-400 font-poppins mt-2">Scroll to explore our engineering impact.</p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 lg:px-12 pt-24 h-[70vh] min-h-[500px]">
          {projects.map((project, index) => {
            const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
            const metricsList = project.metrics
              ? String(project.metrics).split(',').map((m: string) => m.trim())
              : [];
            const projectMedia = mediaMap.get(project.slug);
            const thumb = thumbnailFor(projectMedia) || project.thumbnail || null;

            return (
              <div
                key={project.slug || index}
                className="w-[85vw] md:w-[60vw] lg:w-[50vw] h-full flex-shrink-0 relative rounded-3xl overflow-hidden group cursor-pointer"
              >
                {thumb ? (
                  <Image
                    src={thumb}
                    alt={project.title}
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={14} className="text-orange-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-400 font-poppins">
                      {project.industry || 'Case Study'}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 font-poppins text-sm md:text-base max-w-lg mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  {metricsList.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      {metricsList.map((metric, i) => (
                        <span
                          key={i}
                          className="text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/case-studies/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-orange-300 transition-colors font-poppins"
                  >
                    View Case Study <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
