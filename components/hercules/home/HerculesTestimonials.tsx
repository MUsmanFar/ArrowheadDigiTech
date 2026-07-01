'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Quote, Star } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';
import { useSiteSection } from '@/lib/use-site-content';
import GlassCard from '../ui/GlassCard';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import HerculesButton from '../ui/HerculesButton';

type Testimonial = {
  id: string;
  name: string;
  role?: string | null;
  company?: string | null;
  content: string;
  featured?: boolean;
};

export default function HerculesTestimonials() {
  const { section: page } = useSiteSection('testimonials.page');
  const { studies } = useCaseStudies();
  const mediaMap = useProjectMediaMap();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);

  const featuredStudy = studies[0];
  const studyThumb = featuredStudy
    ? thumbnailFor(mediaMap.get(featuredStudy.slug)) || featuredStudy.thumbnail
    : null;

  useEffect(() => {
    fetch('/api/public/testimonials')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data)) return;
        const featured = data.filter((t: Testimonial & { featured?: boolean }) => t.featured);
        setTestimonials((featured.length ? featured : data).slice(0, 6));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  const t = testimonials[active];

  return (
    <section className="hercules-section relative overflow-hidden bg-slate-50 py-24 md:py-32" aria-label="Testimonials">
      <div className="pointer-events-none absolute -left-40 top-20 h-[800px] w-[800px] rounded-full bg-orange-100/40 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[600px] w-[600px] rounded-full bg-blue-100/30 blur-[100px]" aria-hidden="true" />

      <div className="container-premium relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <SectionHeader
            eyebrow="Client Success"
            title={page.headline}
            description={page.subheadline}
            align="center"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {featuredStudy && (
            <Reveal delay={80} className="lg:col-span-5 h-full">
              <Link href={`/case-studies/${featuredStudy.slug}`} className="group block h-full">
                <GlassCard hover className="relative h-full min-h-[400px] overflow-hidden rounded-[2.5rem] border border-white shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)]">
                  <div className="absolute inset-0 bg-slate-900">
                    {studyThumb && (
                      <SafeImage
                        src={studyThumb}
                        alt={featuredStudy.title}
                        fill
                        className="object-cover opacity-50 mix-blend-overlay transition-transform duration-1000 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  </div>
                  <div className="relative flex h-full flex-col justify-end p-10 md:p-12">
                    <div className="mb-6 inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/20 px-4 py-1.5 backdrop-blur-md">
                      <p className="font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-orange-300">
                        Featured Case Study
                      </p>
                    </div>
                    <h3 className="font-inter tracking-tight text-3xl font-extrabold text-white md:text-4xl leading-tight">
                      {featuredStudy.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 font-inter text-base leading-relaxed text-slate-300">
                      {featuredStudy.summary}
                    </p>
                    <div className="mt-8 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 font-inter text-sm font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                        Read full story
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 group-hover:bg-orange-500/20 transition-colors backdrop-blur-md">
                        <ArrowRight size={16} className="text-white group-hover:text-orange-300 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          )}

          <Reveal delay={160} className={featuredStudy ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <GlassCard padding="lg" className="relative h-full overflow-hidden md:p-14 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.08)]">
              <Quote className="absolute right-10 top-10 h-24 w-24 text-orange-100/50 -rotate-12 transform" aria-hidden="true" />
              
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-10 flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className="fill-[#e46f1e] text-[#e46f1e]" aria-hidden="true" />
                  ))}
                </div>
                
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="font-inter text-xl leading-[1.8] tracking-tight text-slate-700 md:text-2xl font-medium">
                        &ldquo;{t.content}&rdquo;
                      </p>
                      
                      <div className="mt-12 flex items-center gap-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-50 font-inter text-xl font-bold text-[#e46f1e] shadow-sm border border-white">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-inter text-lg font-bold text-slate-900">{t.name}</p>
                          <p className="font-inter text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">
                            {[t.role, t.company].filter(Boolean).join(' · ')}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {testimonials.length > 1 && (
                  <div className="mt-12 flex flex-wrap gap-2.5 pt-8 border-t border-slate-200/50">
                    {testimonials.map((item, i) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActive(i)}
                        className={`rounded-full px-4 py-2 font-inter text-xs font-bold transition-all duration-300 ${
                          i === active
                            ? 'bg-slate-900 text-white shadow-[0_8px_20px_-8px_rgba(15,23,42,0.4)] transform scale-105'
                            : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200/60'
                        }`}
                      >
                        {item.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
