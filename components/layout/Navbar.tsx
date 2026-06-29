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
        className="inline-flex items-center gap-1 px-3 py-2 font-montserrat text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div
          className={cn(
            'absolute top-full z-50 mt-2 min-w-[200px] rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-xl',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {children}
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
    const handleScroll = () => setScrolled(window.scrollY > 12);
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_-20px_rgba(15,23,42,0.12)]'
            : 'bg-transparent',
        )}
        aria-label="Main navigation"
      >
        <div className="container-premium">
          <div className="flex h-20 items-center justify-between gap-6">
            <Link href="/" className="group flex min-h-11 items-center gap-3 py-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e46f1e] to-[#f59e42] text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(228,111,30,0.55)]">
                ▲
              </span>
              <span className="leading-tight">
                <span className="block font-poppins text-lg font-bold tracking-tight text-slate-900">
                  {nav.brandName}
                </span>
                <span className="block font-montserrat text-[9px] font-semibold uppercase tracking-[0.28em] text-[#e46f1e]">
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
                    className="block rounded-xl px-3 py-2.5 font-montserrat text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="mt-1 block rounded-xl px-3 py-2.5 font-montserrat text-sm font-semibold text-[#e46f1e] hover:bg-orange-50"
                >
                  All Services
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
                      'px-3 py-2 font-montserrat text-sm font-medium transition-colors',
                      isActive(item.href) ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900',
                    )}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}

              <Link
                href="/pricing"
                className={cn(
                  'px-3 py-2 font-montserrat text-sm font-medium transition-colors',
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
                    className="block rounded-xl px-3 py-2.5 font-montserrat text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {link.name}
                  </Link>
                ))}
              </NavDropdown>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 font-montserrat text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Talk to Us
              </Link>
              <Link
                href={nav.ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#e46f1e] px-5 py-2.5 font-montserrat text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(228,111,30,0.55)] transition-colors hover:bg-[#c45a12]"
              >
                {nav.ctaLabel}
                <ArrowRight size={15} />
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
                  className="rounded-xl px-4 py-3 font-montserrat text-base text-slate-800 hover:bg-slate-50"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/pricing" onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 font-montserrat text-base text-slate-800 hover:bg-slate-50">
                Pricing
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 font-montserrat text-base text-slate-800 hover:bg-slate-50">
                Contact
              </Link>
            </div>
            <Link
              href={nav.ctaHref}
              onClick={() => setIsOpen(false)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#e46f1e] px-5 py-3.5 font-montserrat text-sm font-semibold text-white"
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
