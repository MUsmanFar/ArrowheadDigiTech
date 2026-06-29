'use client';

import { motion } from 'framer-motion';
import { Compass, Hammer, Lightbulb, Rocket, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import GlassCard from '../ui/GlassCard';
import SectionHeader from '../ui/SectionHeader';
import IconBox from '../ui/IconBox';

const STEP_ICONS: LucideIcon[] = [Search, Lightbulb, Compass, Hammer, Rocket];

export default function HerculesProcess() {
  const { section: process } = useSiteSection('about.process');

  return (
    <section className="hercules-section hercules-section-muted relative overflow-hidden" aria-label="Process">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 rounded-full bg-orange-100/20 blur-[100px]" aria-hidden="true" />

      <div className="container-premium relative">
        <SectionHeader
          eyebrow="How We Build"
          title={process.title}
          description={process.badge}
          align="center"
          className="mb-16 md:mb-20"
        />

        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent lg:block" aria-hidden="true" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {process.steps.map((step, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="relative"
                >
                  <div className="mb-6 flex items-center gap-4 lg:flex-col lg:items-center lg:text-center">
                    <div className="relative">
                      <IconBox icon={Icon} variant={i % 2 === 0 ? 'orange' : 'blue'} />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white font-montserrat text-[10px] font-bold text-slate-400 shadow-sm ring-1 ring-slate-100">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <GlassCard soft padding="md" className="h-full lg:text-center">
                    <h3 className="font-poppins text-base font-bold text-slate-900 md:text-lg">{step.title}</h3>
                    <p className="mt-3 font-montserrat text-sm leading-[1.7] text-slate-500">{step.desc}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
