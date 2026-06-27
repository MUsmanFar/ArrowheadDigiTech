'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Linkedin, Mail, MapPin, Phone, Twitter, Facebook } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

export default function FooterPreview() {
  const { section: footer } = useSiteSection('site.footer');
  const { section: blogPage } = useSiteSection('blog.page');

  return (
    <SectionBackdrop theme="footer-dark" topFade className="py-24 md:py-32">
      <section aria-label="Footer preview">
        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-[1]"
          >
            <div className="mb-16 flex flex-col gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E46F1E] to-[#f59e42] text-sm font-bold text-white">
                    ▲
                  </span>
                  <p className="text-2xl font-bold font-poppins text-white">{footer.brandName}</p>
                </div>
                <p className="mt-4 max-w-md text-sm font-montserrat leading-relaxed text-slate-400">
                  {footer.tagline}
                </p>
              </div>
              <div className="w-full max-w-md">
                <p className="mb-3 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {blogPage.newsletterTitle}
                </p>
                <div className="figma-glass flex flex-col gap-2 rounded-2xl p-2 sm:flex-row">
                  <input
                    type="email"
                    readOnly
                    placeholder="you@company.com"
                    className="flex-1 rounded-xl bg-transparent px-4 py-3 text-sm font-montserrat text-slate-300 placeholder:text-slate-500"
                    aria-label="Newsletter email"
                  />
                  <span className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#E46F1E] to-[#f59e42] px-6 py-3 text-sm font-semibold font-montserrat text-white">
                    {blogPage.newsletterButtonLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="space-y-3 text-sm font-montserrat text-slate-400">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#E46F1E]" aria-hidden="true" />
                    {footer.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#E46F1E]" aria-hidden="true" />
                    {footer.phone}
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E46F1E]" aria-hidden="true" />
                    {footer.address}
                  </p>
                </div>
                <div className="mt-6 flex gap-2">
                  {footer.social.linkedin && (
                    <a href={footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="figma-glass flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-white" aria-label="LinkedIn">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {footer.social.twitter && (
                    <a href={footer.social.twitter} target="_blank" rel="noopener noreferrer" className="figma-glass flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-white" aria-label="Twitter">
                      <Twitter size={16} />
                    </a>
                  )}
                  {footer.social.facebook && (
                    <a href={footer.social.facebook} target="_blank" rel="noopener noreferrer" className="figma-glass flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-white" aria-label="Facebook">
                      <Facebook size={16} />
                    </a>
                  )}
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
                {footer.columns.map((col) => (
                  <div key={col.title}>
                    <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {col.title}
                    </p>
                    <ul className="space-y-2.5">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group inline-flex items-center gap-1 text-sm font-montserrat text-slate-400 transition-colors hover:text-white"
                          >
                            {link.name}
                            <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <p
            className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(3rem,12vw,8rem)] font-bold font-poppins leading-none text-white/[0.03]"
            aria-hidden="true"
          >
            {footer.brandName}
          </p>
        </div>
      </section>
    </SectionBackdrop>
  );
}
