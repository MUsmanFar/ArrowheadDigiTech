import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getSchedulingUrl } from '@/lib/scheduling';
import type { HeroContent } from '@/lib/site-content';

export default function HeroSectionServer({ hero }: { hero: HeroContent }) {
  const primaryHref = hero.primaryCta?.external
    ? getSchedulingUrl('hero')
    : hero.primaryCta?.href || getSchedulingUrl('hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950" aria-label="Hero">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle at center, #f97316, transparent 70%)' }}
        />
      </div>

      <div className="container-premium relative z-10 pt-28 pb-20 md:pt-36 md:pb-28 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          {hero.badge && (
            <div className="animate-fade-in-up">
              <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase text-orange-300/80 bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-8">
                {hero.badge}
              </span>
            </div>
          )}

          <div className="animate-fade-in-up [animation-delay:150ms]">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[1.05] font-poppins">
              {hero.headline}{' '}
              {hero.headlineAccent && (
                <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                  {hero.headlineAccent}
                </span>
              )}{' '}
              {hero.headlineSuffix}
            </h1>
          </div>

          {hero.subheadline && (
            <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-inter animate-fade-in-up [animation-delay:300ms]">
              {hero.subheadline}
            </p>
          )}

          <div className="mt-12 flex flex-wrap gap-5 items-center justify-center animate-fade-in-up [animation-delay:450ms]">
            {hero.primaryCta && (
              <a
                href={primaryHref}
                target={hero.primaryCta.external ? '_blank' : undefined}
                rel={hero.primaryCta.external ? 'noopener noreferrer' : undefined}
                className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-b from-orange-600 to-orange-700 text-white text-base font-semibold shadow-[0_8px_24px_-4px_rgba(234,88,12,0.4)] transition-all duration-300 ease-out hover:shadow-[0_12px_36px_-6px_rgba(234,88,12,0.6)] hover:-translate-y-0.5"
              >
                <span className="relative">{hero.primaryCta.label}</span>
                <ArrowUpRight size={18} className="relative" aria-hidden="true" />
              </a>
            )}
            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-white/5 text-white text-base font-semibold border border-white/10 backdrop-blur-sm transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5"
              >
                <span>{hero.secondaryCta.label}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
