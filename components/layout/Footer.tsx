'use client';

import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';

export default function Footer() {
  const { section: footer } = useSiteSection('site.footer');

  return (
    <footer className="border-t border-slate-200 bg-white" aria-label="Site footer">
      <div className="container-premium py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e46f1e] to-[#f59e42] text-sm font-bold text-white">
                ▲
              </span>
              <span className="font-poppins text-xl font-bold text-slate-900">{footer.brandName}</span>
            </Link>
            <p className="mt-4 max-w-sm font-montserrat text-sm leading-relaxed text-slate-500">
              {footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {footer.social.linkedin && (
                <a href={footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-orange-200 hover:text-[#e46f1e]" aria-label="LinkedIn">
                  <Linkedin size={16} />
                </a>
              )}
              {footer.social.twitter && (
                <a href={footer.social.twitter} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-orange-200 hover:text-[#e46f1e]" aria-label="Twitter">
                  <Twitter size={16} />
                </a>
              )}
              {footer.social.facebook && (
                <a href={footer.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-orange-200 hover:text-[#e46f1e]" aria-label="Facebook">
                  <Facebook size={16} />
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="font-montserrat text-sm text-slate-600 transition-colors hover:text-[#e46f1e]">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-montserrat text-sm text-slate-500">
            © {new Date().getFullYear()} {footer.brandName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 font-montserrat text-sm text-slate-500">
            <Link href="/privacy-policy" className="hover:text-slate-900">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-900">Terms</Link>
            <Link href="/contact" className="hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
