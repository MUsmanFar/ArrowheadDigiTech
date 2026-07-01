'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import { useProjects } from '@/lib/use-projects';
import { useCaseStudies } from '@/lib/use-case-studies';
import HerculesButton from '../ui/HerculesButton';
import GlassCard from '../ui/GlassCard';
import SectionHeader from '../ui/SectionHeader';
import AboutVisual from '../ui/AboutVisual';
import Reveal from '../ui/Reveal';

export default function HerculesAbout() {
  const { section: hero } = useSiteSection('about.hero');
  const { section: manifesto } = useSiteSection('about.manifesto');
  const { section: labels } = useSiteSection('home.metrics-labels');
  const { section: aboutLabels } = useSiteSection('about.section-labels');
  const { projects } = useProjects();
  const { studies } = useCaseStudies();

  const metrics = useMemo(() => {
    const projectCount = projects.length || studies.length || 0;
    const industries = new Set(
      [...projects.map((p) => p.industry), ...studies.map((s) => s.industry)].filter(Boolean),
    );
    return [
      { value: `${Math.max(projectCount, 1)}+`, label: labels.projectsLabel },
      { value: `${Math.max(industries.size, 1)}+`, label: aboutLabels.statIndustriesServed },
    ];
  }, [projects, studies, labels.projectsLabel, aboutLabels.statIndustriesServed]);

  const principles = manifesto.items.slice(0, 4).map((item) => item.title);

  return (
    <section className="hercules-section relative overflow-hidden bg-white py-24 md:py-32" aria-label="About">
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br from-orange-50 to-blue-50/40 blur-[80px]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-blue-50/50 blur-[100px]" aria-hidden="true" />

      <div className="container-premium relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-5/12 order-2 lg:order-1 relative">
            <Reveal>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-[3rem] transform -rotate-3 scale-105 border border-white shadow-xl backdrop-blur-sm z-0"></div>
                <div className="relative z-10 bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] p-4 border border-slate-100">
                  <AboutVisual />
                </div>
                
                {/* Floating Metrics Overlay */}
                <div className="absolute -bottom-8 -right-8 z-20 flex flex-col gap-4">
                  {metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                    >
                      <GlassCard padding="md" className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_40px_-15px_rgba(15,23,42,0.1)] pr-12">
                        <p className="font-inter text-3xl font-extrabold tracking-tight text-slate-900">{m.value}</p>
                        <p className="font-inter text-[11px] font-bold uppercase tracking-wider text-[#e46f1e] mt-1">{m.label}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="w-full lg:w-7/12 order-1 lg:order-2 lg:pl-10">
            <Reveal delay={100}>
              <SectionHeader
                eyebrow="Who We Are"
                title={hero.headline}
                description={hero.subheadline}
                className="mb-8"
              />
              {manifesto.items[0] && (
                <p className="mt-8 font-inter text-lg leading-[1.8] text-slate-500">
                  {manifesto.items[0].content}
                </p>
              )}
              
              <div className="mt-12 grid sm:grid-cols-2 gap-6">
                {principles.map((item, i) => (
                  <motion.div 
                    key={item} 
                    className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/50 border border-slate-100 transition-colors hover:bg-slate-50 hover:border-orange-100"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-[#e46f1e]">
                      <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="font-inter font-semibold text-slate-800 leading-snug mt-2">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-slate-100">
                <HerculesButton href="/about" variant="primary" size="lg" className="px-8 shadow-[0_8px_20px_-8px_rgba(228,111,30,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(228,111,30,0.5)]">
                  Learn about our story
                </HerculesButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
