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
    <section className="hercules-section relative overflow-hidden bg-[#fafafa] py-24 md:py-32" aria-label="Services">
      <div className="pointer-events-none absolute left-0 top-1/4 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-100/30 to-blue-50/20 blur-[120px]" aria-hidden="true" />
      
      <div className="container-premium relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16 md:mb-24">
          <SectionHeader
            eyebrow="Our Capabilities"
            title={`${intro.headline} ${intro.headlineAccent ?? ''}`.trim()}
            description={intro.description}
            align="left"
            className="max-w-2xl"
          />
          <div className="hidden lg:block pb-4">
            <HerculesButton href={intro.viewAllHref} variant="secondary" className="bg-white hover:bg-slate-50">
              {intro.viewAllLabel}
            </HerculesButton>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {services.map((service, i) => {
            const meta = getServiceMeta(service.slug, i);
            const isFeatured = i === 0 || i === 3;
            
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <GlassCard 
                    padding="lg" 
                    className="flex h-full flex-col relative overflow-hidden bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.12)] hover:-translate-y-2"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity duration-500 group-hover:opacity-10 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-110">
                      <meta.icon size={120} />
                    </div>
                    
                    <IconBox icon={meta.icon} variant={meta.variant} size="lg" className="mb-8 shadow-sm border border-white" />
                    
                    <h3 className="font-inter text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#e46f1e] md:text-[1.75rem]">
                      {service.title}
                    </h3>
                    
                    <p className="mt-4 flex-1 font-inter text-base leading-[1.8] text-slate-500 relative z-10">
                      {service.description}
                    </p>
                    
                    <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-100/80">
                      <span className="font-inter text-sm font-bold tracking-wide uppercase text-slate-400 group-hover:text-[#e46f1e] transition-colors">
                        Explore Service
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 group-hover:bg-orange-50 transition-colors">
                        <ArrowRight size={18} className="text-slate-400 group-hover:text-[#e46f1e] transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center lg:hidden">
          <HerculesButton href={intro.viewAllHref} variant="primary">
            {intro.viewAllLabel}
          </HerculesButton>
        </div>
      </div>
    </section>
  );
}
