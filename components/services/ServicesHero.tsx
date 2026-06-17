'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function ServicesHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950" aria-label="Services Hero">
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen" aria-hidden="true">
        {/* Subtle grid and glowing orbs */}
        <div className="absolute top-[30%] left-[10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-slate-300 mb-8 backdrop-blur-md font-poppins mx-auto"
        >
          <Sparkles size={14} className="text-blue-400" /> Capabilities & Solutions
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-white mb-8 font-montserrat leading-[1.05] tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Growth</span> <br className="hidden md:block"/>
          Architectures.
        </motion.h1>
        
        <motion.p
          className="text-xl text-slate-400 mb-12 font-poppins leading-relaxed max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          We don&apos;t just offer services; we deploy full-stack systems designed to give you an undeniable competitive advantage in your market.
        </motion.p>
      </div>
    </section>
  );
}
