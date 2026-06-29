'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Code2,
  Layers,
  LineChart,
  Megaphone,
  Palette,
  Search,
  ShoppingCart,
  Sparkles,
  Target,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import HerculesButton from '../ui/HerculesButton';
import GlassCard from '../ui/GlassCard';
import SectionHeader from '../ui/SectionHeader';
import IconBox from '../ui/IconBox';

type Service = {
  slug: string;
  title: string;
  description: string;
  order?: number;
};

const SERVICE_ICONS: Record<string, { icon: LucideIcon; variant: 'orange' | 'blue' | 'emerald' | 'violet' | 'slate' }> = {
  'web-development': { icon: Code2, variant: 'blue' },
  'ai-chatbots': { icon: Bot, variant: 'violet' },
  'lead-generation': { icon: Target, variant: 'orange' },
  'digital-strategy': { icon: LineChart, variant: 'emerald' },
  'seo': { icon: Search, variant: 'blue' },
  'e-commerce': { icon: ShoppingCart, variant: 'orange' },
  'branding': { icon: Palette, variant: 'violet' },
  'marketing': { icon: Megaphone, variant: 'emerald' },
};

const FALLBACK_ICONS = [Code2, Bot, Target, Layers, Sparkles, LineChart];

function getServiceMeta(slug: string, index: number) {
  return SERVICE_ICONS[slug] ?? {
    icon: FALLBACK_ICONS[index % FALLBACK_ICONS.length],
    variant: (['orange', 'blue', 'emerald', 'violet', 'slate'] as const)[index % 5],
  };
}

export default function HerculesServices() {
  const { section: intro } = useSiteSection('home.capabilities');
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/public/services')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data)) return;
        setServices([...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="hercules-section bg-white" aria-label="Services">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Our Services"
          title={`${intro.headline} ${intro.headlineAccent ?? ''}`.trim()}
          description={intro.description}
          align="center"
          className="mb-16 md:mb-20"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const meta = getServiceMeta(service.slug, i);
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 3) * 0.07, duration: 0.6 }}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <GlassCard hover padding="lg" className="flex h-full flex-col">
                    <IconBox icon={meta.icon} variant={meta.variant} />
                    <h3 className="mt-6 font-poppins text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#e46f1e] md:text-[1.35rem]">
                      {service.title}
                    </h3>
                    <p className="mt-4 flex-1 font-montserrat text-sm leading-[1.75] text-slate-500 md:text-[0.9375rem]">
                      {service.description}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-1.5 font-montserrat text-sm font-semibold text-[#e46f1e]">
                      Learn more
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <HerculesButton href={intro.viewAllHref} variant="primary">
            {intro.viewAllLabel}
          </HerculesButton>
        </div>
      </div>
    </section>
  );
}
