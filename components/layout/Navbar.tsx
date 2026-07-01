'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import { cn } from '@/lib/utils';

function NavDropdown({
  label,
  children,
  align = 'left',
}: {
  label: string;
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="inline-flex items-center gap-1 px-3 py-2 font-inter text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={14} className={cn('transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <div
          className={cn(
            'absolute top-full z-50 mt-2 min-w-[210px] overflow-hidden rounded-2xl p-2 shadow-[0_20px_56px_-12px_rgba(15,23,42,0.16),0_0_0_1px_rgba(15,20,30,0.08)]',
            align === 'right' ? 'right-0' : 'left-0',
          )}
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Top orange accent line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#e46f1e] via-[#f59e42] to-transparent" aria-hidden="true" />
          {/* Ambient inner glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 10% 0%,rgba(228,111,30,0.06),transparent 60%)' }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { section: nav } = useSiteSection('site.nav');
  const { section: footer } = useSiteSection('site.footer');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
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

  const servicesCol = footer.columns.find((c) => c.title === 'Services');
  const companyCol = footer.columns.find((c) => c.title === 'Company');

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-[rgba(15,20,30,0.08)] bg-white/85 backdrop-blur-2xl shadow-[0_4px_24px_-8px_rgba(15,23,42,0.1)]'
            : 'bg-transparent',
        )}
        aria-label="Main navigation"
      >
        <div className="container-premium">
          <div className={cn('flex items-center justify-between gap-6 transition-all duration-500', scrolled ? 'h-16' : 'h-20')}>
            <Link href="/" className="group flex min-h-11 items-center gap-3 py-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e46f1e] to-[#f59e42] text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(228,111,30,0.55)]">
                ▲
              </span>
              <span className="leading-tight">
                <span className="block font-inter text-lg font-bold tracking-tight text-slate-900">
                  {nav.brandName}
                </span>
                <span className="block font-inter text-[9px] font-semibold uppercase tracking-[0.28em] text-[#e46f1e]">
                  DigiTech
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              <NavDropdown label="Services">
                {(servicesCol?.links ?? []).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl px-3 py-2.5 font-inter text-sm text-slate-600 transition-all duration-200 hover:bg-[rgba(228,111,30,0.06)] hover:text-[#e46f1e]"
                  >
                    {link.name}
                    <ArrowRight size={11} className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                ))}
                <div className="my-1 h-px bg-[rgba(15,20,30,0.06)]" />
                <Link
                  href="/services"
                  className="group flex items-center justify-between rounded-xl px-3 py-2.5 font-inter text-sm font-semibold text-[#e46f1e] transition-all duration-200 hover:bg-[rgba(228,111,30,0.08)]"
                >
                  All Services
                  <ArrowRight size={11} className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                </Link>
              </NavDropdown>

              {nav.items
                .filter((item) => item.href !== '/services')
                .slice(0, 3)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-3 py-2 font-inter text-sm font-medium transition-colors',
                      isActive(item.href) ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900',
                    )}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-[1.5px] rounded-full bg-[#e46f1e]" />
                    )}
                  </Link>
                ))}

              <Link
                href="/pricing"
                className={cn(
                  'px-3 py-2 font-inter text-sm font-medium transition-colors',
                  isActive('/pricing') ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900',
                )}
              >
                Pricing
              </Link>

              <NavDropdown label="Company" align="right">
                {(companyCol?.links ?? []).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl px-3 py-2.5 font-inter text-sm text-slate-600 transition-all duration-200 hover:bg-[rgba(228,111,30,0.06)] hover:text-[#e46f1e]"
                  >
                    {link.name}
                    <ArrowRight size={11} className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                ))}
              </NavDropdown>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0d1117] px-5 py-2.5 font-inter text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1c2333] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.3)]"
              >
                Talk to Us
              </Link>
              <Link
                href={nav.ctaHref}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#e46f1e] px-5 py-2.5 font-inter text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(228,111,30,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c45a12] hover:shadow-[0_12px_32px_-8px_rgba(228,111,30,0.55)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
                <span className="relative">{nav.ctaLabel}</span>
                <ArrowRight size={15} className="relative" />
              </Link>
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/80 lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span className={cn('block h-px w-5 bg-slate-800 transition-transform', isOpen && 'translate-y-[7px] rotate-45')} />
                <span className={cn('block h-px w-5 bg-slate-800', isOpen && 'opacity-0')} />
                <span className={cn('block h-px w-5 bg-slate-800 transition-transform', isOpen && '-translate-y-[7px] -rotate-45')} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} aria-label="Close" />
          <div className="absolute right-0 top-0 h-full w-[min(100%,20rem)] bg-white p-8 pt-24 shadow-2xl">
            <div className="flex flex-col gap-1">
              {nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 font-inter text-base text-slate-800 hover:bg-slate-50"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/pricing" onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 font-inter text-base text-slate-800 hover:bg-slate-50">
                Pricing
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 font-inter text-base text-slate-800 hover:bg-slate-50">
                Contact
              </Link>
            </div>
            <Link
              href={nav.ctaHref}
              onClick={() => setIsOpen(false)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#e46f1e] px-5 py-3.5 font-inter text-sm font-semibold text-white"
            >
              {nav.ctaLabel}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
