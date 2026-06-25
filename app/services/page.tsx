'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServicesHero from '@/components/services/ServicesHero';
import StickyServiceBlock from '@/components/services/StickyServiceBlock';
import DynamicOutcomesTicker from '@/components/services/DynamicOutcomesTicker';
import CtaSection from '@/components/portfolio/CtaSection';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';
import { useSiteSection } from '@/lib/use-site-content';

const CARD_GRADIENTS = [
  'from-blue-600 to-indigo-900',
  'from-emerald-600 to-teal-900',
  'from-purple-600 to-pink-900',
  'from-orange-500 to-red-900',
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { studies } = useCaseStudies();
  const { section: trustedBy } = useSiteSection('services.trusted-by');
  const mediaMap = useProjectMediaMap();

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
        // empty state shown below
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-orange-200 selection:text-orange-900">
      <Navbar />

      <main id="main-content">
        <ServicesHero />

        {loading ? (
          <div className="py-32 flex justify-center">
            <div className="w-10 h-10 border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="py-32 text-center text-slate-500 font-inter">No services published yet.</div>
        ) : (
          <section className="py-20 md:py-28 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
                className="max-w-xl mb-14"
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                  What We Offer
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 font-poppins tracking-tight">
                  Explore our capabilities
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => {
                  const featuresList = service.deliverables
                    ? service.deliverables
                        .split(',')
                        .map((f: string) => f.trim())
                        .slice(0, 3)
                    : [];

                  return (
                    <StickyServiceBlock
                      key={service.slug || index}
                      index={index}
                      title={service.title}
                      description={service.description}
                      features={featuresList}
                      slug={service.slug}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Trust Section */}
        <section className="border-t border-b border-slate-100 bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                {trustedBy.badge}
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 font-poppins tracking-tight">
                {trustedBy.headline}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {studies.slice(0, 4).map((study, i) => {
                const studyMedia = mediaMap.get(study.slug);
                const thumb = thumbnailFor(studyMedia) || study.thumbnail;
                return (
                  <motion.div
                    key={study.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
                  >
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="block p-6 rounded-xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-200"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 mb-4">
                        {thumb ? (
                          <Image
                            src={thumb}
                            alt={study.client}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-slate-100" />
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 font-poppins">{study.client}</h3>
                      <p className="text-xs text-slate-400 font-inter mt-1">{study.industry}</p>
                      <div className="mt-3 flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-orange-600">{study.metrics[0]?.value}</span>
                        <span className="text-[10px] text-slate-400">{study.metrics[0]?.label}</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <DynamicOutcomesTicker />

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
