'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LazySection from '@/components/ui/LazySection';
import EmptyState from '@/components/design-system/EmptyState';
import CtaBlock from '@/components/design-system/CtaBlock';
import ServicesHeroRedesign from '@/components/services/redesign/ServicesHeroRedesign';
import ServicesGrid from '@/components/services/redesign/ServicesGrid';
import ServicesTrust from '@/components/services/redesign/ServicesTrust';
import ServicesIndustries from '@/components/services/redesign/ServicesIndustries';
import ServicesTechnology from '@/components/services/redesign/ServicesTechnology';
import ServicesFaq from '@/components/services/redesign/ServicesFaq';
import ServicesBenefits from '@/components/services/redesign/ServicesBenefits';

const ProcessTimeline = dynamic(() => import('@/components/home/redesign/ProcessTimeline'));

export default function ServicesPage() {
  const [services, setServices] = useState<
    { slug: string; title: string; description: string; deliverables?: string; order?: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch('/api/public/services');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setServices([...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
          }
        }
      } catch {
        // empty state below
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="min-h-screen bg-page-surface selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <main id="main-content">
        <ServicesHeroRedesign />

        {loading ? (
          <div className="py-32 flex justify-center" role="status" aria-label="Loading services">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" />
          </div>
        ) : services.length === 0 ? (
          <div className="container-premium py-20">
            <EmptyState title="No services published yet" />
          </div>
        ) : (
          <ServicesGrid services={services} />
        )}

        <LazySection>
          <ServicesBenefits />
        </LazySection>
        <LazySection>
          <ProcessTimeline />
        </LazySection>
        <LazySection>
          <ServicesTechnology />
        </LazySection>
        <LazySection>
          <ServicesTrust />
        </LazySection>
        <LazySection>
          <ServicesIndustries />
        </LazySection>
        <LazySection>
          <ServicesFaq />
        </LazySection>
        <LazySection>
          <CtaBlock />
        </LazySection>
      </main>

      <Footer />
    </div>
  );
}
