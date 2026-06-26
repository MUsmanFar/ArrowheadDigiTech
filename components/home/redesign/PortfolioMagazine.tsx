'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useProjectMediaMap, thumbnailFor, heroImageFor } from '@/lib/use-project-media';
import { useSiteSection } from '@/lib/use-site-content';

export default function PortfolioMagazine() {
  const { studies, loading } = useCaseStudies();
  const { section: copy } = useSiteSection('home.featured-work');
  const { section: caseIntro } = useSiteSection('case-studies.hero');
  const mediaMap = useProjectMediaMap();
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  if (loading || studies.length === 0) return null;

  const [featured, ...rest] = studies;
  const featuredMedia = mediaMap.get(featured.slug);
  const featuredImg = heroImageFor(featuredMedia) || featured.thumbnail;

  return (
    <section ref={ref} className="relative py-28 md:py-40 bg-white" aria-label="Featured work">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-orange-500 mb-4">
              {caseIntro.badge}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 tracking-tight leading-[1.05]">
              {copy.headline}
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-montserrat leading-relaxed">{copy.description}</p>
          </motion.div>
        </div>

        <Link href={`/case-studies/${featured.slug}`} className="group block mb-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-12 gap-0 rounded-[2rem] overflow-hidden bg-slate-900 shadow-[0_40px_100px_-40px_rgba(15,23,42,0.35)]"
          >
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[520px] overflow-hidden">
              <motion.div style={{ y: parallaxY }} className="absolute inset-0 scale-110">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                )}
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-900/30 lg:to-slate-900/90" />
            </div>
            <div className="lg:col-span-5 p-8 md:p-12 lg:p-14 flex flex-col justify-end text-white">
              <span className="text-xs font-montserrat font-semibold uppercase tracking-widest text-orange-400 mb-4">
                {featured.industry}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold font-poppins leading-tight mb-4">{featured.title}</h3>
              <p className="text-slate-300 font-montserrat leading-relaxed mb-6">{featured.summary}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {featured.metrics.slice(0, 3).map((m, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-sm font-montserrat"
                  >
                    <span className="font-bold text-orange-300">{m.value}</span> {m.label}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-orange-300 group-hover:text-orange-200">
                {copy.viewCaseStudyLabel}
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </motion.div>
        </Link>

        <div className="grid md:grid-cols-3 gap-5">
          {rest.slice(0, 3).map((study, i) => {
            const media = mediaMap.get(study.slug);
            const img = thumbnailFor(media) || study.thumbnail;
            return (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/case-studies/${study.slug}`} className="group block">
                  <div className="rounded-[1.5rem] overflow-hidden bg-[#fafafa] border border-slate-100 shadow-[0_16px_50px_-24px_rgba(15,23,42,0.12)] hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {img ? (
                        <SafeImage
                          src={img}
                          alt={study.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] font-montserrat font-semibold uppercase tracking-widest text-slate-400">
                        {study.industry}
                      </p>
                      <h4 className="mt-1 text-lg font-bold font-poppins text-slate-900">{study.title}</h4>
                      <p className="mt-1 text-sm text-slate-500 font-montserrat truncate">{study.client}</p>
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
            className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-slate-600 hover:text-orange-600 transition-colors"
          >
            {copy.viewAllLabel}
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
