'use client';

import React from 'react';
import { MapPin, Clock, DollarSign, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageShell, PageHero, PremiumCta } from '@/components/hercules';
import GlassCard from '@/components/hercules/ui/GlassCard';
import Reveal from '@/components/hercules/ui/Reveal';
import { useSiteSection } from '@/lib/use-site-content';

export default function CareersPage() {
  const { section: page } = useSiteSection('careers.page');

  return (
    <PageShell>
      <Navbar />
      <main id="main-content">
        <PageHero
          title={page.heroTitle}
          titleAccent={page.heroTitleAccent}
          description={page.heroDescription}
          align="center"
          size="large"
        />

        <section className="hercules-section-muted py-20">
          <div className="container-premium">
            <Reveal className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="font-poppins text-3xl font-bold text-slate-900">{page.benefitsTitle}</h2>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.benefits.map((benefit, i) => (
                <Reveal key={benefit} delay={i * 60}>
                  <GlassCard soft hover padding="md">
                    <p className="font-montserrat text-sm text-slate-700">{benefit}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-premium">
            <Reveal className="mb-12 text-center">
              <h2 className="font-poppins text-3xl font-bold text-slate-900">{page.openingsTitle}</h2>
              <p className="mt-3 font-montserrat text-slate-500">{page.openingsDescription}</p>
            </Reveal>
            <div className="space-y-4">
              {page.openings.map((job, i) => (
                <Reveal key={job.title} delay={i * 80}>
                  <GlassCard hover padding="lg" className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-poppins text-xl font-bold text-slate-900">{job.title}</h3>
                      <p className="mt-2 font-montserrat text-sm text-slate-500">{job.description}</p>
                      <div className="mt-4 flex flex-wrap gap-4 font-montserrat text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                        <span className="inline-flex items-center gap-1"><Clock size={12} />{job.type}</span>
                        <span className="inline-flex items-center gap-1"><DollarSign size={12} />{job.salary}</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 font-montserrat text-sm font-semibold text-[#e46f1e]">
                      Apply <ArrowRight size={14} />
                    </span>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <PremiumCta />
      </main>
      <Footer />
    </PageShell>
  );
}
