'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';

const FounderSection = dynamic(() => import('@/components/about/FounderSection'), { ssr: false });
const AboutTrustLayer = dynamic(() => import('@/components/about/AboutTrustLayer'), { ssr: false });
const Manifesto = dynamic(() => import('@/components/about/Manifesto'), { ssr: false });
const ProcessTimeline = dynamic(() => import('@/components/portfolio/ProcessTimeline'), { ssr: false });
const CtaSection = dynamic(() => import('@/components/portfolio/CtaSection'), { ssr: false });

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange-200 selection:text-orange-900">
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-36 pb-20 px-6 lg:px-8 overflow-hidden bg-white border-b border-slate-100">
          <div className="absolute inset-0 subtle-grid opacity-30 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                About Arrowhead DigiTech
              </span>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 font-poppins tracking-tight leading-[1.05]">
                We build digital platforms that deliver measurable outcomes.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-500 font-inter leading-relaxed max-w-2xl">
                A founder-led development shop that has delivered 7 platforms across 5 industries
                &mdash; from ride-sharing apps and healthcare recruitment portals to travel booking and
                automotive marketplaces.
              </p>
            </motion.div>
          </div>
        </section>

        <AboutTrustLayer />

        <FounderSection />

        <Manifesto />

        <ProcessTimeline />

        <CtaSection />

      </main>

      <Footer />
    </div>
  );
}
