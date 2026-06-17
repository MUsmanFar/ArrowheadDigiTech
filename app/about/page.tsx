'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';

const FounderLetter = dynamic(() => import('@/components/about/FounderLetter'), { ssr: false });
const Manifesto = dynamic(() => import('@/components/about/Manifesto'), { ssr: false });
const CredibilityStrip = dynamic(() => import('@/components/about/CredibilityStrip'), { ssr: false });
const ProcessTimeline = dynamic(() => import('@/components/portfolio/ProcessTimeline'), { ssr: false });
const CtaSection = dynamic(() => import('@/components/portfolio/CtaSection'), { ssr: false });

export default function AboutPage() {
  return (
    <div className="min-h-screen relative bg-slate-50 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      
      <main id="main-content">
        
        {/* Editorial Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 opacity-40 mix-blend-screen" aria-hidden="true">
            {/* Cinematic abstract backdrop */}
            <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-[6rem] font-bold font-montserrat tracking-tighter leading-[1.05] mb-8"
            >
              We engineer digital <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                unfair advantages.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-xl md:text-2xl text-slate-400 font-poppins max-w-2xl mx-auto leading-relaxed font-light"
            >
              An elite collective of engineers, designers, and growth architects built for the modern enterprise.
            </motion.p>
          </div>
        </section>

        <CredibilityStrip />

        <FounderLetter />

        <Manifesto />

        <ProcessTimeline />

        <CtaSection />

      </main>

      <Footer />
    </div>
  );
}
