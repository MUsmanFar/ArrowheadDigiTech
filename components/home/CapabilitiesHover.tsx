'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Monitor, Cpu, Layout, Settings } from 'lucide-react';
import { caseStudies } from '@/lib/case-studies';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';

const serviceProjects: Record<string, typeof caseStudies> = {
  'web-development': caseStudies.filter((s) => ['yalaride', 'atlanta-car-rental'].includes(s.slug)),
  'ai-chatbots': caseStudies.filter((s) => ['america-needs-nurses'].includes(s.slug)),
  'lead-generation': caseStudies.filter((s) => ['cars-compound', 'priceless-rent-a-car'].includes(s.slug)),
  'digital-strategy': caseStudies.filter((s) => ['go-jetter-tours', 'vipkars'].includes(s.slug)),
};

const services = [
  {
    slug: 'web-development',
    title: 'Website Development',
    description:
      'Custom, high-performance websites built with Next.js, React, and modern architectures. Fast, scalable, and conversion-optimized.',
    icon: Monitor,
    gradient: 'from-orange-500/20 via-orange-500/5 to-transparent',
    borderGlow: 'group-hover:shadow-[0_0_30px_-8px_rgba(249,115,22,0.3)]',
    accentBorder: 'group-hover:border-orange-500/30',
  },
  {
    slug: 'ai-chatbots',
    title: 'AI Website Creation',
    description:
      'Intelligent AI-powered web experiences with smart chatbots, personalized content, and automated customer engagement.',
    icon: Cpu,
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    borderGlow: 'group-hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.3)]',
    accentBorder: 'group-hover:border-blue-500/30',
  },
  {
    slug: 'lead-generation',
    title: 'Landing Page Development',
    description:
      'High-converting landing pages designed to capture leads and drive sales — with measurable results we track and optimize.',
    icon: Layout,
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    borderGlow: 'group-hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.3)]',
    accentBorder: 'group-hover:border-emerald-500/30',
  },
  {
    slug: 'digital-strategy',
    title: 'Website Management',
    description:
      'Ongoing maintenance, security updates, performance optimization, and content management to keep your site at its best.',
    icon: Settings,
    gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
    borderGlow: 'group-hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.3)]',
    accentBorder: 'group-hover:border-purple-500/30',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] },
  },
};

export default function CapabilitiesHover() {
  const mediaMap = useProjectMediaMap();

  return (
    <section className="relative py-28 md:py-36 bg-slate-950 overflow-hidden" aria-label="Services">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle at center, #f97316, transparent 70%)' }} />
        <div className="absolute bottom-1/3 -right-40 w-80 h-80 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle at center, #3b82f6, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white font-poppins tracking-tight leading-[1.1]">
            Services designed to
            <br />
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
              grow your business.
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 font-inter leading-relaxed">
            From custom development to AI-powered experiences, we deliver digital solutions that drive real results.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div key={service.slug} variants={cardVariants}>
                <Link href={`/services/${service.slug}`} className="block h-full group">
                  <div className={`relative h-full rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl p-7 transition-all duration-500 ${service.borderGlow} ${service.accentBorder} hover:-translate-y-1`}>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/[0.1]">
                        <Icon className="w-5 h-5 text-slate-400 transition-colors duration-500 group-hover:text-orange-400" />
                      </div>

                      <h3 className="text-xl font-bold text-white font-poppins mb-3">
                        {service.title}
                      </h3>

                      <p className="text-sm text-slate-400 font-inter leading-relaxed">
                        {service.description}
                      </p>

                      {serviceProjects[service.slug] && serviceProjects[service.slug].length > 0 && (
                        <div className="mt-5 flex items-center gap-3">
                          {serviceProjects[service.slug].slice(0, 2).map((project) => {
                            const projectMedia = mediaMap.get(project.slug);
                            const thumb = thumbnailFor(projectMedia) || project.thumbnail;
                            return (
                              <div key={project.slug} className="flex items-center gap-2">
                                <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white/[0.04] flex-shrink-0 border border-white/[0.06]">
                                  {thumb ? (
                                    <Image
                                      src={thumb}
                                      alt={project.client}
                                      fill
                                      sizes="32px"
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 bg-white/[0.04]" />
                                  )}
                                </div>
                                <span className="text-[11px] font-medium text-slate-500 font-inter truncate max-w-[90px]">
                                  {project.client}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500 group-hover:text-slate-300 transition-colors duration-300">
                          Learn More
                        </span>
                        <span className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center transition-all duration-500 group-hover:bg-white/[0.1] group-hover:border-white/[0.15]">
                          <ArrowUpRight
                            size={14}
                            className="text-slate-500 transition-all duration-500 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/[0.04] text-slate-300 font-semibold text-sm border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:-translate-y-0.5"
          >
            View All Services
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
