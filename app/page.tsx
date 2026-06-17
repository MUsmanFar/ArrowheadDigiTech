'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';

const StickyThesis = dynamic(() => import('@/components/home/StickyThesis'), { ssr: false });
const CapabilitiesHover = dynamic(() => import('@/components/home/CapabilitiesHover'), { ssr: false });
const MetricsBar = dynamic(() => import('@/components/home/MetricsBar'), { ssr: false });
const FeaturedCaseStudy = dynamic(() => import('@/components/home/FeaturedCaseStudy'), { ssr: false });
const CtaSection = dynamic(() => import('@/components/portfolio/CtaSection'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      
      <main id="main-content">
        <HeroSection />
        
        <StickyThesis />
        
        <CapabilitiesHover />
        
        <MetricsBar />
        
        <FeaturedCaseStudy />

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
