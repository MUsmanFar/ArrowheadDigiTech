'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FAQSection from '@/components/ui/FAQSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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

  // Compute dynamic categories present in loaded FAQs
  const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category))).filter(Boolean)];

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      <main id="main-content">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-b from-white to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-montserrat tracking-tight">
              {page.heroTitle} <span className="text-gradient-blue">{page.heroTitleAccent}</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 font-poppins leading-relaxed">
              {page.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Tabs */}
      <section className="pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category: any) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-poppins text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === category
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                    : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Grid */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-poppins">No questions found in this category.</div>
          ) : (
            <FAQSection faqs={filteredFaqs} />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-55 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-montserrat tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {page.ctaTitle}
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-slate-300 font-poppins"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {page.ctaDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href={page.ctaButtonHref}>
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-50 rounded-xl font-semibold shadow-lg">
                {page.ctaButtonLabel}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}
