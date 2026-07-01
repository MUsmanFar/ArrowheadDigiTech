'use client';

import { motion } from 'framer-motion';
import { Compass, Hammer, Lightbulb, Rocket, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import SectionHeader from '../ui/SectionHeader';

const STEP_ICONS: LucideIcon[] = [Search, Lightbulb, Compass, Hammer, Rocket];

export default function HerculesProcess() {
  const { section: process } = useSiteSection('about.process');

  return (
    <section className="hercules-section relative overflow-hidden bg-slate-900 py-24 md:py-32" aria-label="Process">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-[url('/noise.png')] opacity-[0.03]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500/10 to-blue-500/10 blur-[120px]" aria-hidden="true" />

      <div className="container-premium relative z-10">
        <div className="text-center mb-20 md:mb-28">
          <SectionHeader
            eyebrow="How We Build"
            title={<span className="text-white">{process.title}</span> as any}
            description={process.badge}
            align="center"
            className="text-slate-400"
          />
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Main timeline line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-orange-500/0 via-slate-700 to-orange-500/0 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />

          <div className="flex flex-col gap-12 md:gap-24">
            {process.steps.map((step, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md transition-colors hover:bg-white/[0.04]">
                      <span className="font-inter text-6xl font-black text-slate-800 tracking-tighter block mb-4">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-inter text-2xl font-bold tracking-tight text-white mb-4">{step.title}</h3>
                      <p className="font-inter text-base leading-[1.8] text-slate-400">{step.desc}</p>
                    </div>
                  </div>

                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 border-4 border-slate-800 shadow-[0_0_30px_rgba(228,111,30,0.15)] z-10 transition-transform duration-500 hover:scale-110">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 opacity-20 blur-md"></div>
                      <Icon size={24} className="text-[#e46f1e] relative z-10" />
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
