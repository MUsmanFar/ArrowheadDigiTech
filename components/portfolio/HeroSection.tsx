import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-40 pb-24 px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-blue-200/50 text-blue-700 text-sm font-semibold uppercase tracking-widest mb-8 font-poppins shadow-sm"
        >
          <Sparkles size={16} className="text-blue-500" /> Premium Capabilities
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
          className="text-6xl md:text-8xl font-extrabold text-slate-900 mb-8 font-montserrat tracking-tighter leading-[1.1]"
        >
          Engineering <br />
          <span className="text-gradient">Digital Excellence</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-600 mb-12 font-poppins max-w-3xl mx-auto leading-relaxed"
        >
          We don&apos;t just build websites; we craft immersive digital experiences. Arrowhead DigiTech bridges the gap between visionary design and enterprise-grade performance.
        </motion.p>
      </div>
    </section>
  );
}
