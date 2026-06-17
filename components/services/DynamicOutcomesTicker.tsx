'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Shield, Users } from 'lucide-react';

const outcomes = [
  { icon: TrendingUp, text: "300% Average ROI" },
  { icon: Activity, text: "50M+ Data Points Handled" },
  { icon: Shield, text: "Zero Security Breaches" },
  { icon: Users, text: "10x Lead Acquisition" },
  { icon: TrendingUp, text: "Sub-second Load Times" },
  { icon: Activity, text: "99.99% Uptime SLA" },
];

export default function DynamicOutcomesTicker() {
  return (
    <section className="bg-slate-950 py-12 overflow-hidden border-y border-white/10" aria-label="Key Outcomes">
      <div className="flex relative w-[200%] md:w-[150%] lg:w-full">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
        >
          {/* Duplicate the array twice for seamless looping */}
          {[...outcomes, ...outcomes].map((outcome, index) => (
            <div key={index} className="flex items-center mx-8">
              <outcome.icon className="text-blue-500 mr-3" size={24} />
              <span className="text-2xl md:text-3xl font-black text-white font-montserrat uppercase tracking-widest">
                {outcome.text}
              </span>
              <span className="mx-8 text-slate-800 text-3xl font-black">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
