'use client';

import React from 'react';
import SafeImage from '@/components/ui/SafeImage';
import type { ClientLogoData } from '@/lib/media';
import { useSiteSection } from '@/lib/use-site-content';

export default function ClientLogoStrip({ initialLogos }: { initialLogos: ClientLogoData[] }) {
  const { section: strip } = useSiteSection('site.client-logos');

  if (!initialLogos.length) return null;

  const sorted = [...initialLogos].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="w-full bg-white border-t border-b border-slate-100 overflow-hidden" aria-label="Client logos">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 text-center mb-5 font-poppins">
          {strip.label}
        </p>
        <div className="relative overflow-hidden">
          <div className="flex gap-10 items-center animate-scroll">
            {[...sorted, ...sorted].map((logo, idx) => (
              <a
                key={`${logo.id}-${idx}`}
                href={logo.websiteUrl || undefined}
                target={logo.websiteUrl ? '_blank' : undefined}
                rel={logo.websiteUrl ? 'noopener noreferrer' : undefined}
                className="flex-shrink-0 flex items-center gap-2 group"
              >
                <SafeImage
                  src={logo.logo}
                  alt={`${logo.companyName} logo`}
                  width={80}
                  height={40}
                  sizes="80px"
                  className="h-10 w-auto max-w-[120px] object-contain transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                  loading="lazy"
                />
                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors duration-300 font-poppins whitespace-nowrap">
                  {logo.companyName}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
