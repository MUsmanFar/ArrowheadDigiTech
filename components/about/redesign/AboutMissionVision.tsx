'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Sparkles } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import { SectionHeading, GlassCard, IconWrapper } from '@/components/design-system';

const icons = [Target, Eye, Sparkles];
const labels = ['Mission', 'Vision', 'Values'];

export default function AboutMissionVision() {
  const { section: manifesto } = useSiteSection('about.manifesto');
  const items = manifesto.items.slice(0, 3);

  return (
    <section className="section-shell bg-page-surface" aria-label="Mission, vision, and values">
      <div className="container-premium">
        <SectionHeading
          badge="Principles"
          title="What drives every engagement"
          description="Our manifesto defines how we architect, ship, and scale digital products for enterprise outcomes."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard hover className="h-full p-8">
                  <IconWrapper variant={i === 1 ? 'blue' : 'orange'}>
                    <Icon size={20} aria-hidden="true" />
                  </IconWrapper>
                  <p className="mt-6 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {labels[i] ?? item.id}
                  </p>
                  <h3 className="mt-2 text-xl font-bold font-poppins text-slate-900">{item.title}</h3>
                  <p className="mt-4 text-sm text-slate-500 font-montserrat leading-relaxed">{item.content}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
