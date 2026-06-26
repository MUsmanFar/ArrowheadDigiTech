'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteSection } from '@/lib/use-site-content';

export default function FooterPreview() {
  const { section: footer } = useSiteSection('site.footer');

  return (
    <section className="relative py-20 md:py-24 bg-white border-t border-slate-100" aria-label="Footer preview">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] bg-[#fafafa] border border-slate-100 p-10 md:p-14 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.08)]"
        >
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-2xl font-bold font-poppins text-slate-900">{footer.brandName}</p>
              <p className="mt-3 text-sm text-slate-500 font-montserrat leading-relaxed max-w-xs">
                {footer.tagline}
              </p>
              <div className="mt-6 space-y-1 text-sm font-montserrat text-slate-600">
                <p>{footer.email}</p>
                <p>{footer.phone}</p>
              </div>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-3 gap-8">
              {footer.columns.map((col) => (
                <div key={col.title}>
                  <p className="text-xs font-montserrat font-semibold uppercase tracking-widest text-slate-400 mb-4">
                    {col.title}
                  </p>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm font-montserrat text-slate-600 hover:text-orange-600 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
