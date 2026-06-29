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
    <section className="hercules-section bg-white" aria-label="Industries">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Industries We Serve"
          title={caseHero.headline}
          description={caseHero.subheadline}
          align="center"
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-10">
          {industries.map((item, i) => {
            const Icon = INDUSTRY_ICONS[item.industry] ?? Building2;
            return (
              <motion.div
                key={item.industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={`/case-studies/${item.slug}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-slate-100 bg-gradient-to-br from-white to-slate-50 shadow-[0_16px_48px_-20px_rgba(15,23,42,0.12)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-orange-100 group-hover:shadow-[0_24px_60px_-20px_rgba(228,111,30,0.15)]">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-slate-500 transition-colors group-hover:text-[#e46f1e]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-5 font-montserrat text-sm font-semibold text-slate-700 transition-colors group-hover:text-[#e46f1e]">
                    {item.industry}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <HerculesButton href="/case-studies" variant="secondary">
            View all case studies
          </HerculesButton>
        </div>
      </div>
    </section>
  );
}
