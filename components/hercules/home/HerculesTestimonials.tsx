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
    const id = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  const t = testimonials[active];

  return (
    <section className="hercules-section hercules-section-warm" aria-label="Testimonials">
      <div className="container-premium">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <Reveal className="lg:col-span-3">
            <SectionHeader
              eyebrow="Client Success"
              title={page.headline}
              description={page.subheadline}
            />
            <div className="mt-8">
              <HerculesButton href="/case-studies" variant="secondary" showArrow>
                View all case studies
              </HerculesButton>
            </div>
          </Reveal>

          {featuredStudy && (
            <Reveal delay={80} className="lg:col-span-5">
              <Link href={`/case-studies/${featuredStudy.slug}`} className="group block h-full">
                <GlassCard hover className="relative h-full min-h-[320px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                    {studyThumb && (
                      <SafeImage
                        src={studyThumb}
                        alt={featuredStudy.title}
                        fill
                        className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                  </div>
                  <div className="relative flex h-full min-h-[320px] flex-col justify-end p-8 md:p-10">
                    <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">
                      Featured Case Study
                    </p>
                    <h3 className="mt-3 font-poppins text-2xl font-bold text-white md:text-3xl">
                      {featuredStudy.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 font-montserrat text-sm leading-relaxed text-slate-300">
                      {featuredStudy.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 font-montserrat text-sm font-semibold text-orange-300">
                      Read case study <ArrowRight size={14} />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          )}

          <Reveal delay={160} className={featuredStudy ? 'lg:col-span-4' : 'lg:col-span-9'}>
            <GlassCard padding="lg" className="relative h-full overflow-hidden md:p-10">
              <Quote className="absolute right-8 top-8 h-10 w-10 text-orange-100" aria-hidden="true" />
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-[#e46f1e] text-[#e46f1e]" aria-hidden="true" />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-montserrat text-base leading-[1.8] text-slate-600 md:text-lg">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-50 font-poppins text-lg font-bold text-[#e46f1e]">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-poppins text-base font-bold text-slate-900">{t.name}</p>
                      <p className="font-montserrat text-sm text-slate-500">
                        {[t.role, t.company].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {testimonials.length > 1 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {testimonials.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`rounded-full px-3.5 py-1.5 font-montserrat text-xs transition-all duration-300 ${
                        i === active
                          ? 'bg-[#e46f1e] text-white shadow-[0_8px_24px_-8px_rgba(228,111,30,0.5)]'
                          : 'border border-slate-200 bg-white text-slate-500 hover:border-orange-200'
                      }`}
                    >
                      {item.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
