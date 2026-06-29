'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageShell } from '@/components/hercules';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import ProjectShowcase from '@/components/portfolio/ProjectShowcase';
import TestimonialSection from '@/components/home/TestimonialSection';
import CtaBlock from '@/components/design-system/CtaBlock';

export default function PortfolioPage() {
  return (
    <PageShell>
      <Navbar />
      <main id="main-content">
        <PortfolioHero />
        <ProjectShowcase />
        <TestimonialSection />
        <CtaBlock />
      </main>
      <Footer />
    </PageShell>
  );
}
