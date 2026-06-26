'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Bot, LineChart, Monitor, Palette } from 'lucide-react';
import { useCapabilityServices } from '@/lib/use-capability-services';
import { useSiteSection } from '@/lib/use-site-content';

const ICONS: Record<string, typeof Monitor> = {
  'web-development': Monitor,
  'ai-chatbots': Bot,
  'lead-generation': LineChart,
  'digital-strategy': Palette,
};

const PALETTES = [
  'from-orange-500/10 via-orange-50 to-white',
  'from-blue-500/10 via-blue-50 to-white',
  'from-violet-500/10 via-violet-50 to-white',
  'from-emerald-500/10 via-emerald-50 to-white',
];

export default function ServicesShowcase() {
  const { section: intro } = useSiteSection('home.capabilities');
  const { section: servicesHero } = useSiteSection('services.hero');
  const { services } = useCapabilityServices(intro.capabilitySlugs);
  if (services.length === 0) return null;

  return (
    <section className="relative py-28 md:py-36 bg-[#fafafa]" aria-label="Services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-orange-500 mb-4">
              {servicesHero.badge}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 tracking-tight leading-[1.05]">
              {intro.headline}
              <span className="block text-slate-400">{intro.headlineAccent}</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-slate-500 font-montserrat max-w-md leading-relaxed"
          >
            {intro.description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {services.map((service, i) => {
            const Icon = ICONS[service.slug] || Monitor;
            const palette = PALETTES[i % PALETTES.length];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div
                    className={`relative h-full rounded-[1.75rem] bg-gradient-to-br ${palette} border border-white p-8 md:p-10 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.12)] transition-all duration-500 hover:shadow-[0_30px_80px_-24px_rgba(15,23,42,0.18)] hover:-translate-y-1 overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-700" />
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <h3 className="text-2xl font-bold font-poppins text-slate-900 mb-3">{service.title}</h3>
                      <p className="text-slate-500 font-montserrat leading-relaxed text-sm md:text-base">
                        {service.description}
                      </p>
                      <div className="mt-8 flex items-center justify-end">
                        <span className="w-10 h-10 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors duration-300">
                          <ArrowUpRight
                            size={16}
                            className="text-slate-600 group-hover:text-white transition-colors"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href={intro.viewAllHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white font-montserrat font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            {intro.viewAllLabel}
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
