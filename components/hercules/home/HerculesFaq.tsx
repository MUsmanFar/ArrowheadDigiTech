'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
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
        if (Array.isArray(data)) {
          const firstSix = data.slice(0, 6);
          setFaqs(firstSix);
          if (firstSix.length > 0) setOpenId(firstSix[0].id);
        }
      })
      .catch(() => {});
  }, []);

  if (!faqs.length) return null;

  return (
    <section className="hercules-section relative overflow-hidden bg-[#fafafa] py-24 md:py-32" aria-label="FAQ">
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[800px] w-[800px] rounded-full bg-blue-100/40 blur-[150px] lg:block" aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-orange-100/30 blur-[120px]" aria-hidden="true" />

      <div className="container-premium relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <SectionHeader
                eyebrow="FAQ"
                title={`${page.heroTitle} ${page.heroTitleAccent}`}
                description={page.heroDescription}
              />
              
              <div className="mt-12 hidden lg:block">
                <GlassCard padding="lg" className="bg-white/80 backdrop-blur-2xl border-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-gradient-to-br from-orange-200/50 to-blue-200/50 blur-2xl" />
                  
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 border border-orange-100 text-[#e46f1e]">
                      <MessageCircleQuestion size={28} />
                    </div>
                    <p className="font-inter text-2xl tracking-tight font-extrabold text-slate-900">{page.ctaTitle}</p>
                    <p className="mt-4 font-inter text-base leading-[1.8] text-slate-500">{page.ctaDescription}</p>
                    <div className="mt-8">
                      <HerculesButton href={page.ctaButtonHref} variant="primary" size="lg" className="w-full justify-center">
                        {page.ctaButtonLabel}
                      </HerculesButton>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col space-y-4">
              {faqs.map((faq, i) => {
                const open = openId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div 
                      className={cn(
                        "rounded-[1.5rem] border transition-all duration-500 overflow-hidden",
                        open ? "bg-white border-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.1)]" : "bg-white/40 border-slate-200/60 hover:bg-white/70 hover:border-slate-200"
                      )}
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-6 p-6 md:p-8 text-left"
                        onClick={() => setOpenId(open ? null : faq.id)}
                        aria-expanded={open}
                      >
                        <span className={cn(
                          "font-inter text-lg md:text-xl font-bold transition-colors duration-300 pr-8",
                          open ? "text-[#e46f1e]" : "text-slate-900"
                        )}>
                          {faq.question}
                        </span>
                        <span className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500",
                          open ? "bg-[#e46f1e] text-white rotate-180 shadow-md" : "bg-slate-100 text-slate-400"
                        )}>
                          <ChevronDown size={20} />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-6 pb-8 md:px-8 md:pb-10 pt-0">
                              <p className="font-inter text-base leading-[1.8] text-slate-500 md:text-lg">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <div className="mt-12 block lg:hidden">
              <GlassCard padding="lg" className="bg-white/80 border-white shadow-xl text-center">
                <p className="font-inter text-xl tracking-tight font-extrabold text-slate-900">{page.ctaTitle}</p>
                <p className="mt-3 font-inter text-sm leading-relaxed text-slate-500">{page.ctaDescription}</p>
                <div className="mt-8">
                  <HerculesButton href={page.ctaButtonHref} variant="primary" size="lg" className="w-full justify-center">
                    {page.ctaButtonLabel}
                  </HerculesButton>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
