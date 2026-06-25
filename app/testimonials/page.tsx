'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TestimonialSection from '@/components/home/TestimonialSection';
import { useSiteSection } from '@/lib/use-site-content';

export default function TestimonialsPage() {
  const { section: hero } = useSiteSection('testimonials.page');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">
        <section className="pt-36 pb-16 px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            {hero.badge && (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                {hero.badge}
              </span>
            )}
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 font-poppins tracking-tight">
              {hero.headline}{' '}
              {hero.headlineAccent && <span className="text-orange-500">{hero.headlineAccent}</span>}
            </h1>
            {hero.subheadline && (
              <p className="mt-6 text-lg text-slate-500 font-inter max-w-2xl mx-auto">{hero.subheadline}</p>
            )}
          </div>
        </section>
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}
