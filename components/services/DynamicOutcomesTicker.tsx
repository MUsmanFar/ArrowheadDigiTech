'use client';

import React from 'react';
import { motion } from 'framer-motion';

const outcomes = [
  'Real-time Trip Tracking',
  '50% Faster Applications',
  '40% More Mobile Bookings',
  'Zero Double-Booking Incidents',
  '35% Higher Conversions',
  '25% Less Abandonment',
];

export default function DynamicOutcomesTicker() {
  return (
    <section className="bg-slate-50 border-y border-slate-100 py-10 overflow-hidden" aria-label="Key Outcomes">
      <div className="flex">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 30,
          }}
        >
          {[...outcomes, ...outcomes].map((text, index) => (
            <div key={index} className="flex items-center mx-6">
              <span className="text-lg md:text-xl font-bold text-slate-700 font-inter tracking-tight">
                {text}
              </span>
              <span className="mx-6 text-orange-300 text-xl font-light">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
