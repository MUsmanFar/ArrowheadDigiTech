'use client';

import React, { useEffect, useState } from 'react';
import type { ClientLogoData } from '@/lib/media';
import { getClientLogos } from '@/lib/media';
import { useSiteSection } from '@/lib/use-site-content';

export default function ClientLogoStrip() {
  const [logos, setLogos] = useState<ClientLogoData[]>([]);
  const [loading, setLoading] = useState(true);
  const { section: strip } = useSiteSection('site.client-logos');

  useEffect(() => {
    getClientLogos()
      .then(setLogos)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (logos.length === 0) return null;

  const sorted = [...logos].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="w-full bg-white border-t border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center mb-5 font-poppins">
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.logo}
                  alt={logo.companyName}
                  className="h-10 w-auto object-contain transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                />
                <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-700 transition-colors duration-300 font-poppins whitespace-nowrap">
                  {logo.companyName}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
