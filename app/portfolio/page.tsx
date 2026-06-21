'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import ProjectShowcase from '@/components/portfolio/ProjectShowcase';
import TestimonialSection from '@/components/home/TestimonialSection';
import CtaSection from '@/components/portfolio/CtaSection';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange-200 selection:text-orange-900">
      <Navbar />

      <main id="main-content">
        <PortfolioHero />

        <ProjectShowcase />

        <TestimonialSection />

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
