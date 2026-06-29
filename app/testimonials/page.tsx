'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageShell } from '@/components/hercules';
import HerculesTestimonials from '@/components/hercules/home/HerculesTestimonials';
import CtaBlock from '@/components/design-system/CtaBlock';

export default function TestimonialsPage() {
  return (
    <PageShell>
      <Navbar />
      <main id="main-content">
        <HerculesTestimonials />
        <CtaBlock />
      </main>
      <Footer />
    </PageShell>
  );
}
