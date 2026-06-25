'use client';

import React from 'react';
import Link from 'next/link';
import { useSiteSection } from '@/lib/use-site-content';

export default function MobileStickyCta() {
  const { section: cta } = useSiteSection('site.mobile-cta');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-center gap-3 px-4 py-3">
        <a
          href={cta.phoneHref}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex-shrink-0"
          aria-label="Call us"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
        <Link
          href={cta.buttonHref}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-orange-500 text-white text-sm font-semibold transition-colors hover:bg-orange-600"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {cta.buttonLabel}
        </Link>
      </div>
    </div>
  );
}
