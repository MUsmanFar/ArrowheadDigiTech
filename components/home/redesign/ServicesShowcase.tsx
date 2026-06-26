'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Bot, LineChart, Monitor, Palette } from 'lucide-react';
import { useCapabilityServices } from '@/lib/use-capability-services';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

const ICONS: Record<string, typeof Monitor> = {
  'web-development': Monitor,
  'ai-chatbots': Bot,
  'lead-generation': LineChart,
  'digital-strategy': Palette,
};

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  icon?: string | null;
};

export default function ServicesShowcase() {
  const { section: intro } = useSiteSection('home.capabilities');
  const { section: servicesHero } = useSiteSection('services.hero');
  const { section: detailLabels } = useSiteSection('services.detail-labels');
  const { services: rawServices } = useCapabilityServices(intro.capabilitySlugs);
  const services = rawServices as ServiceRow[];

  if (services.length === 0) return null;

  return (
    <SectionBackdrop variant="cool" className="py-28 md:py-40">
      <section aria-label="Services">
        <div className="container-premium">
          <div className="mb-16 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
                {servicesHero.badge}
              </p>
              <h2 className="text-4xl font-bold font-poppins leading-[1.04] tracking-tight text-[#111827] md:text-5xl lg:text-6xl">
                {intro.headline}
                <span className="mt-1 block text-gradient-blue">{intro.headlineAccent}</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-md text-lg font-montserrat leading-relaxed text-slate-500"
            >
              {intro.description}
            </motion.p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {services.map((service, i) => {
              const Icon = ICONS[service.slug] || Monitor;
              const reversed = i % 2 === 1;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.06, duration: 0.7 }}
                >
                  <Link href={`/services/${service.slug}`} className="group block">
                    <div
                      className={`home-glass grid overflow-hidden rounded-[2rem] md:grid-cols-12 md:gap-0 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-36px_rgba(17,24,39,0.18)] ${
                        reversed ? 'md:[direction:rtl]' : ''
                      }`}
                    >
                      <div className={`relative min-h-[220px] overflow-hidden md:col-span-5 ${reversed ? 'md:[direction:ltr]' : ''}`}>
                        {service.thumbnail ? (
                          <Image
                            src={service.thumbnail}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 42vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2B6EF2]/15 via-white to-[#E46F1E]/10" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/30" />
                        <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/90 shadow-lg">
                          <Icon className="h-6 w-6 text-[#111827]" />
                        </div>
                      </div>

                      <div className={`flex flex-col justify-center p-8 md:col-span-7 md:p-12 ${reversed ? 'md:[direction:ltr]' : ''}`}>
                        <p className="text-sm font-bold font-poppins text-[#E46F1E]">
                          {String(i + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold font-poppins text-[#111827] md:text-3xl lg:text-4xl">
                          {service.title}
                        </h3>
                        <p className="mt-4 font-montserrat leading-relaxed text-slate-500 md:text-base">
                          {service.description}
                        </p>
                        <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-[#E46F1E] transition-colors group-hover:text-[#c45a12]">
                          {detailLabels.getStarted}
                          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
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
            className="mt-14 text-center"
          >
            <Link
              href={intro.viewAllHref}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#111827] px-8 py-4 text-sm font-semibold font-montserrat text-white transition-colors hover:bg-[#1f2937]"
            >
              {intro.viewAllLabel}
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
