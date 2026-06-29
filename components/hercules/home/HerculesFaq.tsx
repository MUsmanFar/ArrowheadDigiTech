'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import HerculesButton from '../ui/HerculesButton';
import GlassCard from '../ui/GlassCard';
import SectionHeader from '../ui/SectionHeader';
import { cn } from '@/lib/utils';

type Faq = { id: string; question: string; answer: string; category?: string };

export default function HerculesFaq() {
  const { section: page } = useSiteSection('faq.page');
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/public/faqs')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setFaqs(data.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  if (!faqs.length) return null;

  return (
    <section className="hercules-section bg-white relative overflow-hidden" aria-label="FAQ">
      <div className="pointer-events-none absolute -right-20 bottom-0 hidden h-80 w-80 rounded-full bg-blue-100/25 blur-[100px] lg:block" aria-hidden="true" />

      <div className="container-premium relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="FAQ"
              title={`${page.heroTitle} ${page.heroTitleAccent}`}
              description={page.heroDescription}
            />
            <GlassCard soft padding="lg" className="mt-10">
              <p className="font-poppins text-xl font-bold text-slate-900">{page.ctaTitle}</p>
              <p className="mt-3 font-montserrat text-sm leading-relaxed text-slate-500">{page.ctaDescription}</p>
              <div className="mt-6">
                <HerculesButton href={page.ctaButtonHref} variant="primary">
                  {page.ctaButtonLabel}
                </HerculesButton>
              </div>
            </GlassCard>

            <div className="relative mx-auto mt-12 hidden max-w-[200px] lg:block" aria-hidden="true">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative aspect-square"
              >
                <div className="absolute inset-0 rounded-3xl border border-white/80 bg-gradient-to-br from-white/90 to-blue-50/50 shadow-[0_32px_80px_-30px_rgba(43,110,242,0.2)] backdrop-blur-xl" />
                <div className="absolute inset-[15%] rounded-2xl bg-gradient-to-br from-[#2b6ef2]/20 to-orange-200/30" />
              </motion.div>
            </div>
          </div>

          <div className="space-y-3 lg:col-span-8">
            {faqs.map((faq, i) => {
              const open = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard soft className="overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_60px_-24px_rgba(15,23,42,0.12)]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
                      onClick={() => setOpenId(open ? null : faq.id)}
                      aria-expanded={open}
                    >
                      <span className="font-poppins text-base font-semibold text-slate-900 md:text-lg">
                        {faq.question}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white">
                        <ChevronDown
                          size={18}
                          className={cn('text-slate-400 transition-transform duration-300', open && 'rotate-180')}
                        />
                      </span>
                    </button>
                    <div
                      className={cn(
                        'grid transition-all duration-300 ease-out',
                        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-slate-100 px-7 pb-6 pt-4 font-montserrat text-sm leading-[1.8] text-slate-500 md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
