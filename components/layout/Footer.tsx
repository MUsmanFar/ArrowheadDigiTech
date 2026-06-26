'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import AnimatedDivider from '@/components/design-system/AnimatedDivider';

export default function Footer() {
  const { section: footer } = useSiteSection('site.footer');

  return (
    <footer className="relative bg-white border-t border-slate-100" aria-label="Site footer">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-200/60 to-transparent" />

      <div className="container-premium pt-20 pb-10">
        <div className="rounded-[2rem] border border-slate-100 bg-page-surface p-10 md:p-14 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.12)]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white text-sm font-bold shadow-sm"
                  aria-hidden="true"
                >
                  ▲
                </span>
                <h2 className="text-2xl font-bold font-poppins text-slate-900">{footer.brandName}</h2>
              </div>
              <p className="mt-4 text-sm text-slate-500 font-montserrat leading-relaxed max-w-sm">
                {footer.tagline}
              </p>

              <div className="mt-8 space-y-3 text-sm font-montserrat">
                <a
                  href={`mailto:${footer.email}`}
                  className="flex items-center gap-3 text-slate-600 hover:text-orange-600 transition-colors"
                >
                  <Mail size={16} className="text-orange-500" aria-hidden="true" />
                  {footer.email}
                </a>
                <a
                  href={footer.phoneHref}
                  className="flex items-center gap-3 text-slate-600 hover:text-orange-600 transition-colors"
                >
                  <Phone size={16} className="text-orange-500" aria-hidden="true" />
                  {footer.phone}
                </a>
                <div className="flex items-start gap-3 text-slate-600">
                  <MapPin size={16} className="text-orange-500 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{footer.address}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2">
                {footer.social.linkedin && (
                  <a
                    href={footer.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-orange-200 hover:text-orange-600 hover:shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} aria-hidden="true" />
                  </a>
                )}
                {footer.social.twitter && (
                  <a
                    href={footer.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-orange-200 hover:text-orange-600 hover:shadow-sm"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} aria-hidden="true" />
                  </a>
                )}
                {footer.social.facebook && (
                  <a
                    href={footer.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-orange-200 hover:text-orange-600 hover:shadow-sm"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {footer.columns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-slate-400 mb-5">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 text-sm font-montserrat text-slate-600 hover:text-orange-600 transition-colors"
                        >
                          {link.name}
                          <ArrowUpRight
                            size={14}
                            className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
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
        </div>

        <AnimatedDivider className="my-10" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-slate-500 font-montserrat">
          <p>
            &copy; {new Date().getFullYear()} {footer.brandName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-orange-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-orange-600 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
