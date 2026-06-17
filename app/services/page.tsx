'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServicesHero from '@/components/services/ServicesHero';
import StickyServiceBlock from '@/components/services/StickyServiceBlock';
import DynamicOutcomesTicker from '@/components/services/DynamicOutcomesTicker';
import CtaSection from '@/components/portfolio/CtaSection';

const fallbackServices = [
  {
    slug: 'custom-software-engineering',
    title: 'Custom Software Engineering',
    description: 'We architect scalable, high-performance web applications and SaaS platforms designed to handle enterprise loads with zero downtime.',
    features: ['React & Next.js Architecture', 'Cloud-Native Infrastructure', 'API Development & Integration'],
  },
  {
    slug: 'acquisition-funnels',
    title: 'Acquisition Funnels',
    description: 'Data-driven marketing systems that predictably convert cold traffic into qualified enterprise leads at scale.',
    features: ['Performance Marketing', 'Conversion Rate Optimization', 'Automated Lead Nurturing'],
  },
  {
    slug: 'ui-ux-architecture',
    title: 'UI/UX Architecture',
    description: 'Premium digital interfaces designed to maximize user engagement, trust, and ultimately, conversion rates.',
    features: ['Interaction Design', 'Design Systems', 'User Research & Testing'],
  }
];

const gradients = [
  'from-blue-500 to-cyan-400',
  'from-indigo-500 to-purple-500',
  'from-emerald-400 to-teal-500',
  'from-orange-400 to-pink-500'
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch('/api/admin/services');
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setServices(data);
          } else {
            setServices(fallbackServices);
          }
        } else {
          setServices(fallbackServices);
        }
      } catch (err) {
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="min-h-screen relative bg-slate-50 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      
      <main id="main-content">
        <ServicesHero />
        
        {loading ? (
          <div className="py-32 flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative bg-white z-10">
            {services.map((service, index) => {
              const featuresList = service.deliverables 
                ? service.deliverables.split(',').map((f: string) => f.trim()).slice(0, 3) 
                : service.features || ['Premium Design', 'Scalable Architecture', 'High ROI'];
                
              const gradient = gradients[index % gradients.length];
              const align = index % 2 === 0 ? 'left' : 'right';

              return (
                <StickyServiceBlock 
                  key={service.slug || index}
                  index={index + 1}
                  title={service.title}
                  description={service.description}
                  features={featuresList}
                  slug={service.slug}
                  align={align}
                  gradient={gradient}
                />
              );
            })}
          </div>
        )}

        <DynamicOutcomesTicker />

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
