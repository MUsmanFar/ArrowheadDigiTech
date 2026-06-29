'use client';

import { useSiteSection } from '@/lib/use-site-content';
import { getSchedulingUrl } from '@/lib/scheduling';
import HerculesButton from './HerculesButton';
import Reveal from './Reveal';
import HeroVisual from './HeroVisual';

export default function PremiumCta() {
  const { section: cta } = useSiteSection('site.cta');
  const { section: nav } = useSiteSection('site.nav');
  const portfolioLabel =
    nav.items.find((i) => i.href === '/portfolio')?.name ?? 'View Our Work';

  return (
    <section className="hercules-section pb-20 pt-8 md:pb-28" aria-label="Call to action">
      <div className="container-premium">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-gradient-to-br from-blue-50/80 via-white/90 to-orange-50/60 p-10 shadow-[0_40px_120px_-40px_rgba(43,110,242,0.2)] backdrop-blur-xl md:rounded-[2.5rem] md:p-16 lg:p-20">
            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-orange-200/30 blur-[100px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-200/25 blur-[100px]" aria-hidden="true" />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
              <div className="text-center lg:text-left">
                {cta.badge && (
                  <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e46f1e]">
                    {cta.badge}
                  </p>
                )}
                <h2 className="mt-5 font-poppins text-3xl font-bold tracking-[-0.03em] text-slate-900 md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                  {cta.headline}{' '}
                  {cta.headlineAccent && (
                    <span className="hercules-gradient-text">{cta.headlineAccent}</span>
                  )}
                </h2>
                <p className="mx-auto mt-6 max-w-xl font-montserrat text-base leading-[1.75] text-slate-500 md:text-lg lg:mx-0">
                  {cta.description}
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  <HerculesButton href={cta.buttonHref || getSchedulingUrl('cta')} variant="primary" size="lg">
                    {cta.buttonLabel}
                  </HerculesButton>
                  <HerculesButton href="/portfolio" variant="secondary" size="lg">
                    {portfolioLabel}
                  </HerculesButton>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="scale-[0.85] xl:scale-100">
                  <HeroVisual />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
