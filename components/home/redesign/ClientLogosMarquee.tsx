'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';
import type { ClientLogoData } from '@/lib/media';
import { useSiteSection } from '@/lib/use-site-content';

export default function ClientLogosMarquee({ initialLogos }: { initialLogos: ClientLogoData[] }) {
  const { section: strip } = useSiteSection('site.client-logos');
  if (!initialLogos.length) return null;

  const sorted = [...initialLogos].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section
      className="relative py-16 md:py-20 bg-white border-y border-slate-100 overflow-hidden"
      aria-label="Client logos"
    >
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs font-montserrat font-semibold uppercase tracking-[0.25em] text-slate-400"
        >
          {strip.label}
        </motion.p>
      </div>

      <div className="flex gap-16 items-center animate-scroll w-max">
        {[...sorted, ...sorted].map((logo, idx) => (
          <a
            key={`${logo.id}-${idx}`}
            href={logo.websiteUrl || undefined}
            target={logo.websiteUrl ? '_blank' : undefined}
            rel={logo.websiteUrl ? 'noopener noreferrer' : undefined}
            className="flex-shrink-0 flex items-center gap-3 group px-2"
          >
            <SafeImage
              src={logo.logo}
              alt={`${logo.companyName} logo`}
              width={120}
              height={48}
              sizes="120px"
              className="h-10 w-auto max-w-[140px] object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
            />
            <span className="text-sm font-poppins font-semibold text-slate-300 group-hover:text-slate-600 transition-colors whitespace-nowrap hidden sm:inline">
              {logo.companyName}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
