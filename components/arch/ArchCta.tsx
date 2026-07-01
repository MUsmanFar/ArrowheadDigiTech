'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import { getSchedulingUrl } from '@/lib/scheduling';

/* ─── magnetic primary button ────────────────────────────────── */
function MagneticPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20 });
  const sy = useSpring(y, { stiffness: 220, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  }, [x, y]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ x: sx, y: sy }}>
        <Link href={href}
          className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#e46f1e] px-9 py-4 font-inter text-[15px] font-semibold text-white shadow-[0_16px_48px_-12px_rgba(228,111,30,0.52)] transition-shadow duration-300 hover:shadow-[0_24px_56px_-12px_rgba(228,111,30,0.62)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2 focus-visible:ring-offset-white">
          {/* Shimmer sweep */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
          {children}
        </Link>
      </motion.div>
    </div>
  );
}

/* ─── secondary ghost button ─────────────────────────────────── */
function SecondaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,20,30,0.15)] bg-white/60 px-9 py-4 font-inter text-[15px] font-semibold text-[#374151] backdrop-blur-sm transition-all duration-300 hover:border-[rgba(15,20,30,0.25)] hover:bg-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2">
      {children}
    </Link>
  );
}

export default function ArchCta() {
  const { section: cta } = useSiteSection('site.cta');
  const { section: footer } = useSiteSection('site.footer');
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  const bgY = useSpring(rawY, { stiffness: 25, damping: 20 });

  const primaryHref =
    cta.buttonHref?.includes('cal.') || cta.buttonHref?.includes('calendly')
      ? cta.buttonHref
      : getSchedulingUrl('cta');

  const headline    = cta.headline     || 'Ready to build something remarkable?';
  const accent      = cta.headlineAccent || "Let's talk.";
  const description = cta.description  || "Tell us what you're building. We'll show you how serious it can become.";
  const buttonLabel = cta.buttonLabel  || 'Start a project';

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#fffdf9 0%,#fff7f0 35%,#f7f5ff 65%,#f0f6ff 100%)' }}
      aria-label="Start a project"
    >
      {/* Architectural dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle,rgba(15,20,30,0.06) 1px,transparent 1px)',
          backgroundSize: '30px 30px',
        }}
        aria-hidden="true"
      />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-multiply"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        aria-hidden="true"
      />

      {/* Parallax colour orbs */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 rounded-full"
          style={{ width: '50vw', height: '50vw', background: 'radial-gradient(circle,rgba(228,111,30,0.11) 0%,transparent 68%)', filter: 'blur(72px)' }} />
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 rounded-full"
          style={{ width: '40vw', height: '40vw', background: 'radial-gradient(circle,rgba(43,110,242,0.07) 0%,transparent 68%)', filter: 'blur(72px)' }} />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-full"
          style={{ width: '30vw', height: '20vw', background: 'radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      </motion.div>

      {/* Decorative corner marks */}
      {(['tl', 'tr', 'bl', 'br'] as const).map(pos => {
        const posMap = { tl: 'top-8 left-8', tr: 'top-8 right-8', bl: 'bottom-8 left-8', br: 'bottom-8 right-8' };
        const rotMap = { tl: '', tr: 'rotate-90', bl: '-rotate-90', br: 'rotate-180' };
        return (
          <div key={pos} className={`absolute ${posMap[pos]} ${rotMap[pos]} h-10 w-10 opacity-[0.18]`} aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none" className="h-full w-full">
              <path d="M0 6 L0 0 L6 0" stroke="#e46f1e" strokeWidth="1.5" />
            </svg>
          </div>
        );
      })}

      <div className="arch-container relative z-10">
        <div className="flex min-h-[560px] flex-col items-center justify-center py-24 text-center md:min-h-[620px] md:py-28">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 arch-eyebrow"
          >
            {cta.badge || "Let's Build"}
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-inter font-extrabold text-[#0d1117]"
            style={{ fontSize: 'clamp(2.25rem,6vw,5.5rem)', lineHeight: 1.0, letterSpacing: '-0.04em' }}
          >
            {headline}
            <br />
            <span style={{
              background: 'linear-gradient(125deg,#e46f1e 0%,#f59e42 50%,#e46f1e 100%)',
              backgroundSize: '200% auto',
              animation: 'arch-shimmer 4s linear infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {accent}
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
            className="mx-auto mt-7 max-w-md font-inter text-[15px] leading-[1.8] text-[#6b7280]"
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            className="mt-10 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center"
          >
            <MagneticPrimary href={primaryHref}>
              <span className="relative">{buttonLabel}</span>
              <ArrowUpRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticPrimary>
            <SecondaryBtn href="/contact">Contact us</SecondaryBtn>
          </motion.div>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-8"
          >
            {footer.email && (
              <a href={`mailto:${footer.email}`}
                className="flex items-center gap-2 font-inter text-[13px] text-[#9ca3af] transition-colors hover:text-[#e46f1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e]">
                <Mail size={13} aria-hidden="true" />{footer.email}
              </a>
            )}
            {footer.phone && (
              <a href={footer.phoneHref || `tel:${footer.phone}`}
                className="flex items-center gap-2 font-inter text-[13px] text-[#9ca3af] transition-colors hover:text-[#e46f1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e]">
                <Phone size={13} aria-hidden="true" />{footer.phone}
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom brand strip */}
      <div className="border-t border-[rgba(15,20,30,0.06)] py-5">
        <div className="arch-container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#e46f1e] to-[#f59e42] shadow-[0_4px_12px_-4px_rgba(228,111,30,0.4)]">
              <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M10 2 L18 10 L10 18 L7 15 L12 10 L7 5 Z" fill="white" />
              </svg>
            </div>
            <span className="font-inter text-[13px] font-semibold text-[#6b7280]">Arrowhead DigiTech</span>
          </div>
          <p className="font-inter text-[11px] text-[#9ca3af]">Enterprise Digital Studio · {new Date().getFullYear()}</p>
        </div>
      </div>
    </section>
  );
}
