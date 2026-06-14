'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Zap, Target, Users, TrendingUp, Sparkles, Code2, Rocket, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const benefits = [
  {
    icon: Zap,
    title: 'Fast Results',
    description: 'See measurable improvements within the first 90 days of our partnership.',
  },
  {
    icon: Target,
    title: 'Targeted Strategy',
    description: 'Data-driven approaches tailored to your specific business goals.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Work with certified professionals with years of industry experience.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'Services that grow with your business and adapt to changing needs.',
  },
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
          setServices(data);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-dot-grid">
      <Navbar />
      <main id="main-content">

      {/* Decorative Glow Elements */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 right-1/4 w-[450px] h-[450px] bg-cyan-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-indigo-300/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 text-blue-600 border border-blue-100/50 text-xs font-semibold uppercase tracking-wider mb-6 font-poppins"
            >
              <Sparkles size={12} className="text-blue-500" /> Professional Capabilities
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 font-montserrat tracking-tight"
            >
              Our Digital <span className="text-gradient-blue">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-slate-600 mb-8 font-poppins leading-relaxed"
            >
              Accelerate your digital growth with state-of-the-art software systems, hyper-converting marketing funnels, and expert engineering execution.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 px-6 lg:px-8 relative z-10" aria-label="Services List">
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">All Services</h2>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-poppins bg-white/40 backdrop-blur-md border border-slate-200/50 rounded-3xl max-w-lg mx-auto">
              No digital services found in the database.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const featuresList = service.deliverables 
                  ? service.deliverables.split(',').map((f: string) => f.trim()).slice(0, 3) 
                  : ['Professional Design', 'Mobile-Responsive', 'SEO Ready'];

                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 3) * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="h-full"
                  >
                    <Link href={`/services/${service.slug}`} className="block h-full" aria-label={`Learn more about ${service.title}`}>
                      <div className="glass-card p-8 rounded-2xl h-full flex flex-col justify-between relative group cursor-pointer overflow-hidden border border-white/50 shadow-md">
                        {/* Glow effect on hover */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl group-hover:bg-blue-400/10 transition-colors pointer-events-none" />
                        
                        <div>
                          <div className="text-3xl mb-6 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                            {service.icon || '💻'}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-montserrat mb-3">
                            {service.title}
                          </h3>
                          <p className="text-slate-500 font-poppins mb-6 line-clamp-3 leading-relaxed text-sm">
                            {service.description}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <ul className="space-y-2.5 mb-6 border-t border-slate-100/50 pt-5">
                            {featuresList.map((feature: string) => (
                              <li key={feature} className="flex items-center text-xs text-slate-500 font-medium font-poppins">
                                <CheckCircle className="w-3.5 h-3.5 mr-2 text-emerald-500 flex-shrink-0" />
                                <span className="truncate">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:translate-x-1.5 transition-transform font-poppins">
                            Learn more <ArrowRight className="ml-1.5" size={14} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white/40 backdrop-blur-md border-y border-slate-100/80 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50/80 border border-blue-100/50 px-3.5 py-1.5 rounded-full font-poppins">Partnership Value</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-4 mb-4 font-montserrat tracking-tight">
              Why Partner With Us
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-poppins">
              We design and execute custom digital solutions built to scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="glass p-6 rounded-2xl border border-white hover:border-blue-200/50 hover:shadow-lg transition-all duration-300 text-center h-full flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <benefit.icon size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 font-montserrat text-base">{benefit.title}</h3>
                  <p className="text-slate-500 text-xs font-poppins leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-saas-grid opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent opacity-65 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-montserrat tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Accelerate Growth?
          </motion.h2>
          <motion.p
            className="text-lg mb-8 text-slate-300 font-poppins max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Book a complimentary strategy consultation to audit your digital architecture and explore software integration paths.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 py-6 px-8 transition-all duration-300 hover:scale-[1.02]">
                Book Free Consultation
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
