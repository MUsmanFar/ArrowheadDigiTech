'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, TrendingUp, Globe, Cpu, BarChart2, Shield, Zap, Search } from 'lucide-react';
import type { HeroContent } from '@/lib/site-content';
import { getSchedulingUrl } from '@/lib/scheduling';

/* ─── count-up ──────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1.6, start = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / (duration * 1000), 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return v;
}

/* ─── SVG connection lines + animateMotion travelling dots ──────
   Uses native SVG <animateMotion> for cross-browser dot travel.
   Each line draws in via a CSS strokeDasharray reveal, then a
   glowing dot loops along the path perpetually.
─────────────────────────────────────────────────────────────────*/
type NodePos = { x: number; y: number };

function ConnectionLines({ nodes, center, visible }: {
  nodes: NodePos[]; center: NodePos; visible: boolean;
}) {
  // Container is 400×380 viewBox (matches the SVG below)
  const VW = 400; const VH = 380;
  const cx = (center.x / 100) * VW;
  const cy = (center.y / 100) * VH;

  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-dot" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {nodes.map((node, i) => {
        const nx = (node.x / 100) * VW;
        const ny = (node.y / 100) * VH;
        const color = i % 2 === 0 ? '#e46f1e' : '#2b6ef2';
        // Path string for this line
        const d = `M ${cx} ${cy} L ${nx} ${ny}`;
        // Approximate line length for stroke dash trick
        const len = Math.hypot(nx - cx, ny - cy);
        const lineDelay = `${0.5 + i * 0.15}s`;
        const dotDelay  = `${1.4 + i * 0.35}s`;

        return (
          <g key={i} filter="url(#glow-line)">
            {/* The line — draws in via stroke-dashoffset animation */}
            <line
              x1={cx} y1={cy} x2={nx} y2={ny}
              stroke={color}
              strokeWidth="0.8"
              strokeOpacity={visible ? 0.55 : 0}
              strokeDasharray={`${len} ${len}`}
              strokeDashoffset={visible ? 0 : len}
              style={{
                transition: visible
                  ? `stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1) ${lineDelay}, stroke-opacity 0.4s ease ${lineDelay}`
                  : 'none',
              }}
            />

            {/* Travelling dot — native SVG animateMotion (cross-browser) */}
            {visible && (
              <circle r="2.8" fill={color} filter="url(#glow-dot)" opacity="0.9">
                <animateMotion
                  path={d}
                  dur="2.8s"
                  begin={dotDelay}
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  keyTimes="0;0.08;0.88;1"
                  dur="2.8s"
                  begin={dotDelay}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── service node positions & meta ─────────────────────────── */
const NODES = [
  { icon: Globe,     label: 'Web & Mobile',    color: '#e46f1e', x: '50%', y: '8%',  px: 50, py: 8  },
  { icon: Cpu,       label: 'AI Solutions',    color: '#2b6ef2', x: '88%', y: '30%', px: 88, py: 30 },
  { icon: BarChart2, label: 'Analytics',       color: '#059669', x: '84%', y: '68%', px: 84, py: 68 },
  { icon: Shield,    label: 'Enterprise SaaS', color: '#7c3aed', x: '50%', y: '88%', px: 50, py: 88 },
  { icon: Zap,       label: 'Automation',      color: '#e46f1e', x: '12%', y: '68%', px: 12, py: 68 },
  { icon: Search,    label: 'SEO & Growth',    color: '#0891b2', x: '16%', y: '30%', px: 16, py: 30 },
];
const CENTER = { x: 50, y: 50 };

/* ─── browser chrome frame ───────────────────────────────────── */
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-[rgba(15,20,30,0.1)] bg-white shadow-[0_40px_100px_-20px_rgba(15,23,42,0.22),0_0_0_1px_rgba(255,255,255,0.8)]">
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-[rgba(15,20,30,0.07)] bg-[#f5f4f2] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 rounded-md bg-white/80 px-3 py-1 text-center">
          <span className="font-inter text-[10px] text-[rgba(15,20,30,0.4)]">arrowheaddigitech.com/dashboard</span>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─── operations center visual ───────────────────────────────── */
function OperationsCenter({ mouseX, mouseY, visible }: { mouseX: any; mouseY: any; visible: boolean }) {
  const pX  = useTransform(mouseX, [-1, 1], ['-10px', '10px']);
  const pY  = useTransform(mouseY, [-1, 1], ['-8px',  '8px']);
  const pX2 = useTransform(mouseX, [-1, 1], ['8px', '-8px']);
  const pY2 = useTransform(mouseY, [-1, 1], ['6px', '-6px']);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.93, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      className="relative select-none" aria-hidden="true">

      <BrowserFrame>
        <div className="relative bg-[#fafaf9] p-1" style={{ height: 380 }}>

          {/* Ambient lighting orb behind ecosystem */}
          <div className="absolute inset-0 overflow-hidden rounded-b-[1.2rem]">
            <div className="absolute left-1/2 top-1/2 h-[50vw] w-[50vw] max-h-80 max-w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle,rgba(228,111,30,0.09) 0%,rgba(43,110,242,0.07) 40%,transparent 70%)', filter: 'blur(40px)' }} />
          </div>

          {/* Connection lines layer */}
          <ConnectionLines nodes={NODES.map(n => ({ x: n.px, y: n.py }))} center={CENTER} visible={visible} />

          {/* SVG orbit rings */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 380">
            <circle cx="200" cy="190" r="150" fill="none" stroke="rgba(15,20,30,0.045)" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="200" cy="190" r="100" fill="none" stroke="rgba(228,111,30,0.10)" strokeWidth="0.75" />
            <circle cx="200" cy="190" r="52"  fill="none" stroke="rgba(43,110,242,0.09)" strokeWidth="0.75" />
          </svg>

          {/* Central brand mark */}
          <motion.div style={{ x: pX, y: pY }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <motion.div animate={{ rotate: [0, 360] }}
              transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-6 rounded-full border border-dashed border-[rgba(228,111,30,0.18)]" />
            <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-[rgba(228,111,30,0.25)] bg-white shadow-[0_16px_48px_-12px_rgba(228,111,30,0.3),0_0_0_1px_rgba(255,255,255,0.9),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl">
              <div className="absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(circle at 35% 25%,rgba(228,111,30,0.15),transparent 55%)' }} />
              <svg viewBox="0 0 48 48" fill="none" className="relative z-10 h-9 w-9">
                <path d="M24 4 L44 24 L24 44 L18 38 L32 24 L18 10 Z" fill="url(#cg1)" />
                <path d="M4 24 L10 17 L18 24 L10 31 Z" fill="#0d1117" opacity="0.6" />
                <defs><linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e46f1e" /><stop offset="100%" stopColor="#f59e42" />
                </linearGradient></defs>
              </svg>
            </div>
          </motion.div>

          {/* Service nodes */}
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const pan = i % 2 === 0 ? pX : pX2;
            const panY = i % 2 === 0 ? pY : pY2;
            return (
              <motion.div key={node.label}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', left: node.x, top: node.y, x: pan, y: panY, transform: 'translate(-50%,-50%)', zIndex: 10 }}>
                <motion.div animate={{ y: [0, i % 2 === 0 ? -5 : -7, 0] }}
                  transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  className="group">
                  <div className="flex items-center gap-2 rounded-xl border border-white/95 px-3 py-2 shadow-[0_8px_28px_-8px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.88)', boxShadow: `0 8px 28px -8px ${node.color}20, 0 2px 0 rgba(255,255,255,0.9) inset` }}>
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg"
                      style={{ background: `${node.color}15` }}>
                      <Icon size={12} style={{ color: node.color }} />
                    </div>
                    <span className="font-inter text-[10px] font-semibold text-[#1c2333]">{node.label}</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Floating metric chips */}
          <motion.div style={{ x: pX2, y: pY2 }}
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-4 right-4 z-20">
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-xl border border-white/90 px-3.5 py-2.5 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.14)] backdrop-blur-xl"
              style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 12px 32px -8px rgba(5,150,105,0.15), inset 0 1px 0 rgba(255,255,255,0.95)' }}>
              <p className="font-inter text-[9px] font-semibold uppercase tracking-[0.18em] text-[rgba(15,20,30,0.38)]">Conversion Rate</p>
              <div className="mt-0.5 flex items-end gap-1.5">
                <span className="font-inter text-lg font-extrabold leading-none text-[#0d1117]">+34%</span>
                <span className="mb-0.5 flex items-center gap-0.5 font-inter text-[9px] font-semibold text-emerald-500">
                  <TrendingUp size={9} />MoM
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={{ x: pX, y: pY }}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-4 top-4 z-20">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="rounded-xl border border-white/90 px-3.5 py-2.5 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.14)] backdrop-blur-xl"
              style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 12px 32px -8px rgba(228,111,30,0.12), inset 0 1px 0 rgba(255,255,255,0.95)' }}>
              <p className="font-inter text-[9px] font-semibold uppercase tracking-[0.18em] text-[rgba(15,20,30,0.38)]">Active Clients</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="font-inter text-lg font-extrabold leading-none text-[#0d1117]">50+</span>
                <div className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-40" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </BrowserFrame>

      {/* Reflection / shadow below frame */}
      <div className="mx-6 h-4 rounded-b-full"
        style={{ background: 'linear-gradient(to bottom,rgba(15,23,42,0.06),transparent)', filter: 'blur(8px)' }} />
    </motion.div>
  );
}

/* ─── marquee ────────────────────────────────────────────────── */
const MW = ['Enterprise Software','·','AI Solutions','·','Web & Mobile','·','SaaS Products','·','CRM Systems','·','Automation','·','SEO & Marketing','·'];
function MarqueeBand({ reverse = false }: { reverse?: boolean }) {
  const t = [...MW, ...MW];
  return (
    <div className="overflow-hidden whitespace-nowrap" aria-hidden="true">
      <div className="inline-flex gap-8"
        style={{ animation: `arch-marquee ${reverse ? '54s' : '46s'} linear infinite${reverse ? ' reverse' : ''}`, willChange: 'transform' }}>
        {t.map((w, i) => (
          <span key={i} className="font-inter text-[10px] font-semibold uppercase tracking-[0.26em]"
            style={{ color: w === '·' ? '#e46f1e' : 'rgba(15,20,30,0.24)' }}>{w}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── stat pill ──────────────────────────────────────────────── */
function StatPill({ value, suffix, label, delay, started }: { value: number; suffix: string; label: string; delay: number; started: boolean }) {
  const count = useCountUp(value, 1.5, started);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col">
      <span className="font-inter text-[1.85rem] font-extrabold leading-none tracking-tight text-[#0d1117]">{count}{suffix}</span>
      <span className="mt-1.5 font-inter text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[rgba(15,20,30,0.37)]">{label}</span>
    </motion.div>
  );
}

/* ─── main export ────────────────────────────────────────────── */
export default function ArchHero({ hero }: { hero: HeroContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [ecosystemVisible, setEcosystemVisible] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 32, damping: 22 });
  const mouseY = useSpring(rawY, { stiffness: 32, damping: 22 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [rawX, rawY]);

  useEffect(() => {
    const t = setTimeout(() => setEcosystemVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const primaryHref = hero.primaryCta?.external ? getSchedulingUrl('hero') : (hero.primaryCta?.href || getSchedulingUrl('hero'));
  const subheadline = hero.subheadline || 'We design, build, and scale enterprise software, AI systems, and digital products for ambitious businesses.';

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#fafaf9]" aria-label="Hero"
      style={{ minHeight: '100svh' }}>

      {/* ── Deep background layers ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Fine dot grid */}
        <div className="absolute inset-0 opacity-50"
          style={{ backgroundImage: 'radial-gradient(circle,rgba(15,20,30,0.065) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Warm top-left bloom */}
        <div className="absolute -left-[10%] -top-[10%] h-[65vw] w-[65vw] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(228,111,30,0.14) 0%,rgba(245,158,66,0.07) 40%,transparent 68%)', filter: 'blur(55px)' }} />
        {/* Cool bottom-right bloom */}
        <div className="absolute -bottom-[15%] -right-[8%] h-[55vw] w-[55vw] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(43,110,242,0.11) 0%,transparent 65%)', filter: 'blur(65px)' }} />
        {/* Mid accent purple bloom */}
        <div className="absolute top-[40%] left-[30%] h-[35vw] w-[35vw] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.06) 0%,transparent 70%)', filter: 'blur(50px)' }} />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.025] mix-blend-multiply"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        {/* Top gradient fade */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 to-transparent" />
      </div>

      <div className="arch-container relative z-20 flex flex-col justify-center pb-20 pt-24 md:pt-28"
        style={{ minHeight: '100svh' }}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">

          {/* ── Left copy ── */}
          <div className="lg:col-span-5 xl:col-span-5">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[rgba(228,111,30,0.2)] bg-[rgba(228,111,30,0.08)] px-4 py-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e46f1e] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#e46f1e]" />
              </span>
              <span className="font-inter text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#c45a12]">
                {hero.badge || 'Enterprise Digital Studio'}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
              <h1 className="font-inter font-extrabold text-[#0d1117]"
                style={{ fontSize: 'clamp(2rem, 4.4vw, 3.85rem)', lineHeight: 1.07, letterSpacing: '-0.035em' }}>
                Transform Ideas Into
                <br />
                <span style={{ background: 'linear-gradient(125deg,#e46f1e 0%,#f59e42 50%,#e46f1e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundSize: '200% auto', animation: 'arch-shimmer 4s linear infinite' }}>
                  Digital Growth.
                </span>
              </h1>
              <p className="mt-2.5 font-inter font-medium text-[#6b7280]"
                style={{ fontSize: 'clamp(0.95rem,1.4vw,1.1rem)', lineHeight: 1.5 }}>
                Websites, Software & AI Systems Built for Scale.
              </p>
            </motion.div>

            {/* Subheading */}
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="mt-5 font-inter leading-[1.75] text-[#6b7280]"
              style={{ fontSize: 'clamp(0.9rem,1.1vw,1rem)', maxWidth: '34em' }}>
              {subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={primaryHref}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#e46f1e] px-7 py-3.5 font-inter text-[13.5px] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(228,111,30,0.52),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(228,111,30,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
                <span className="relative">{hero.primaryCta?.label || 'Start a Project'}</span>
                <ArrowUpRight size={14} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              {hero.secondaryCta && (
                <Link href={hero.secondaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-[rgba(15,20,30,0.12)] bg-white/70 px-7 py-3.5 font-inter text-[13.5px] font-semibold text-[#374151] shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:border-[rgba(15,20,30,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2">
                  {hero.secondaryCta.label}
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </motion.div>

            {/* Social proof */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.58, duration: 0.7 }}
              className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-1.5">
                {['#e46f1e','#2b6ef2','#059669','#7c3aed'].map((c, i) => (
                  <div key={i} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white shadow-sm"
                    style={{ background: c, zIndex: 4 - i }}>{['A','B','C','D'][i]}</div>
                ))}
              </div>
              <p className="font-inter text-[11.5px] text-[rgba(15,20,30,0.45)]">
                Trusted by <strong className="text-[#0d1117]">50+ businesses</strong> across 12 industries
              </p>
            </motion.div>
          </div>

          {/* ── Right: dashboard visual ── */}
          <div className="lg:col-span-7 xl:col-span-7">
            <OperationsCenter mouseX={mouseX} mouseY={mouseY} visible={ecosystemVisible} />
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div ref={statsRef}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="mt-12 grid grid-cols-2 gap-5 border-t border-[rgba(15,20,30,0.07)] pt-8 sm:grid-cols-4 md:mt-14">
            <StatPill value={50} suffix="+" label="Products Shipped" delay={0.6}  started={statsStarted} />
            <StatPill value={7}  suffix="+" label="Years Experience"  delay={0.7}  started={statsStarted} />
            <StatPill value={12} suffix="+" label="Industries Served" delay={0.8}  started={statsStarted} />
            <StatPill value={98} suffix="%" label="Client Retention"  delay={0.9}  started={statsStarted} />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
