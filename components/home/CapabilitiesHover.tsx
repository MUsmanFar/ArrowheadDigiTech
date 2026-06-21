'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Monitor, Cpu, Layout, Settings } from 'lucide-react';
import { caseStudies } from '@/lib/case-studies';

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
  },
  {
    slug: 'ai-chatbots',
    title: 'AI Website Creation',
    description:
      'Intelligent AI-powered web experiences with smart chatbots, personalized content, and automated customer engagement.',
    icon: Cpu,
  },
  {
    slug: 'lead-generation',
    title: 'Landing Page Development',
    description:
      'High-converting landing pages designed to capture leads and drive sales — with measurable results we track and optimize.',
    icon: Layout,
  },
  {
    slug: 'digital-strategy',
    title: 'Website Management',
    description:
      'Ongoing maintenance, security updates, performance optimization, and content management to keep your site at its best.',
    icon: Settings,
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
  },
};

export default function CapabilitiesHover() {
  return (
    <section className="py-28 md:py-36 bg-white" aria-label="Services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-poppins tracking-tight leading-[1.1]">
            Services designed to
            <br />
            <span className="text-orange-500">grow your business.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 font-inter leading-relaxed">
            From custom development to AI-powered experiences, we deliver digital solutions that drive real results.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.slug}
                variants={cardVariants}
              >
                <Link href={`/services/${service.slug}`} className="block h-full group">
                  <div className="relative h-full border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-orange-50">
                      <Icon className="w-5 h-5 text-slate-500 transition-colors duration-300 group-hover:text-orange-500" />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 font-poppins mb-2">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-500 font-inter leading-relaxed">
                      {service.description}
                    </p>

                    {serviceProjects[service.slug] && serviceProjects[service.slug].length > 0 && (
                      <div className="mt-4 flex items-center gap-3">
                        {serviceProjects[service.slug].slice(0, 2).map((project) => (
                          <div key={project.slug} className="flex items-center gap-2">
                            <div className="relative w-7 h-7 rounded-md overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                              {project.thumbnail ? (
                                <Image
                                  src={project.thumbnail}
                                  alt={project.client}
                                  fill
                                  sizes="28px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="absolute inset-0 bg-slate-100" />
                              )}
                            </div>
                            <span className="text-[11px] font-medium text-slate-400 font-inter truncate max-w-[90px]">
                              {project.client}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
                        Learn More
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-slate-300 transition-all duration-300 group-hover:text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
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
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5"
          >
            View All Services
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
