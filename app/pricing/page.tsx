'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageShell, PageHero, PremiumCta } from '@/components/hercules';
import GlassCard from '@/components/hercules/ui/GlassCard';
import HerculesButton from '@/components/hercules/ui/HerculesButton';
import Reveal from '@/components/hercules/ui/Reveal';
import { useSiteSection } from '@/lib/use-site-content';

interface PricingPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  order: number;
}

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPackage[]>([]);
  const { section: page } = useSiteSection('pricing.page');

  useEffect(() => {
    fetch('/api/public/pricing')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setPlans([...data].sort((a, b) => a.order - b.order));
        }
      })
      .catch(() => {});
  }, []);

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

        <section className="pb-24">
          <div className="container-premium">
            {plans.length === 0 ? (
              <p className="py-12 text-center font-montserrat text-slate-500">
                Pricing packages coming soon.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan, index) => (
                  <Reveal key={plan.id} delay={index * 80}>
                    <GlassCard
                      hover
                      padding="lg"
                      className={`relative h-full ${plan.popular ? 'ring-2 ring-[#e46f1e]/30' : ''}`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#e46f1e] px-4 py-1 font-montserrat text-xs font-semibold text-white">
                          Most Popular
                        </span>
                      )}
                      <h3 className="font-poppins text-2xl font-bold text-slate-900">{plan.name}</h3>
                      <p className="mt-2 font-montserrat text-sm text-slate-500">{plan.description}</p>
                      <p className="mt-6 font-poppins text-4xl font-bold text-slate-900">{plan.price}</p>
                      <ul className="mt-8 space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 font-montserrat text-sm text-slate-600">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <HerculesButton href="/contact" variant={plan.popular ? 'primary' : 'secondary'} className="w-full justify-center">
                          Get Started
                        </HerculesButton>
                      </div>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        <PremiumCta />
      </main>
      <Footer />
    </PageShell>
  );
}
