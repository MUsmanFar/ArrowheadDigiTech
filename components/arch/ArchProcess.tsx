'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';
import { Search, Lightbulb, Hammer, Rocket, GitBranch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STEP_ICONS: LucideIcon[] = [Search, Lightbulb, GitBranch, Hammer, Rocket];
const STEP_COLORS = ['#e46f1e', '#2b6ef2', '#7c3aed', '#059669', '#e46f1e'];

const DEFAULT_STEPS = [
  { title: 'Discover',  desc: 'We immerse in your business context — goals, constraints, users, market. Nothing generic, everything specific to you.' },
  { title: 'Architect', desc: 'Systems thinking before any code. We design the technical foundation that will carry your product for years.' },
  { title: 'Build',     desc: 'Disciplined engineering in tight sprints. Clean code, CI/CD, visible progress every single week.' },
  { title: 'Refine',    desc: 'User feedback shapes every iteration. We keep sharpening until the experience is exactly right.' },
  { title: 'Launch',    desc: 'Production deployment with monitoring, performance baselines, and a real knowledge handoff.' },
];

/* ─── animated scaleY connector (light version) ───────────────── */
function ConnectorLine({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={inView ? { scaleY: 1 } : {}}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="absolute left-[27px] top-8 w-px origin-top lg:left-[31px]"
      style={{
        height: 'calc(100% - 2.5rem)',
        background: 'linear-gradient(to bottom,rgba(228,111,30,0.4),rgba(43,110,242,0.25),transparent)',
      }}
      aria-hidden="true"
    />
  );
}

/* ─── scroll progress bar ──────────────────────────────────────── */
function ProgressBar({ progress }: { progress: any }) {
  return (
    <div className="mb-10 h-[2px] w-full overflow-hidden rounded-full bg-[rgba(15,20,30,0.07)]" aria-hidden="true">
      <motion.div
        className="h-full origin-left rounded-full"
        style={{ scaleX: progress, background: 'linear-gradient(to right,#e46f1e,#2b6ef2)' }}
      />
    </div>
  );
}

/* ─── single step — light glass card ──────────────────────────── */
function ProcessStep({ step, index, total }: { step: { title: string; desc: string }; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = STEP_ICONS[index % STEP_ICONS.length];
  const color = STEP_COLORS[index % STEP_COLORS.length];
  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className="group relative grid grid-cols-[56px_1fr] gap-0 lg:grid-cols-[64px_1fr]"
    >
      {/* Spine icon */}
      <div className="relative flex flex-col items-center pt-0.5">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.22 }}
          className="relative z-10 flex h-[54px] w-[54px] items-center justify-center rounded-2xl border transition-all duration-300"
          style={
            inView
              ? { borderColor: `${color}30`, background: `${color}10`, boxShadow: `0 0 24px ${color}18` }
              : { borderColor: 'rgba(15,20,30,0.08)', background: 'rgba(255,255,255,0.7)' }
          }
        >
          <Icon size={20} style={{ color: inView ? color : '#9ca3af' }} className="transition-colors duration-500" aria-hidden="true" />
          {inView && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0.7 }}
              animate={{ scale: 2.0, opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut', delay: index * 0.12 + 0.18 }}
              className="absolute inset-0 rounded-2xl"
              style={{ background: color }}
              aria-hidden="true"
            />
          )}
        </motion.div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-[rgba(15,20,30,0.1)] to-transparent" />
        )}
      </div>

      {/* Glass card — light */}
      <div className={`pb-8 pl-5 ${isLast ? 'pb-0' : ''}`}>
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.25 }}
          className="group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 md:p-6"
          style={{
            borderColor: inView ? `${color}18` : 'rgba(15,20,30,0.07)',
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: inView
              ? `0 8px 32px -8px ${color}10, inset 0 1px 0 rgba(255,255,255,0.95), 0 1px 0 rgba(15,20,30,0.04)`
              : '0 2px 8px -2px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* Inner ambient glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: `radial-gradient(ellipse 70% 60% at 0% 0%,${color}07,transparent 65%)` }}
            aria-hidden="true"
          />
          {/* Shine sweep */}
          <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />

          <p className="relative mb-1.5 font-inter text-[9.5px] font-bold uppercase tracking-[0.22em]" style={{ color: `${color}80` }}>
            Step {String(index + 1).padStart(2, '0')}
          </p>
          <div className="relative inline-block">
            <h3 className="font-inter text-xl font-extrabold tracking-tight text-[#0d1117] transition-colors duration-300 md:text-2xl">
              {step.title}
            </h3>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 + 0.22 }}
              className="mt-0.5 h-[1.5px] w-full origin-left"
              style={{ background: `linear-gradient(to right,${color},transparent)`, opacity: 0.45 }}
              aria-hidden="true"
            />
          </div>
          <p className="relative mt-3 font-inter text-[13.5px] leading-[1.78] text-[#6b7280]">{step.desc}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ArchProcess() {
  const { section: process } = useSiteSection('about.process');
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef, { once: true, margin: '-40px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const orbY = useSpring(rawY, { stiffness: 28, damping: 20 });

  const steps =
    process.steps?.length >= 3
      ? process.steps.map(s => ({ title: s.title, desc: s.desc }))
      : DEFAULT_STEPS;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,rgba(247,247,245,0.97) 0%,rgba(255,255,255,0.99) 100%)' }}
      aria-label="How we work"
    >
      {/* Architectural grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right,rgba(15,20,30,0.022) 1px,transparent 1px),linear-gradient(to bottom,rgba(15,20,30,0.022) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* Parallax ambient orbs */}
      <motion.div
        className="pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 rounded-full"
        style={{ y: orbY, width: '50vw', height: '50vw', background: 'radial-gradient(circle,rgba(228,111,30,0.07) 0%,rgba(43,110,242,0.04) 50%,transparent 72%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-8 top-1/4 h-[40vh] w-[25vw] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(43,110,242,0.05),transparent 70%)', filter: 'blur(50px)' }}
        aria-hidden="true"
      />

      <div className="arch-container relative z-10 py-16 md:py-20">
        {/* Header */}
        <div className="mb-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="arch-eyebrow mb-3"
            >
              How We Build
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
              className="font-inter font-extrabold text-[#0d1117]"
              style={{ fontSize: 'clamp(1.75rem,3.4vw,3.2rem)', lineHeight: 1.07, letterSpacing: '-0.03em' }}
            >
              {process.title || 'A repeatable process\nfor unrepeatable results.'}
            </motion.h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
              className="max-w-md font-inter text-[14px] leading-[1.8] text-[#6b7280]"
            >
              {process.badge || 'Every engagement follows a structured method. Predictable delivery, transparent milestones, zero surprises.'}
            </motion.p>
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar progress={scrollYProgress} />

        {/* Steps */}
        <div ref={listRef} className="relative max-w-2xl">
          <ConnectorLine inView={listInView} />
          {steps.map((s, i) => (
            <ProcessStep key={s.title} step={s} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
