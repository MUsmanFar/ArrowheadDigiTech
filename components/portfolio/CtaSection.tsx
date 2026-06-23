'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative py-28 md:py-36 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle at center, #f97316, transparent 70%)' }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.015) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
        >
          <div className="inline-flex px-4 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase text-orange-300/70 bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-6">
            Get Started
          </div>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-poppins tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
        >
          Ready to build something
          <br />
          <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
            great together?
          </span>
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-slate-400 font-inter max-w-lg mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
        >
          Let&apos;s talk about your project and find the perfect solution for
          your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
          className="mt-10"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-b from-orange-500 to-orange-600 text-white text-base font-semibold shadow-[0_8px_24px_-4px_rgba(249,115,22,0.4)] transition-all duration-300 ease-out hover:shadow-[0_12px_36px_-6px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Start Your Project</span>
            <ArrowUpRight
              size={18}
              className="relative transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
