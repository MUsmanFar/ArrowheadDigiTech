'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSection } from '@/lib/use-site-content';

export default function ProcessTimeline() {
  const { section: process } = useSiteSection('about.process');

  return (
    <section className="py-24 px-6 lg:px-8 relative z-10 bg-slate-900 text-white rounded-t-[3rem] lg:rounded-t-[5rem]">
      <div className="absolute inset-0 bg-saas-grid opacity-10" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-20">
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm font-poppins mb-4 block">
            {process.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat tracking-tight">{process.title}</h2>
        </div>

        <div className="space-y-8">
          {process.steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-mono">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="text-xl font-bold font-poppins mb-2">{step.title}</h3>
                <p className="text-slate-400 font-poppins">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
