'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '98%', label: 'Client Retention Rate' },
  { value: '$50M+', label: 'Client Revenue Generated' },
  { value: '500+', label: 'Digital Products Deployed' },
  { value: '24/7', label: 'Enterprise Support' }
];

export default function MetricsBar() {
  return (
    <section className="bg-blue-600 py-16 relative z-10 overflow-hidden" aria-label="Key Metrics">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/20">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`text-center ${index === 0 || index === 2 ? 'border-none lg:border-solid' : 'border-none'} ${index === 0 ? 'border-none' : ''}`}
            >
              <div className="text-4xl md:text-5xl font-black text-white font-montserrat tracking-tighter mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100 font-bold uppercase tracking-widest text-[10px] md:text-xs font-poppins">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
