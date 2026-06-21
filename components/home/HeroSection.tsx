'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getSchedulingUrl } from '@/lib/scheduling';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 subtle-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-premium relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-slate-900 tracking-tight leading-[1.05] font-poppins">
              Building Websites That{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                Actually Grow
              </span>{' '}
              Businesses.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
            className="mt-6 text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed font-inter"
          >
            Custom Websites, AI-Powered Experiences, and Digital Solutions
            designed to generate leads, improve credibility, and accelerate
            growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
            className="mt-10 flex flex-wrap gap-4 items-center justify-center"
          >
            <a
              href={getSchedulingUrl('hero')}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-orange-500 text-white text-base font-semibold transition-all duration-300 ease-out hover:bg-orange-600 hover:shadow-[0_12px_30px_-8px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Book A Discovery Call</span>
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <Link
              href="/portfolio"
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-transparent text-slate-800 text-base font-semibold border border-slate-200 transition-all duration-300 ease-out hover:border-slate-300 hover:bg-slate-50/80 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View My Work</span>
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
