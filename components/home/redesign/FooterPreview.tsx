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
    <SectionBackdrop variant="silver" className="border-t border-[#E5E7EB]/80 py-20 md:py-28">
      <section aria-label="Footer preview">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="home-glass overflow-hidden rounded-[2.5rem] p-10 md:p-14 lg:p-16"
          >
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E46F1E] to-[#f59e42] text-sm font-bold text-white">
                    ▲
                  </span>
                  <p className="text-2xl font-bold font-poppins text-[#111827]">{footer.brandName}</p>
                </div>
                <p className="mt-4 max-w-sm text-sm font-montserrat leading-relaxed text-slate-500">
                  {footer.tagline}
                </p>
                <div className="mt-6 space-y-2 text-sm font-montserrat text-slate-600">
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
                    <a href={footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-slate-500 transition-colors hover:border-[#E46F1E]/30 hover:text-[#E46F1E]" aria-label="LinkedIn">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {footer.social.twitter && (
                    <a href={footer.social.twitter} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-slate-500 transition-colors hover:border-[#E46F1E]/30 hover:text-[#E46F1E]" aria-label="Twitter">
                      <Twitter size={16} />
                    </a>
                  )}
                  {footer.social.facebook && (
                    <a href={footer.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-slate-500 transition-colors hover:border-[#E46F1E]/30 hover:text-[#E46F1E]" aria-label="Facebook">
                      <Facebook size={16} />
                    </a>
                  )}
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
                {footer.columns.map((col) => (
                  <div key={col.title}>
                    <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {col.title}
                    </p>
                    <ul className="space-y-2.5">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group inline-flex items-center gap-1 text-sm font-montserrat text-slate-600 transition-colors hover:text-[#E46F1E]"
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

              <div className="lg:col-span-3">
                <p className="mb-3 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {blogPage.newsletterTitle}
                </p>
                <p className="text-sm font-montserrat text-slate-500">{blogPage.newsletterDescription}</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    readOnly
                    placeholder="you@company.com"
                    className="flex-1 rounded-xl border border-[#E5E7EB] bg-white/80 px-4 py-3 text-sm font-montserrat text-slate-600"
                    aria-label="Newsletter email"
                  />
                  <span className="inline-flex items-center justify-center rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold font-montserrat text-white">
                    {blogPage.newsletterButtonLabel}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
