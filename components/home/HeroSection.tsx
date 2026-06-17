'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Lazy load the R3F component to prevent SSR hydration issues and defer until page is interactive
const DeferredFloatingObjects = () => {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    const load3D = () => {
      import('@/components/3d/FloatingObjects').then((mod) => {
        setComponent(() => mod.default);
      });
    };

    if (typeof window !== 'undefined') {
      // Defer loading until browser is idle, and add a safety timeout
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          setTimeout(load3D, 800);
        });
      } else {
        setTimeout(load3D, 1500);
      }
    }
  }, []);

  if (!Component) return null;
  return <Component />;
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-slate-950" aria-label="Hero">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen" aria-hidden="true">
        <DeferredFloatingObjects />
        
        {/* Subtle atmospheric glows */}
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-lighten" />
        <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-lighten" />
      </div>

      {/* Grid overlay for texture */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 mt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-slate-300 mb-8 backdrop-blur-md font-poppins"
          >
            <Sparkles size={14} className="text-blue-400" /> Next-Generation Digital Partner
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-white mb-8 font-montserrat leading-[1.05] tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Architecting <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              Unfair Advantages
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-slate-400 mb-12 font-poppins leading-relaxed max-w-2xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            We design, build, and scale enterprise-grade software architectures and high-conversion acquisition funnels.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full py-7 px-10 font-bold text-lg shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-105 border border-blue-400/50">
                Initiate Project
              </Button>
            </Link>
            <Link href="/portfolio" className="group flex items-center gap-3 text-slate-300 hover:text-white transition-colors py-3 px-4 font-semibold text-lg font-poppins">
              View Showcase 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
