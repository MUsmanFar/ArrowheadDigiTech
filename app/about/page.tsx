'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/about/redesign/AboutHero';
import AboutStory from '@/components/about/redesign/AboutStory';
import AboutMissionVision from '@/components/about/redesign/AboutMissionVision';
import AboutAchievements from '@/components/about/redesign/AboutAchievements';
import AboutFounder, { AboutTrustQuotes } from '@/components/about/redesign/AboutFounder';
import AboutTeam from '@/components/about/redesign/AboutTeam';
import LazySection from '@/components/ui/LazySection';
import CtaBlock from '@/components/design-system/CtaBlock';

const ProcessTimeline = dynamic(() => import('@/components/home/redesign/ProcessTimeline'));

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-page-surface selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <main id="main-content">
        <AboutHero />
        <AboutAchievements />
        <AboutStory />
        <AboutMissionVision />
        <LazySection>
          <AboutFounder />
        </LazySection>
        <LazySection>
          <AboutTeam />
        </LazySection>
        <LazySection>
          <ProcessTimeline />
        </LazySection>
        <LazySection>
          <AboutTrustQuotes />
        </LazySection>
        <LazySection>
          <CtaBlock />
        </LazySection>
      </main>

      <Footer />
    </div>
  );
}
