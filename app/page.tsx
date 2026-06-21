'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';

const MetricsBar = dynamic(() => import('@/components/home/MetricsBar'), { ssr: false });
const CapabilitiesHover = dynamic(() => import('@/components/home/CapabilitiesHover'), { ssr: false });
const FeaturedCaseStudy = dynamic(() => import('@/components/home/FeaturedCaseStudy'), { ssr: false });
const TestimonialSection = dynamic(() => import('@/components/home/TestimonialSection'), { ssr: false });
const CtaSection = dynamic(() => import('@/components/portfolio/CtaSection'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange-200 selection:text-orange-900">
      <Navbar />
      
      <main id="main-content">
        <HeroSection />
        <MetricsBar />
        <CapabilitiesHover />
        <FeaturedCaseStudy />
        <TestimonialSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
