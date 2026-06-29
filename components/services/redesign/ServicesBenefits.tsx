'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';
import { useCapabilityServices } from '@/lib/use-capability-services';
import { SectionHeading, GlassCard, IconWrapper } from '@/components/design-system';
import { Layers, Zap, Shield } from 'lucide-react';

const icons = [Layers, Zap, Shield];

export default function ServicesBenefits() {
  const { section: intro } = useSiteSection('home.capabilities');
  const { services } = useCapabilityServices();

  if (services.length === 0) return null;

  const title = [intro.headline, intro.headlineAccent].filter(Boolean).join(' ');

  return (
    <section className="hercules-section-alt py-20 md:py-28" aria-label="Service benefits">
      <div className="container-premium">
        <SectionHeading
          badge="Benefits"
          title={title}
          description={intro.description}
          className="mb-14"
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.slice(0, 3).map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard hover className="h-full p-8">
                  <IconWrapper variant={i === 1 ? 'blue' : 'orange'}>
                    <Icon size={20} aria-hidden="true" />
                  </IconWrapper>
                  <h3 className="mt-6 text-xl font-bold font-poppins text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-sm text-slate-500 font-montserrat leading-relaxed">
                    {service.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
