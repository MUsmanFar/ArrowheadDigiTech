'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FAQSection from '@/components/ui/FAQSection';
import { PageShell, PageHero, PremiumCta } from '@/components/hercules';
import HerculesButton from '@/components/hercules/ui/HerculesButton';
import GlassCard from '@/components/hercules/ui/GlassCard';
import { useSiteSection } from '@/lib/use-site-content';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { section: page } = useSiteSection('faq.page');

  useEffect(() => {
    async function loadFaqs() {
      try {
        const res = await fetch('/api/public/faqs');
        if (res.ok) {
          const data = await res.json();
          setFaqs(data);
        }
      } catch (err) {
        console.error('Failed to load FAQs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFaqs();
  }, []);

  const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category))).filter(Boolean)];

  const filteredFaqs =
    selectedCategory === 'All' ? faqs : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <PageShell>
      <Navbar />
      <main id="main-content">
        <PageHero
          title={`${page.heroTitle} ${page.heroTitleAccent}`}
          description={page.heroDescription}
          align="center"
          size="large"
        />

        <section className="pb-12">
          <div className="container-premium">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category: string) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2.5 font-montserrat text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#e46f1e] text-white shadow-[0_8px_24px_-8px_rgba(228,111,30,0.5)]'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-[#e46f1e]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-premium">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-orange-200 border-t-[#e46f1e]" />
              </div>
            ) : filteredFaqs.length === 0 ? (
              <p className="py-20 text-center font-montserrat text-slate-500">
                No questions found in this category.
              </p>
            ) : (
              <FAQSection faqs={filteredFaqs} />
            )}
          </div>
        </section>

        <section className="pb-24">
          <div className="container-premium max-w-2xl">
            <GlassCard padding="lg" className="text-center">
              <h2 className="font-poppins text-2xl font-bold text-slate-900">{page.ctaTitle}</h2>
              <p className="mt-3 font-montserrat text-slate-500">{page.ctaDescription}</p>
              <div className="mt-6">
                <HerculesButton href={page.ctaButtonHref} variant="primary">
                  {page.ctaButtonLabel}
                </HerculesButton>
              </div>
            </GlassCard>
          </div>
        </section>

        <PremiumCta />
      </main>
      <Footer />
    </PageShell>
  );
}
