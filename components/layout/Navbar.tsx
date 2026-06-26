'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { section: nav } = useSiteSection('site.nav');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass-premium shadow-[0_8px_30px_-20px_rgba(15,23,42,0.18)]'
            : 'bg-white/40 backdrop-blur-md border-b border-transparent',
        )}
        aria-label="Main navigation"
      >
        <div className="container-premium">
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-500',
              scrolled ? 'h-16' : 'h-20',
            )}
          >
            <Link
              href="/"
              className="group flex items-center gap-3 min-h-11 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 rounded-xl"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white text-xs font-bold shadow-[0_8px_24px_-8px_rgba(249,115,22,0.65)] transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                ▲
              </span>
              <span className="text-base md:text-lg font-semibold text-slate-900 font-poppins tracking-tight">
                {nav.brandName}
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2.5 text-sm font-medium font-montserrat rounded-full transition-all duration-300',
                    isActive(item.href)
                      ? 'nav-link-active text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/70',
                  )}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="ml-4 pl-4 border-l border-slate-200/80">
                <Link
                  href={nav.ctaHref}
                  className="btn-primary text-sm py-2.5 px-5 shadow-[0_10px_30px_-12px_rgba(249,115,22,0.55)]"
                >
                  {nav.ctaLabel}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-12 h-12 min-w-12 min-h-12 rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-sm hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span
                  className={cn(
                    'block w-5 h-px bg-slate-700 transition-transform duration-300',
                    isOpen && 'translate-y-[7px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'block w-5 h-px bg-slate-700 transition-opacity duration-300',
                    isOpen ? 'opacity-0' : 'opacity-100',
                  )}
                />
                <span
                  className={cn(
                    'block w-5 h-px bg-slate-700 transition-transform duration-300',
                    isOpen && '-translate-y-[7px] -rotate-45',
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu overlay"
          />
          <div className="absolute right-0 top-0 h-full w-[min(100%,22rem)] bg-white/95 backdrop-blur-2xl border-l border-slate-200/80 shadow-2xl p-8 pt-24 animate-fade-in">
            <div className="flex flex-col gap-2">
              {nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-2xl px-4 py-4 text-lg font-medium font-poppins transition-colors',
                    isActive(item.href)
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-slate-800 hover:bg-slate-50',
                  )}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              href={nav.ctaHref}
              className="btn-primary w-full justify-center text-base py-4 px-8 mt-8"
              onClick={() => setIsOpen(false)}
            >
              {nav.ctaLabel}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
