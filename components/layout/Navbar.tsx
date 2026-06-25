'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSiteSection } from '@/lib/use-site-content';

export default function Navbar() {
  const { section: nav } = useSiteSection('site.nav');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-fade-in ${
        scrolled ? 'glass-premium' : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="container-premium">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2.5 group min-h-11 py-2">
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white text-sm font-bold shadow-sm"
              aria-hidden="true"
            >
              ▲
            </span>
            <span className="text-lg font-semibold text-slate-900 font-poppins tracking-tight">
              {nav.brandName}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {nav.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 rounded-full hover:bg-slate-100/60"
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-3 pl-3 border-l border-slate-200">
              <Link href={nav.ctaHref} className="btn-primary text-sm py-2.5 px-5">
                {nav.ctaLabel}
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center w-12 h-12 min-w-12 min-h-12 rounded-full hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span
                className={`block w-5 h-px bg-slate-700 transition-transform duration-300 ${
                  isOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block w-5 h-px bg-slate-700 transition-opacity duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block w-5 h-px bg-slate-700 transition-transform duration-300 ${
                  isOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="fixed inset-0 z-40 bg-white md:hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {nav.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl font-medium text-slate-900 hover:text-orange-500 transition-colors font-poppins"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={nav.ctaHref}
              className="btn-primary text-base py-4 px-8 mt-4"
              onClick={() => setIsOpen(false)}
            >
              {nav.ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
