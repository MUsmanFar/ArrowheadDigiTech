'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, X, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import { getSchedulingUrl } from '@/lib/scheduling';

type Faq = { id: string; question: string; answer: string; category?: string };

/* ─── single FAQ item ─────────────────────────────────────────── */
function FaqItem({ faq, index, open, onToggle }: {
  faq: Faq; index: number; open: boolean; onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.06 }}
    >
      <div
        className="group relative overflow-hidden rounded-2xl border transition-all duration-400"
        style={{
          background: open
            ? 'rgba(255,255,255,0.92)'
            : 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderColor: open ? 'rgba(228,111,30,0.22)' : 'rgba(15,20,30,0.08)',
          boxShadow: open
            ? '0 16px 48px -16px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,1)'
            : '0 2px 8px -2px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {/* Active top border glow */}
        <motion.div
          animate={{ scaleX: open ? 1 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-0 h-[2px] origin-left rounded-t-2xl bg-gradient-to-r from-[#e46f1e] to-[#f59e42]"
          aria-hidden="true"
        />

        {/* Ambient glow when open */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-400"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 0% 0%, rgba(228,111,30,0.06), transparent 60%)',
            opacity: open ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* Question button */}
        <button
          type="button"
          onClick={onToggle}
          className="relative flex w-full items-center justify-between gap-6 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e46f1e]"
          aria-expanded={open}
        >
          <span
            className="font-inter text-[15px] font-semibold leading-snug tracking-tight transition-colors duration-300"
            style={{ color: open ? '#0d1117' : '#1c2333' }}
          >
            {faq.question}
          </span>

          {/* Animated plus/X toggle */}
          <motion.div
            animate={{
              rotate: open ? 0 : 0,
              background: open ? '#e46f1e' : 'rgba(15,20,30,0.07)',
              boxShadow: open ? '0 6px 18px -6px rgba(228,111,30,0.45)' : 'none',
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div key="x"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.22 }}>
                  <X size={13} className="text-white" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div key="plus"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.22 }}>
                  <Plus size={13} className="text-[#6b7280]" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-[rgba(15,20,30,0.06)] px-6 pb-5 pt-4">
                <p className="font-inter text-[14px] leading-[1.78] text-[#6b7280]">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── main ───────────────────────────────────────────────────── */
export default function ArchFaq() {
  const { section: page } = useSiteSection('faq.page');
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const bookHref = getSchedulingUrl('faq');

  useEffect(() => {
    fetch('/api/public/faqs')
      .then(r => (r.ok ? r.json() : []))
      .then(data => {
        if (Array.isArray(data)) {
          const first = data.slice(0, 6);
          setFaqs(first);
          if (first.length > 0) setOpenId(first[0].id);
        }
      })
      .catch(() => {});
  }, []);

  if (!faqs.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,rgba(249,247,244,0.97) 0%,rgba(255,255,255,0.99) 100%)' }}
      aria-label="FAQ"
    >
      {/* Dot grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(15,20,30,0.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }}
        aria-hidden="true" />
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-0 bottom-0 h-[40vh] w-[30vw] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(228,111,30,0.06),transparent 70%)', filter: 'blur(55px)' }} aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[35vh] w-[25vw] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(43,110,242,0.05),transparent 70%)', filter: 'blur(50px)' }} aria-hidden="true" />

      <div className="arch-container relative z-10 py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">

          {/* Left sticky column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <p className="arch-eyebrow mb-4">FAQ</p>
                <h2
                  className="font-inter font-extrabold text-[#0d1117]"
                  style={{ fontSize: 'clamp(1.75rem,3vw,2.75rem)', lineHeight: 1.07, letterSpacing: '-0.03em' }}
                >
                  {page.heroTitle} <span className="arch-text-orange">{page.heroTitleAccent}</span>
                </h2>
                <p className="mt-4 font-inter text-[14.5px] leading-[1.8] text-[#6b7280]">
                  {page.heroDescription}
                </p>
              </motion.div>

              {/* CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="mt-10 hidden overflow-hidden rounded-2xl border border-[rgba(228,111,30,0.14)] p-6 lg:block"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 12px 36px -12px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.95)',
                }}
              >
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full"
                  style={{ background: 'radial-gradient(circle,rgba(228,111,30,0.15),transparent 70%)', filter: 'blur(24px)' }} aria-hidden="true" />
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(228,111,30,0.18)] bg-[rgba(228,111,30,0.08)]">
                    <MessageCircle size={22} className="text-[#e46f1e]" aria-hidden="true" />
                  </div>
                  <p className="font-inter text-lg font-extrabold tracking-tight text-[#0d1117]">
                    {page.ctaTitle}
                  </p>
                  <p className="mt-2.5 font-inter text-[13.5px] leading-[1.75] text-[#6b7280]">
                    {page.ctaDescription}
                  </p>
                  <Link
                    href={page.ctaButtonHref || bookHref}
                    className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e46f1e] px-5 py-3 font-inter text-[13.5px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(228,111,30,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c45a12] hover:shadow-[0_12px_32px_-8px_rgba(228,111,30,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2"
                  >
                    {page.ctaButtonLabel}
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* FAQ list */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-2.5">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  index={i}
                  open={openId === faq.id}
                  onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 block lg:hidden">
              <div className="rounded-2xl border border-[rgba(228,111,30,0.14)] p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: '0 8px 28px -8px rgba(15,23,42,0.07)' }}>
                <p className="font-inter text-lg font-extrabold text-[#0d1117]">{page.ctaTitle}</p>
                <p className="mt-2 font-inter text-[13px] text-[#6b7280]">{page.ctaDescription}</p>
                <Link href={page.ctaButtonHref || bookHref}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e46f1e] px-5 py-3 font-inter text-[13.5px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2">
                  {page.ctaButtonLabel}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
