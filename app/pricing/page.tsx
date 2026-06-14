'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const plans = [
  {
    name: 'Starter',
    price: '$999',
    period: '/month',
    description: 'Perfect for small businesses getting started',
    features: [
      { name: 'Basic Website', included: true },
      { name: '5 Pages', included: true },
      { name: 'Mobile Responsive', included: true },
      { name: 'Basic SEO', included: true },
      { name: 'Contact Form', included: true },
      { name: 'Analytics Setup', included: true },
      { name: 'Email Support', included: true },
      { name: 'Content Management', included: false },
      { name: 'Blog Functionality', included: false },
      { name: 'E-commerce', included: false },
      { name: 'Custom Integrations', included: false },
      { name: 'Priority Support', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '$2,499',
    period: '/month',
    description: 'Ideal for growing businesses',
    popular: true,
    features: [
      { name: 'Advanced Website', included: true },
      { name: '15 Pages', included: true },
      { name: 'Mobile Responsive', included: true },
      { name: 'Advanced SEO', included: true },
      { name: 'Contact Forms', included: true },
      { name: 'Analytics & Reports', included: true },
      { name: 'Priority Email Support', included: true },
      { name: 'Content Management', included: true },
      { name: 'Blog Functionality', included: true },
      { name: 'Basic E-commerce', included: true },
      { name: 'Custom Integrations', included: false },
      { name: 'Dedicated Account Manager', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Scale',
    price: '$4,999',
    period: '/month',
    description: 'For businesses ready to scale',
    features: [
      { name: 'Enterprise Website', included: true },
      { name: 'Unlimited Pages', included: true },
      { name: 'Mobile Responsive', included: true },
      { name: 'Enterprise SEO', included: true },
      { name: 'Advanced Forms', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: '24/7 Phone Support', included: true },
      { name: 'Advanced CMS', included: true },
      { name: 'Blog & Resources', included: true },
      { name: 'Full E-commerce', included: true },
      { name: 'Custom Integrations', included: true },
      { name: 'Dedicated Account Manager', included: true },
    ],
    cta: 'Get Started',
  },
];

const comparison = [
  { feature: 'Website Pages', starter: '5', growth: '15', scale: 'Unlimited' },
  { feature: 'SEO Optimization', starter: 'Basic', growth: 'Advanced', scale: 'Enterprise' },
  { feature: 'Support', starter: 'Email', growth: 'Priority Email', scale: '24/7 Phone' },
  { feature: 'E-commerce', starter: 'No', growth: 'Basic', scale: 'Full' },
  { feature: 'Custom Integrations', starter: 'No', growth: 'No', scale: 'Yes' },
  { feature: 'Account Manager', starter: 'No', growth: 'No', scale: 'Dedicated' },
];

export default function PricingPage() {
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
              Simple, Transparent <span className="text-gradient-blue">Pricing</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Choose the perfect plan for your business needs. All plans include our core features with no hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
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
                      <span className="text-slate-600">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-center">
                          {feature.included ? (
                            <CheckCircle className="w-5 h-5 mr-3 text-green-500" size={20} />
                          ) : (
                            <X className="w-5 h-5 mr-3 text-slate-300" size={20} />
                          )}
                          <span className={feature.included ? 'text-slate-700' : 'text-slate-400'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.popular ? 'primary' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-white/50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-montserrat">
              Compare Plans
            </h2>
            <p className="text-xl text-slate-600">
              See the differences between our pricing tiers
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <Card>
              <CardContent className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 font-semibold text-slate-900">Feature</th>
                      <th className="text-center py-4 px-4 font-semibold text-slate-900">Starter</th>
                      <th className="text-center py-4 px-4 font-semibold text-blue-600">Growth</th>
                      <th className="text-center py-4 px-4 font-semibold text-slate-900">Scale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, index) => (
                      <tr key={row.feature} className="border-b last:border-b-0">
                        <td className="py-4 px-4 text-slate-700">{row.feature}</td>
                        <td className="py-4 px-4 text-center text-slate-600">{row.starter}</td>
                        <td className="py-4 px-4 text-center text-blue-600 font-medium">{row.growth}</td>
                        <td className="py-4 px-4 text-center text-slate-600">{row.scale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Not Sure Which Plan to Choose?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Contact us for a custom quote tailored to your specific needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Custom Quote <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
