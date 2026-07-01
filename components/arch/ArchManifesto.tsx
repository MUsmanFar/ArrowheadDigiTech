'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function useCountUp(target: number, duration = 1.5, started = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / (duration * 1000), 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return v;
}

/* ─── glass stat card ─────────────────────────────────────────── */
function StatCard({ num, suffix, label, color, delay, started }: {
  num: number; suffix: string; label: string; color: string; delay: number; started: boolean;
}) {
  const count = useCountUp(num, 1.3, started);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className="group relative overflow-hidden rounded-2xl border border-[rgba(15,20,30,0.07)] bg-white/80 p-5 backdrop-blur-sm transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(15,23,42,0.1)]"
      style={{ boxShadow: '0 4px 20px -6px rgba(15,23,42,0.07),inset 0 1px 0 rgba(255,255,255,0.9)' }}
    >
      {/* Per-card ambient glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 0%,${color}10,transparent 65%)` }} />
      {/* Bottom accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: delay + 0.2 }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
        style={{ background: `linear-gradient(to right,${color},transparent)` }}
        aria-hidden="true" />
      <span className="block font-inter text-[2.1rem] font-extrabold leading-none text-[#0d1117]"
        style={{ letterSpacing: '-0.04em' }}>{count}{suffix}</span>
      <span className="mt-1.5 block font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(15,20,30,0.37)]">{label}</span>
    </motion.div>
  );
}

/* ─── principle line ──────────────────────────────────────────── */
function PrincipleLine({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className="group flex cursor-default items-center gap-5 border-b border-[rgba(15,20,30,0.055)] py-5 first:border-t md:py-6"
    >
      <span className="hidden w-6 shrink-0 font-inter text-[10px] font-bold tabular-nums text-[rgba(15,20,30,0.2)] sm:block">
        {String(index + 1).padStart(2, '0')}
      </span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 + 0.12 }}
        className="h-px w-7 shrink-0 origin-left bg-[#e46f1e] opacity-55 transition-all duration-300 group-hover:w-11 group-hover:opacity-100"
        aria-hidden="true" />
      <p className="font-inter text-base font-semibold leading-snug tracking-tight text-[#374151] transition-colors duration-300 group-hover:text-[#0d1117] md:text-[1.05rem]">
        {text}
      </p>
      <ArrowRight size={13} className="ml-auto shrink-0 text-transparent transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#e46f1e]" />
    </motion.div>
  );
}

export default function ArchManifesto() {
  const { section: hero } = useSiteSection('about.hero');
  const { section: manifesto } = useSiteSection('about.manifesto');
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fallback = ['We build software that outlasts trends','Engineering precision over surface aesthetics','Long-term partnerships, not one-off deliveries','Every product ships production-ready','Your growth is the only metric that matters'];
  const principles = manifesto.items.length >= 3 ? manifesto.items.slice(0, 5).map(i => i.title) : fallback;
  const STAT_COLORS = ['#e46f1e', '#2b6ef2', '#059669', '#7c3aed'];

  return (
    <section ref={sectionRef} className="relative overflow-hidden" aria-label="Our philosophy"
      style={{ background: 'linear-gradient(180deg,rgba(249,247,244,0.95) 0%,rgba(255,255,255,0.98) 100%)' }}>
      {/* Decorative geometric – top right */}
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 opacity-[0.035]" aria-hidden="true">
        <svg viewBox="0 0 288 288" fill="none" className="h-full w-full">
          <circle cx="144" cy="144" r="140" stroke="#e46f1e" strokeWidth="1" strokeDasharray="4 8"/>
          <circle cx="144" cy="144" r="100" stroke="#2b6ef2" strokeWidth="0.75" strokeDasharray="3 6"/>
          <circle cx="144" cy="144" r="60" stroke="#e46f1e" strokeWidth="0.75"/>
          <line x1="4" y1="144" x2="284" y2="144" stroke="#0d1117" strokeWidth="0.5" opacity="0.4"/>
          <line x1="144" y1="4" x2="144" y2="284" stroke="#0d1117" strokeWidth="0.5" opacity="0.4"/>
        </svg>
      </div>

      {/* Warm glow right side */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[40vh] w-[25vw] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(228,111,30,0.06),transparent 70%)', filter: 'blur(50px)' }} aria-hidden="true" />

      <div className="arch-container relative z-10 py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-12">

          {/* Left sticky column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <p className="arch-eyebrow mb-4">Who We Are</p>
              <h2 className="font-inter font-extrabold text-[#0d1117]"
                style={{ fontSize: 'clamp(1.75rem,3vw,2.85rem)', lineHeight: 1.07, letterSpacing: '-0.03em' }}>
                {hero.headline || 'A studio built for ambition'}
              </h2>
              <p className="mt-4 font-inter text-[14.5px] leading-[1.8] text-[#6b7280]">
                {hero.subheadline || 'We partner with founders and enterprises to design, build, and scale digital products.'}
              </p>
              <Link href="/about"
                className="group mt-7 inline-flex items-center gap-2 font-inter text-[13px] font-semibold text-[#0d1117] transition-colors hover:text-[#e46f1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2">
                Our story <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Glass stat cards */}
            <div ref={statsRef} className="mt-10 grid grid-cols-2 gap-2.5">
              <StatCard num={50}  suffix="+" label="Products"   color="#e46f1e" delay={0.1} started={statsStarted} />
              <StatCard num={7}   suffix="+" label="Years"      color="#2b6ef2" delay={0.18} started={statsStarted} />
              <StatCard num={12}  suffix="+" label="Industries" color="#059669" delay={0.26} started={statsStarted} />
              <StatCard num={100} suffix="%" label="Committed"  color="#7c3aed" delay={0.34} started={statsStarted} />
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-8">
            {/* Pull-quote card with glass finish */}
            <motion.blockquote
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative mb-10 overflow-hidden rounded-2xl border border-[rgba(228,111,30,0.12)] p-8 md:p-10"
              style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 8px 32px -8px rgba(15,23,42,0.07),inset 0 1px 0 rgba(255,255,255,0.9)' }}>
              {/* Decorative oversize quote */}
              <div className="pointer-events-none absolute right-5 top-3 font-inter text-[6rem] font-black leading-none text-[#e46f1e] opacity-[0.065] select-none" aria-hidden="true">&ldquo;</div>
              {/* Left accent */}
              <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-gradient-to-b from-[#e46f1e] to-[#f59e42]" aria-hidden="true" />
              {/* Shine sweep */}
              <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[1200ms] hover:translate-x-full" aria-hidden="true" />
              <p className="relative font-inter font-semibold leading-[1.45] text-[#1c2333]"
                style={{ fontSize: 'clamp(1rem,1.7vw,1.4rem)', letterSpacing: '-0.016em' }}>
                {manifesto.items[0]?.content || 'We believe the best technology is invisible — it simply works, scales, and creates value without friction. That is what we build.'}
              </p>
            </motion.blockquote>

            <div>
              {principles.map((p, i) => <PrincipleLine key={p} text={p} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
