'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';
import type { ClientLogoData } from '@/lib/media';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

export default function ClientLogosMarquee({ initialLogos }: { initialLogos: ClientLogoData[] }) {
  const { section: strip } = useSiteSection('site.client-logos');
  if (!initialLogos.length) return null;

  const sorted = [...initialLogos].sort((a, b) => a.sortOrder - b.sortOrder);
  const track = [...sorted, ...sorted, ...sorted];

  return (
    <SectionBackdrop variant="silver" className="border-y border-[#E5E7EB]/80 py-14 md:py-18">
      <section className="overflow-hidden" aria-label="Client logos">
        <div className="container-premium mb-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xs font-montserrat font-semibold uppercase tracking-[0.28em] text-slate-400"
          >
            {strip.label}
          </motion.p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#FAFAFA] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#FAFAFA] to-transparent" />

          <div className="flex w-max animate-scroll items-center gap-14 md:gap-20">
            {track.map((logo, idx) => (
              <a
                key={`${logo.id}-${idx}`}
                href={logo.websiteUrl || undefined}
                target={logo.websiteUrl ? '_blank' : undefined}
                rel={logo.websiteUrl ? 'noopener noreferrer' : undefined}
                className="group flex shrink-0 items-center gap-3 px-2"
              >
                <SafeImage
                  src={logo.logo}
                  alt={`${logo.companyName} logo`}
                  width={130}
                  height={48}
                  sizes="130px"
                  className="h-10 w-auto max-w-[130px] object-contain opacity-40 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="hidden whitespace-nowrap text-sm font-poppins font-semibold text-slate-300 transition-colors duration-500 group-hover:text-[#111827] lg:inline">
                  {logo.companyName}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
