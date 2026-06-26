'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';
import { useSiteSection } from '@/lib/use-site-content';
import { SectionHeading, GlassCard } from '@/components/design-system';

export default function ServicesTrust() {
  const { studies } = useCaseStudies();
  const { section: trustedBy } = useSiteSection('services.trusted-by');
  const mediaMap = useProjectMediaMap();

  return (
    <section className="py-20 md:py-28 bg-page-surface border-y border-slate-100" aria-label="Trusted by">
      <div className="container-premium">
        <SectionHeading
          badge={trustedBy.badge}
          title={trustedBy.headline}
          align="center"
          className="mx-auto mb-14"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {studies.slice(0, 4).map((study, i) => {
            const thumb = thumbnailFor(mediaMap.get(study.slug)) || study.thumbnail;
            return (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                  <GlassCard hover className="p-6 h-full">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-100 mb-4 border border-white">
                      {thumb ? (
                        <Image src={thumb} alt={study.client} fill sizes="48px" className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-slate-100" />
                      )}
                    </div>
                    <h3 className="text-sm font-bold font-poppins text-slate-900 group-hover:text-orange-600 transition-colors">
                      {study.client}
                    </h3>
                    <p className="text-xs text-slate-400 font-montserrat mt-1">{study.industry}</p>
                    {study.metrics[0] && (
                      <p className="mt-3 text-xs font-montserrat">
                        <span className="font-semibold text-orange-600">{study.metrics[0].value}</span>{' '}
                        <span className="text-slate-400">{study.metrics[0].label}</span>
                      </p>
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
