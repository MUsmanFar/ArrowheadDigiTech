'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

export default function WhyChooseUs() {
  const { section: manifesto } = useSiteSection('about.manifesto');
  const { section: trustedBy } = useSiteSection('services.trusted-by');
  const items = manifesto.items.slice(0, 3);

  return (
    <SectionBackdrop variant="silver" className="py-28 md:py-40">
      <section aria-label="Why choose us">
        <div className="container-premium">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
            >
              <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
                {trustedBy.badge}
              </p>
              <h2 className="text-4xl font-bold font-poppins leading-[1.05] tracking-tight text-[#111827] md:text-5xl">
                {manifesto.title}
              </h2>
              <p className="mt-6 text-lg font-montserrat leading-relaxed text-slate-500">
                {trustedBy.headline}
              </p>
            </motion.div>

            <div className="space-y-6 lg:col-span-7">
              {items.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="home-glass group rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E46F1E]/15 to-[#2B6EF2]/10 text-lg font-bold font-poppins text-[#E46F1E]">
                      {item.id}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-poppins text-[#111827] md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 font-montserrat leading-relaxed text-slate-500 md:text-base">
                        {item.content}
                      </p>
                      <div className="mt-6 h-px w-full bg-gradient-to-r from-[#E5E7EB] via-[#E46F1E]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
