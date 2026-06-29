'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useProjectMediaMap, heroImageFor, thumbnailFor } from '@/lib/use-project-media';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

export default function PortfolioMagazine() {
  const { studies, loading } = useCaseStudies();
  const { section: copy } = useSiteSection('home.featured-work');
  const { section: caseIntro } = useSiteSection('case-studies.hero');
  const mediaMap = useProjectMediaMap();

  if (loading || studies.length === 0) return null;

  const featured = studies.slice(0, 4);

  return (
    <SectionBackdrop theme="dark" bottomFade className="py-28 md:py-40">
      <section aria-label="Featured work">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 md:mb-16"
          >
            <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
              {caseIntro.badge}
            </p>
            <h2 className="text-4xl font-bold font-poppins leading-[1.04] tracking-tight text-white md:text-5xl lg:text-6xl">
              {copy.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-montserrat leading-relaxed text-slate-400">
              {copy.description}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {featured.map((study, i) => {
              const media = mediaMap.get(study.slug);
              const img = heroImageFor(media) || thumbnailFor(media) || study.thumbnail;
              return (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                >
                  <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                    <div className="figma-glass relative h-full overflow-hidden rounded-[2rem] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)]">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {img ? (
                          <SafeImage
                            src={img}
                            alt={study.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={i < 2}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2B6EF2]/20 to-[#111827]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/95 via-[#070b14]/30 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                          <span className="text-[10px] font-montserrat font-semibold uppercase tracking-widest text-slate-400">
                            {study.industry}
                          </span>
                          <h3 className="mt-2 text-2xl font-bold font-poppins text-white md:text-3xl">
                            {study.title}
                          </h3>
                          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-[#E46F1E] transition-colors group-hover:text-[#f59e42]">
                            {copy.viewCaseStudyLabel}
                            <ArrowUpRight
                              size={16}
                              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
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
            className="mt-12 text-center"
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-slate-400 transition-colors hover:text-[#E46F1E]"
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
