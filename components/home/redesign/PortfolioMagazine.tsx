'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Smartphone } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useProjectMediaMap, thumbnailFor, heroImageFor } from '@/lib/use-project-media';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

function DeviceFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[1rem] border border-white/10 bg-[#111827] p-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ${className ?? ''}`}
    >
      <div className="overflow-hidden rounded-[0.65rem] bg-[#0a0f1a]">{children}</div>
      <div className="mx-auto mt-1 h-1.5 w-[30%] rounded-b-md bg-[#374151]" />
    </div>
  );
}

export default function PortfolioMagazine() {
  const { studies, loading } = useCaseStudies();
  const { section: copy } = useSiteSection('home.featured-work');
  const { section: caseIntro } = useSiteSection('case-studies.hero');
  const mediaMap = useProjectMediaMap();
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  if (loading || studies.length === 0) return null;

  const [featured, ...rest] = studies;
  const featuredMedia = mediaMap.get(featured.slug);
  const featuredImg = heroImageFor(featuredMedia) || featured.thumbnail;

  return (
    <SectionBackdrop theme="dark" bottomFade className="py-28 md:py-40">
      <section ref={ref} aria-label="Featured work">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 max-w-2xl"
          >
            <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
              {caseIntro.badge}
            </p>
            <h2 className="text-4xl font-bold font-poppins leading-[1.04] tracking-tight text-white md:text-5xl lg:text-6xl">
              {copy.headline}
            </h2>
            <p className="mt-5 text-lg font-montserrat leading-relaxed text-slate-400">{copy.description}</p>
          </motion.div>

          <Link href={`/case-studies/${featured.slug}`} className="group mb-10 block">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="figma-glass overflow-hidden rounded-[2.5rem] p-4 md:p-6"
            >
              <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <DeviceFrame>
                    <div className="relative aspect-[16/10] min-h-[240px]">
                      <motion.div style={{ y: parallaxY }} className="absolute inset-0 scale-105">
                        {featuredImg ? (
                          <SafeImage
                            src={featuredImg}
                            alt={featured.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2B6EF2]/20 to-[#111827]" />
                        )}
                      </motion.div>
                    </div>
                  </DeviceFrame>
                </div>
                <div className="lg:col-span-5 lg:pl-4">
                  <span className="text-xs font-montserrat font-semibold uppercase tracking-widest text-[#2B6EF2]">
                    {featured.industry}
                  </span>
                  <h3 className="mt-3 text-3xl font-bold font-poppins leading-tight text-white md:text-4xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 font-montserrat leading-relaxed text-slate-400">{featured.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {featured.metrics.slice(0, 3).map((m, i) => (
                      <span key={i} className="figma-glass rounded-xl px-4 py-2 text-sm font-montserrat">
                        <span className="font-bold text-[#E46F1E]">{m.value}</span>{' '}
                        <span className="text-slate-400">{m.label}</span>
                      </span>
                    ))}
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-[#E46F1E]">
                    {copy.viewCaseStudyLabel}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>

          <div className="grid gap-6 md:grid-cols-2">
            {rest.slice(0, 2).map((study, i) => {
              const media = mediaMap.get(study.slug);
              const img = thumbnailFor(media) || study.thumbnail;
              const metric = study.metrics[0];
              return (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                    <div className="figma-glass h-full overflow-hidden rounded-[1.75rem] transition-all duration-500 hover:-translate-y-1">
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
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-[#111827]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-[10px] font-montserrat font-semibold uppercase tracking-widest text-slate-400">
                            {study.industry}
                          </p>
                          <h4 className="mt-1 text-xl font-bold font-poppins text-white">{study.title}</h4>
                          {metric && (
                            <p className="mt-2 text-sm font-montserrat">
                              <span className="font-semibold text-[#E46F1E]">{metric.value}</span>{' '}
                              <span className="text-slate-400">{metric.label}</span>
                            </p>
                          )}
                        </div>
                        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl figma-glass text-white">
                          <Smartphone className="h-4 w-4" aria-hidden="true" />
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
