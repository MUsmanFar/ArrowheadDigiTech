'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { HeroContent } from '@/lib/site-content';
import { getSchedulingUrl } from '@/lib/scheduling';
import {
  Chapter,
  ChapterBridge,
  DepthLayer,
  LightingPools,
  ParticleField,
  SignalButton,
  SignalCanvas,
  SignalCore,
} from '@/components/visual-engine';
import { bridgeHeights, motion as motionTokens, signalCoreScale } from '@/lib/visual-engine/tokens';
import HeroCommandCenter from './hero/HeroCommandCenter';
import HeroTrustStrip from './hero/HeroTrustStrip';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function HeroReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionTokens.reveal / 1000,
        delay: delay / 1000,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HeroRedesign({ hero }: { hero: HeroContent }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, motionTokens.springNav);
  const springY = useSpring(my, motionTokens.springNav);
  const parallaxX = useTransform(springX, [-160, 160], [-18, 18]);
  const parallaxY = useTransform(springY, [-160, 160], [-12, 12]);
  const contentX = useTransform(springX, [-160, 160], [-6, 6]);
  const contentY = useTransform(springY, [-160, 160], [-4, 4]);

  const primaryHref = hero.primaryCta?.external
    ? getSchedulingUrl('hero')
    : hero.primaryCta?.href || getSchedulingUrl('hero');

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Chapter
      token="void-deep"
      texture="grain"
      poolBlueOpacity={0.4}
      poolOrangeOpacity={0.22}
      fog
      className="relative border-b border-white/[0.06]"
    >
      <section
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative min-h-[100svh] overflow-hidden"
        aria-label="Hero"
      >
        <DepthLayer layer="background" className="pointer-events-none absolute inset-0">
          <SignalCanvas className="absolute inset-0 h-full w-full" opacityScale="hero" />
          <ParticleField density="hero" className="absolute inset-0 h-full w-full" />
        </DepthLayer>

        <LightingPools />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_45%,rgba(43,110,242,0.08),transparent_65%)]" aria-hidden="true" />

        <div className="container-premium relative z-[8] flex min-h-[100svh] flex-col justify-center pt-28 pb-24 md:pt-32 md:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            <motion.div
              style={{ x: contentX, y: contentY }}
              className="relative z-[8] lg:col-span-6 xl:col-span-5"
            >
              {hero.badge && (
                <HeroReveal delay={0}>
                  <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E46F1E]">
                    {hero.badge}
                  </p>
                </HeroReveal>
              )}

              <HeroReveal delay={80}>
                <h1 className="mt-5 font-poppins text-[2.35rem] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl md:text-[3.25rem] lg:text-6xl xl:text-[4.25rem]">
                  {hero.headline}{' '}
                  {hero.headlineAccent && (
                    <span className="ve-text-signal-gradient">{hero.headlineAccent}</span>
                  )}{' '}
                  {hero.headlineSuffix}
                </h1>
              </HeroReveal>

              {hero.subheadline && (
                <HeroReveal delay={160}>
                  <p className="mt-7 max-w-xl font-montserrat text-base leading-relaxed text-slate-400 md:text-lg">
                    {hero.subheadline}
                  </p>
                </HeroReveal>
              )}

              <HeroReveal delay={240}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  {hero.primaryCta && (
                    <SignalButton href={primaryHref} variant="primary" external={hero.primaryCta.external} magnetic>
                      {hero.primaryCta.label}
                    </SignalButton>
                  )}
                  {hero.secondaryCta && (
                    <SignalButton href={hero.secondaryCta.href} variant="secondary-dark">
                      {hero.secondaryCta.label}
                    </SignalButton>
                  )}
                </div>
              </HeroReveal>

              <HeroReveal delay={320}>
                <HeroTrustStrip />
              </HeroReveal>
            </motion.div>

            <DepthLayer layer="glass" className="relative hidden md:block lg:col-span-6 xl:col-span-7">
              <HeroCommandCenter parallaxX={parallaxX} parallaxY={parallaxY} />
            </DepthLayer>
          </div>

          <div className="pointer-events-none relative mt-10 flex justify-center md:hidden" aria-hidden="true">
            <div className="opacity-40">
              <SignalCore size={signalCoreScale.services} spokes={6} animated />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[6]">
          <ChapterBridge from="void-deep" to="paper" heightPx={bridgeHeights.heroToLogos} />
        </div>
      </section>
    </Chapter>
  );
}
