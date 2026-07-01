'use client';

import { motion } from 'framer-motion';
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
    <section className="hercules-section pb-24 pt-12 md:pb-32" aria-label="Call to action">
      <div className="container-premium">
        <Reveal>
          <div className="relative overflow-hidden rounded-[3rem] border border-white/60 bg-slate-900 shadow-[0_40px_100px_-20px_rgba(15,23,42,0.4)]">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-orange-500/20 blur-[120px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-[120px]" aria-hidden="true" />

            <div className="relative z-10 grid items-center gap-12 p-12 md:p-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:p-24">
              <div className="text-center lg:text-left">
                {cta.badge && (
                  <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md mb-8">
                    <p className="font-inter text-[11px] font-bold uppercase tracking-[0.25em] text-orange-300">
                      {cta.badge}
                    </p>
                  </div>
                )}
                
                <h2 className="font-inter text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl lg:leading-[1.1]">
                  {cta.headline}{' '}
                  {cta.headlineAccent && (
                    <span className="block mt-2 bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">{cta.headlineAccent}</span>
                  )}
                </h2>
                
                <p className="mx-auto mt-8 max-w-xl font-inter text-lg leading-[1.8] text-slate-300 lg:mx-0">
                  {cta.description}
                </p>
                
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 lg:justify-start">
                  <HerculesButton 
                    href={cta.buttonHref || getSchedulingUrl('cta')} 
                    variant="primary" 
                    size="lg"
                    className="w-full sm:w-auto px-10 py-4 shadow-[0_10px_30px_-10px_rgba(228,111,30,0.5)]"
                  >
                    {cta.buttonLabel}
                  </HerculesButton>
                  <HerculesButton 
                    href="/portfolio" 
                    variant="secondary" 
                    size="lg"
                    className="w-full sm:w-auto px-10 py-4 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
                  >
                    {portfolioLabel}
                  </HerculesButton>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="scale-[1.1] xl:scale-125 transform-gpu"
                >
                  <HeroVisual />
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
