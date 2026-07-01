'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2,
  Car,
  Heart,
  Plane,
  ShoppingBag,
  Stethoscope,
  Truck,
  ArrowRight
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import HerculesButton from '../ui/HerculesButton';
import SectionHeader from '../ui/SectionHeader';

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Transportation: Truck,
  Healthcare: Heart,
  Travel: Plane,
  'E-commerce': ShoppingBag,
  Automotive: Car,
  Medical: Stethoscope,
};

export default function HerculesIndustries() {
  const { studies } = useCaseStudies();
  const { section: caseHero } = useSiteSection('case-studies.hero');

  const industries = useMemo(() => {
    const map = new Map<string, { industry: string; slug: string }>();
    studies.forEach((s) => {
      if (!s.industry || map.has(s.industry)) return;
      map.set(s.industry, { industry: s.industry, slug: s.slug });
    });
    return Array.from(map.values()).slice(0, 6);
  }, [studies]);

  if (industries.length === 0) return null;

  return (
    <section className="hercules-section relative overflow-hidden bg-white py-24 md:py-32" aria-label="Industries">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50/50 blur-[100px]" aria-hidden="true" />
      
      <div className="container-premium relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <SectionHeader
            eyebrow="Industries We Serve"
            title={caseHero.headline}
            description={caseHero.subheadline}
            align="center"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {industries.map((item, i) => {
            const Icon = INDUSTRY_ICONS[item.industry] ?? Building2;
            return (
              <motion.div
                key={item.industry}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/case-studies/${item.slug}`}
                  className="group relative flex h-full flex-col items-center justify-center p-8 text-center rounded-[2rem] bg-white border border-slate-100 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(228,111,30,0.15)] hover:border-orange-100 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-50/0 to-orange-50/0 group-hover:from-orange-50/50 group-hover:to-white transition-colors duration-500" />
                  
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 transition-colors duration-500 group-hover:bg-white group-hover:shadow-sm">
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-slate-400 transition-colors group-hover:text-[#e46f1e]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="relative z-10 mt-6 font-inter text-sm font-bold text-slate-700 transition-colors group-hover:text-slate-900">
                    {item.industry}
                  </p>
                  
                  <div className="relative z-10 mt-4 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-[#e46f1e]">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <HerculesButton href="/case-studies" variant="secondary" className="bg-slate-50 hover:bg-slate-100 border-transparent">
            View all case studies
          </HerculesButton>
        </div>
      </div>
    </section>
  );
}
