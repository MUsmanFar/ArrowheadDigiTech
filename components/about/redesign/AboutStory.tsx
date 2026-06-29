'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';
import { SectionHeading, GlassCard } from '@/components/design-system';

export default function AboutStory() {
  const { section: hero } = useSiteSection('about.hero');
  const { section: manifesto } = useSiteSection('about.manifesto');
  const storyItem = manifesto.items[0];

  return (
    <section className="hercules-section-alt py-20 md:py-28" aria-label="Company story">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <SectionHeading
            badge={hero.badge}
            title={manifesto.title.replace('.', '')}
            description={hero.subheadline}
          />

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GlassCard className="p-8 md:p-10">
              {storyItem && (
                <>
                  <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-orange-500 mb-4">
                    {storyItem.id} — {storyItem.title}
                  </p>
                  <p className="text-base md:text-lg text-slate-600 font-montserrat leading-relaxed">
                    {storyItem.content}
                  </p>
                </>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
