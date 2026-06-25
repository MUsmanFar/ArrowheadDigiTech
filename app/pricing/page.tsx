'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSiteSection } from '@/lib/use-site-content';
import Link from 'next/link';

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

  const tierLabels = plans.map((plan) => plan.name);
  const comparisonFeatures = [...new Set(plans.flatMap((plan) => plan.features))];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-montserrat">
              {page.heroTitle} <span className="text-gradient-blue">{page.heroTitleAccent}</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">{page.heroDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {plans.length === 0 ? (
            <p className="text-center text-slate-500 py-12">Pricing packages coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative ${plan.popular ? 'border-blue-500 border-2' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-green-500" size={20} />
                            <span className="text-slate-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        variant={plan.popular ? 'primary' : 'outline'}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      {plans.length > 0 && comparisonFeatures.length > 0 && (
        <section className="py-24 bg-white/50 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-montserrat">
              {page.compareTitle}
            </h2>
            <p className="text-xl text-slate-600">{page.compareDescription}</p>
            </motion.div>

            <div className="overflow-x-auto">
              <Card>
                <CardContent className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-4 font-semibold text-slate-900">Feature</th>
                        {plans.map((plan, index) => (
                          <th
                            key={plan.id}
                            className={`text-center py-4 px-4 font-semibold ${
                              plan.popular ? 'text-blue-600' : 'text-slate-900'
                            }`}
                          >
                            {tierLabels[index] || plan.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((feature) => (
                        <tr key={feature} className="border-b last:border-b-0">
                          <td className="py-4 px-4 text-slate-700">{feature}</td>
                          {plans.map((plan) => (
                            <td
                              key={`${plan.id}-${feature}`}
                              className={`py-4 px-4 text-center ${
                                plan.popular ? 'text-blue-600 font-medium' : 'text-slate-600'
                              }`}
                            >
                              {plan.features.includes(feature) ? (
                                <CheckCircle className="w-5 h-5 mx-auto text-green-500" size={20} />
                              ) : (
                                '—'
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {page.ctaTitle}
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-blue-100"
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
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                {page.ctaButtonLabel} <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
