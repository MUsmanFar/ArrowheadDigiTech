'use client';

import { motion } from 'framer-motion';
import HerculesButton from '../ui/HerculesButton';
import Reveal from '../ui/Reveal';

type Cta = { label: string; href: string; external?: boolean };

type Props = {
  badge?: string;
  title: string;
  titleAccent?: string;
  titleSuffix?: string;
  description?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  align?: 'left' | 'center';
  size?: 'default' | 'large';
  children?: React.ReactNode;
};

export default function PageHero({
  badge,
  title,
  titleAccent,
  titleSuffix,
  description,
  primaryCta,
  secondaryCta,
  align = 'left',
  size = 'default',
  children,
}: Props) {
  const centered = align === 'center';

  return (
    <section className="relative min-h-0 overflow-hidden hercules-hero-bg hercules-ambient-noise pt-32 pb-20 md:pt-40 md:pb-28" aria-label="Page hero">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="container-premium relative">
        <div className={centered ? 'mx-auto max-w-4xl text-center' : 'max-w-5xl'}>
          <Reveal>
            {badge && (
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/80 px-4 py-1.5 font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e46f1e] shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e46f1e]" aria-hidden="true" />
                {badge}
              </p>
            )}

            <h1
              className={`mt-6 font-poppins font-bold tracking-[-0.03em] text-slate-900 ${
                size === 'large'
                  ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]'
                  : 'text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl leading-[1.05]'
              }`}
            >
              {title}{' '}
              {titleAccent && <span className="hercules-gradient-text">{titleAccent}</span>}{' '}
              {titleSuffix}
            </h1>

            {description && (
              <p
                className={`mt-6 font-montserrat text-base leading-relaxed text-slate-500 md:text-lg ${
                  centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
                }`}
              >
                {description}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div
                className={`mt-10 flex flex-wrap gap-4 ${centered ? 'justify-center' : ''}`}
              >
                {primaryCta && (
                  <HerculesButton href={primaryCta.href} variant="primary" external={primaryCta.external}>
                    {primaryCta.label}
                  </HerculesButton>
                )}
                {secondaryCta && (
                  <HerculesButton href={secondaryCta.href} variant="secondary">
                    {secondaryCta.label}
                  </HerculesButton>
                )}
              </div>
            )}
          </Reveal>

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-12"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
