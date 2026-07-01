'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Facebook, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';

export default function Footer() {
  const { section: footer } = useSiteSection('site.footer');

  const socials = [
    { href: footer.social?.linkedin, icon: Linkedin,  label: 'LinkedIn'  },
    { href: footer.social?.twitter,  icon: Twitter,   label: 'Twitter'   },
    { href: footer.social?.facebook, icon: Facebook,  label: 'Facebook'  },
  ].filter(s => Boolean(s.href));

  return (
    <footer
      className="relative overflow-hidden border-t border-[rgba(15,20,30,0.07)]"
      style={{
        background: 'linear-gradient(180deg,rgba(255,255,255,0.97) 0%,rgba(249,247,244,0.99) 100%)',
      }}
      aria-label="Site footer"
    >
      {/* Subtle architectural grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right,rgba(15,20,30,0.018) 1px,transparent 1px),linear-gradient(to bottom,rgba(15,20,30,0.018) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* Warm ambient glow — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-[10%] -left-[5%] h-[40vh] w-[30vw] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(228,111,30,0.06),transparent 70%)', filter: 'blur(50px)' }}
        aria-hidden="true"
      />
      {/* Cool glow — top right */}
      <div
        className="pointer-events-none absolute -right-[5%] top-0 h-[35vh] w-[25vw] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(43,110,242,0.04),transparent 70%)', filter: 'blur(48px)' }}
        aria-hidden="true"
      />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="container-premium relative z-10">

        {/* ── Top brand + links grid ── */}
        <div className="grid gap-12 py-14 lg:grid-cols-12 lg:py-16 md:gap-10">

          {/* Brand column */}
          <div className="lg:col-span-4">
            {/* Logo mark */}
            <Link href="/" className="group inline-flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl shadow-[0_8px_24px_-8px_rgba(228,111,30,0.45)]"
                style={{ background: 'linear-gradient(135deg,#e46f1e 0%,#f59e42 100%)' }}
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M10 2 L18 10 L10 18 L7 15 L12 10 L7 5 Z" fill="white" />
                </svg>
              </div>
              <span className="leading-tight">
                <span className="block font-inter text-[1rem] font-bold tracking-tight text-[#0d1117] transition-colors duration-200 group-hover:text-[#e46f1e]">
                  {footer.brandName}
                </span>
                <span className="block font-inter text-[9px] font-semibold uppercase tracking-[0.28em] text-[#e46f1e]">
                  DigiTech
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs font-inter text-[13.5px] leading-[1.8] text-[#6b7280]">
              {footer.tagline}
            </p>

            {/* Contact details */}
            <div className="mt-6 flex flex-col gap-2.5">
              {footer.email && (
                <a href={`mailto:${footer.email}`}
                  className="group inline-flex items-center gap-2.5 font-inter text-[13px] text-[#6b7280] transition-colors hover:text-[#e46f1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2">
                  <Mail size={13} className="shrink-0 text-[#e46f1e] opacity-70" aria-hidden="true" />
                  {footer.email}
                </a>
              )}
              {footer.phone && (
                <a href={footer.phoneHref || `tel:${footer.phone}`}
                  className="group inline-flex items-center gap-2.5 font-inter text-[13px] text-[#6b7280] transition-colors hover:text-[#e46f1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2">
                  <Phone size={13} className="shrink-0 text-[#e46f1e] opacity-70" aria-hidden="true" />
                  {footer.phone}
                </a>
              )}
              {footer.address && (
                <span className="inline-flex items-start gap-2.5 font-inter text-[13px] text-[#9ca3af]">
                  <MapPin size={13} className="mt-0.5 shrink-0 text-[#e46f1e] opacity-70" aria-hidden="true" />
                  {footer.address}
                </span>
              )}
            </div>

            {/* Social icons */}
            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-2">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(15,20,30,0.09)] bg-white/70 text-[#9ca3af] shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 hover:border-[rgba(228,111,30,0.3)] hover:bg-white hover:text-[#e46f1e] hover:shadow-[0_6px_18px_-6px_rgba(228,111,30,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2"
                  >
                    <Icon size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(15,20,30,0.35)]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 font-inter text-[13.5px] text-[#6b7280] transition-all duration-200 hover:text-[#e46f1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2"
                      >
                        {link.name}
                        <ArrowUpRight
                          size={10}
                          className="opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col gap-4 border-t py-5 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: 'rgba(15,20,30,0.07)' }}
        >
          <p className="font-inter text-[12.5px] text-[#9ca3af]">
            © {new Date().getFullYear()} {footer.brandName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-1">
            {[
              { href: '/privacy-policy',       label: 'Privacy'   },
              { href: '/terms-and-conditions', label: 'Terms'     },
              { href: '/contact',              label: 'Contact'   },
            ].map(({ href, label }, i, arr) => (
              <span key={href} className="flex items-center">
                <Link
                  href={href}
                  className="font-inter text-[12.5px] text-[#9ca3af] transition-colors hover:text-[#e46f1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2"
                >
                  {label}
                </Link>
                {i < arr.length - 1 && (
                  <span className="mx-2 font-inter text-[10px] text-[rgba(15,20,30,0.15)]">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
