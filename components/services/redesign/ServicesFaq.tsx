'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import { SectionHeading, GlassCard } from '@/components/design-system';

type Faq = {
  id: string;
  question: string;
  answer: string;
};

export default function ServicesFaq() {
  const { section: faqPage } = useSiteSection('faq.page');
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/public/faqs')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data.slice(0, 6));
          setOpenId(data[0]?.id ?? null);
        }
      })
      .catch(() => {});
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section className="section-shell bg-white" aria-label="Frequently asked questions">
      <div className="container-premium max-w-4xl">
        <SectionHeading
          badge={faqPage.heroTitle}
          title={`${faqPage.heroTitle} ${faqPage.heroTitleAccent}`.trim()}
          description={faqPage.heroDescription}
          align="center"
          className="mx-auto mb-12"
        />

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <GlassCard key={faq.id} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-semibold font-poppins text-slate-900">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="shrink-0 text-orange-500" size={18} aria-hidden="true" />
                  ) : (
                    <Plus className="shrink-0 text-slate-400" size={18} aria-hidden="true" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm md:text-base text-slate-500 font-montserrat leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
