'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HorizontalScrollGallery from '@/components/portfolio/HorizontalScrollGallery';
import dynamic from 'next/dynamic';

const IndustryExpertise = dynamic(() => import('@/components/portfolio/IndustryExpertise'), { ssr: false });
const TechStackMarquee = dynamic(() => import('@/components/portfolio/TechStackMarquee'), { ssr: false });
const ProcessTimeline = dynamic(() => import('@/components/portfolio/ProcessTimeline'), { ssr: false });
const CtaSection = dynamic(() => import('@/components/portfolio/CtaSection'), { ssr: false });

export default function PortfolioPage() {
  return (
    <div className="min-h-screen relative bg-slate-950 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      
      <main id="main-content">
        
        {/* Horizontal Scroll Gallery automatically contains its own sticky header and replaces the traditional hero/grid */}
        <HorizontalScrollGallery />

        <div className="bg-white rounded-t-[3rem] lg:rounded-t-[5rem] relative z-20 -mt-10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <IndustryExpertise />
          
          <TechStackMarquee />
          
          <ProcessTimeline />
          
          <CtaSection />
        </div>

      </main>
      <Footer />
    </div>
  );
}
