'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import { SectionHeading, GlassCard } from '@/components/design-system';

type Service = {
  slug: string;
  title: string;
  description: string;
  deliverables?: string;
  order?: number;
};

type Props = {
  services: Service[];
};

export default function ServicesGrid({ services }: Props) {
  const { section: listIntro } = useSiteSection('services.list-intro');

  return (
    <section className="section-shell bg-white" aria-label="Services overview">
      <div className="container-premium">
        <SectionHeading
          badge={listIntro.headline}
          title={listIntro.subheadline}
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const features = service.deliverables
              ? service.deliverables.split(',').map((f) => f.trim()).slice(0, 3)
              : [];

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.06, duration: 0.6 }}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <GlassCard hover className="h-full p-8 md:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm font-bold font-poppins text-orange-500">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-400 transition-all group-hover:border-orange-200 group-hover:text-orange-600">
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl md:text-3xl font-bold font-poppins text-slate-900 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-base text-slate-500 font-montserrat leading-relaxed">
                      {service.description}
                    </p>
                    {features.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-page-surface px-3 py-1.5 text-xs font-medium text-slate-600 font-montserrat"
                          >
                            <CheckCircle size={12} className="text-orange-500" aria-hidden="true" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
