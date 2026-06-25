'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
import { useSiteSection } from '@/lib/use-site-content';

const FounderSection = dynamic(() => import('@/components/about/FounderSection'), { ssr: false });
const TeamSection = dynamic(() => import('@/components/about/TeamSection'), { ssr: false });
const AboutTrustLayer = dynamic(() => import('@/components/about/AboutTrustLayer'), { ssr: false });
const Manifesto = dynamic(() => import('@/components/about/Manifesto'), { ssr: false });
const ProcessTimeline = dynamic(() => import('@/components/portfolio/ProcessTimeline'), { ssr: false });
const CtaSection = dynamic(() => import('@/components/portfolio/CtaSection'), { ssr: false });

export default function AboutPage() {
  const { section: hero } = useSiteSection('about.hero');

  return (
    <div className="min-h-screen bg-white selection:bg-orange-200 selection:text-orange-900">
      <Navbar />

      <main id="main-content">
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
                {hero.badge}
              </span>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 font-poppins tracking-tight leading-[1.05]">
                {hero.headline}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-500 font-inter leading-relaxed max-w-2xl">
                {hero.subheadline}
              </p>
            </motion.div>
          </div>
        </section>

        <AboutTrustLayer />
        <FounderSection />
        <TeamSection />
        <Manifesto />
        <ProcessTimeline />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
