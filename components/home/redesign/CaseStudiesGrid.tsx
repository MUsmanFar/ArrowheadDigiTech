'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

export default function CaseStudiesGrid() {
  const { studies, loading } = useCaseStudies();
  const { section: hero } = useSiteSection('case-studies.hero');
  const { section: copy } = useSiteSection('home.featured-work');
  const mediaMap = useProjectMediaMap();

  if (loading || studies.length === 0) return null;

  const grid = studies.slice(0, 4);

  return (
    <SectionBackdrop theme="light-mesh" topFade className="py-28 md:py-40">
      <section aria-label="Case studies">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center md:mb-20"
          >
            <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
              {hero.badge}
            </p>
            <h2 className="text-4xl font-bold font-poppins leading-[1.04] tracking-tight text-[#111827] md:text-5xl lg:text-6xl">
              {hero.headline}
            </h2>
            {hero.subheadline && (
              <p className="mt-5 text-lg font-montserrat leading-relaxed text-slate-500">{hero.subheadline}</p>
            )}
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {grid.map((study, i) => {
              const media = mediaMap.get(study.slug);
              const img = thumbnailFor(media) || study.thumbnail;
              const metric = study.metrics[0];
              return (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                >
                  <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                    <div className="figma-glass-light relative h-full overflow-hidden rounded-[2rem] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_90px_-36px_rgba(17,24,39,0.2)]">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {img ? (
                          <SafeImage
                            src={img}
                            alt={study.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2B6EF2]/15 to-[#111827]/10" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-[#111827]/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                          <span className="text-[10px] font-montserrat font-semibold uppercase tracking-widest text-white/70">
                            {study.industry}
                          </span>
                          <h3 className="mt-2 text-2xl font-bold font-poppins text-white md:text-3xl">{study.title}</h3>
                          {metric && (
                            <p className="mt-3 text-sm font-montserrat text-white/80">
                              <span className="font-bold text-[#E46F1E]">{metric.value}</span>{' '}
                              {metric.label}
                            </p>
                          )}
                          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-white/90 transition-colors group-hover:text-[#E46F1E]">
                            {copy.viewCaseStudyLabel}
                            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#111827] px-8 py-4 text-sm font-semibold font-montserrat text-white transition-colors hover:bg-[#1f2937]"
            >
              {copy.viewAllLabel}
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
