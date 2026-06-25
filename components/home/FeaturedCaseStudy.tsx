'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useProjectMediaMap, thumbnailFor, heroImageFor } from '@/lib/use-project-media';

function IPhoneMockup({ src, alt }: { src: string | null; alt: string }) {
  return (
    <div className="relative mx-auto w-[260px] md:w-[280px] drop-shadow-2xl">
      <div className="relative rounded-[2.5rem] border-[3px] border-slate-700 bg-slate-800 p-2.5 shadow-2xl shadow-black/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-slate-800 rounded-b-[1.25rem] z-10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-slate-700" />
        </div>
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.25rem] bg-black">
          {src ? (
            <Image src={src} alt={alt} fill sizes="280px" className="object-cover" priority />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[110px] h-[4px] rounded-full bg-slate-700" />
      </div>
    </div>
  );
}

function BrowserMockup({ src, alt }: { src: string | null; alt: string }) {
  return (
    <div className="relative drop-shadow-xl">
      <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-slate-800 shadow-xl shadow-black/20">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800/80 border-b border-white/[0.06]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          <div className="ml-3 flex-1 max-w-[140px] mx-auto h-5 rounded-md bg-white/[0.06]" />
        </div>
        <div className="relative aspect-[4/3] bg-slate-900">
          {src ? (
            <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedCaseStudy() {
  const { studies, loading } = useCaseStudies();
  const mediaMap = useProjectMediaMap();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  if (loading || studies.length === 0) return null;

  const heroProject = studies[0];
  const supportingProjects = studies.slice(1, 4);
  const heroMedia = mediaMap.get(heroProject.slug);
  const heroImg = heroImageFor(heroMedia) || heroProject.thumbnail;

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 bg-slate-950 overflow-hidden" aria-label="Featured Case Studies">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/3 w-px h-1/3 bg-gradient-to-b from-orange-500/10 to-transparent" />
        <div className="absolute bottom-0 right-1/3 w-px h-1/3 bg-gradient-to-t from-orange-500/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins tracking-tight">
            Featured work.
          </h2>
          <p className="mt-3 text-lg text-slate-400 font-inter leading-relaxed">
            Real projects for real businesses. Every screenshot is a live
            application we built.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          >
            <Link href={`/case-studies/${heroProject.slug}`} className="group block">
              <div className="relative grid md:grid-cols-5 gap-6 md:gap-8 items-center rounded-2xl bg-gradient-to-br from-white/[0.03] via-white/[0.02] to-transparent border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_0_40px_-12px_rgba(249,115,22,0.15)]">
                <div className="md:col-span-3 relative">
                  <motion.div style={{ y: imageY }}>
                    <IPhoneMockup src={heroImg} alt={heroProject.title} />
                  </motion.div>
                </div>

                <div className="md:col-span-2 relative">
                  <div className="space-y-4">
                    <span className="inline-flex text-xs font-semibold tracking-[0.15em] uppercase text-orange-400/80 bg-orange-500/10 border border-orange-500/20 rounded-full px-3.5 py-1.5">
                      {heroProject.industry}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-poppins leading-tight">
                      {heroProject.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-inter leading-relaxed">
                      {heroProject.summary}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {heroProject.metrics.slice(0, 2).map((m, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-semibold text-slate-300">
                          <span className="text-orange-400">{m.value}</span>
                          {m.label}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                        View Case Study
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {supportingProjects.map((study, i) => {
              const studyMedia = mediaMap.get(study.slug);
              const img = thumbnailFor(studyMedia) || study.thumbnail;
              return (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
                >
                  <Link href={`/case-studies/${study.slug}`} className="group block">
                    <div className="relative rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.12)] hover:-translate-y-0.5">
                      <BrowserMockup src={img} alt={study.title} />
                      <div className="mt-4 flex items-center justify-between">
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500">
                            {study.industry}
                          </span>
                          <h3 className="text-base font-bold text-white font-poppins truncate mt-0.5">
                            {study.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-inter truncate mt-0.5">
                            {study.client}
                          </p>
                        </div>
                        <span className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-orange-500/10 group-hover:border-orange-500/20">
                          <ArrowUpRight size={12} className="text-slate-500 transition-all duration-500 group-hover:text-orange-400" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
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
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/[0.04] text-slate-300 font-semibold text-sm border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:-translate-y-0.5"
          >
            View All Projects
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
