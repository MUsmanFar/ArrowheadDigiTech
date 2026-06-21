'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="py-28 md:py-36 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 font-poppins tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
        >
          Ready to build something
          <br />
          <span className="text-orange-500">great together?</span>
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-slate-500 font-inter max-w-lg mx-auto"
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
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-orange-500 text-white text-base font-semibold transition-all duration-300 ease-out hover:bg-orange-600 hover:shadow-[0_12px_30px_-8px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Your Project
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
