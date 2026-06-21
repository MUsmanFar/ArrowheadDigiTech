'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '7', label: 'Completed Projects' },
  { value: '5', label: 'Industries Served' },
  { value: '50K+', label: 'App Downloads' },
  { value: '10K+', label: 'Bookings Processed' }
];

export default function MetricsBar() {
  return (
    <section className="border-t border-b border-slate-100 bg-white py-16" aria-label="Key Metrics">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-orange-500 font-poppins tracking-tighter mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs font-inter">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
