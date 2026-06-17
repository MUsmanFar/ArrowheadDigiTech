'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CreditCard, HeartPulse, ShoppingCart, Settings } from 'lucide-react';

const industries = [
  {
    id: 'fintech',
    name: 'FinTech',
    icon: CreditCard,
    description: 'We build secure, high-frequency trading platforms and neo-banking architectures with bank-grade encryption and real-time ledger synchronization.',
    gradient: 'from-blue-600 to-indigo-800',
    stats: ['PCI-DSS Compliant', 'Sub-10ms Latency']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: HeartPulse,
    description: 'HIPAA-compliant telemedicine applications, electronic health record (EHR) systems, and secure patient data routing architectures.',
    gradient: 'from-emerald-600 to-teal-800',
    stats: ['HIPAA Compliant', 'End-to-End Encryption']
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    icon: ShoppingCart,
    description: 'Headless commerce platforms optimized for extreme conversion rates, featuring sub-second load times and immersive 3D product configurations.',
    gradient: 'from-orange-500 to-red-700',
    stats: ['Sub-second Loads', 'Headless CMS Integration']
  },
  {
    id: 'enterprise',
    name: 'Enterprise SaaS',
    icon: Settings,
    description: 'Scalable multi-tenant architectures, complex data visualization dashboards, and resilient microservices designed for massive B2B user bases.',
    gradient: 'from-purple-600 to-indigo-900',
    stats: ['Multi-Tenant Architecture', '99.99% Uptime SLA']
  }
];

export default function IndustryExpertise() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);

  return (
    <section className="py-32 bg-white relative z-10" aria-label="Industry Expertise">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-poppins mb-4 block">Domain Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-montserrat tracking-tight">
            Built for Complex Industries.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 min-h-[600px]">
          
          {/* Tab Selection */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveIndustry(ind)}
                className={`w-full text-left p-6 md:p-8 rounded-2xl transition-all duration-300 border ${
                  activeIndustry.id === ind.id 
                    ? 'bg-slate-50 border-slate-200 shadow-sm' 
                    : 'bg-transparent border-transparent hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className={`p-2 rounded-lg ${activeIndustry.id === ind.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>
                    <ind.icon size={24} />
                  </div>
                  <h3 className={`text-2xl font-bold font-montserrat transition-colors ${activeIndustry.id === ind.id ? 'text-slate-900' : 'text-slate-500'}`}>
                    {ind.name}
                  </h3>
                </div>
                
                <AnimatePresence>
                  {activeIndustry.id === ind.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-600 font-poppins leading-relaxed mt-4">
                        {ind.description}
                      </p>
                      <div className="flex gap-4 mt-6">
                        {ind.stats.map((stat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Shield className="text-emerald-500" size={14} />
                            <span className="text-xs font-bold text-slate-700 font-poppins">{stat}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Visual Display */}
          <div className="lg:col-span-7 relative rounded-[2.5rem] overflow-hidden bg-slate-100 flex items-center justify-center p-8 md:p-12 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${activeIndustry.gradient} opacity-20 blur-3xl rounded-full`} />
                
                {/* Abstract UI Representation */}
                <div className="relative z-10 w-full h-full bg-white/60 backdrop-blur-xl border border-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col">
                  {/* Top Bar */}
                  <div className="flex justify-between items-center mb-8 border-b border-slate-200/50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                        <activeIndustry.icon size={20} />
                      </div>
                      <div className="h-4 w-32 bg-slate-200 rounded-md" />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100" />
                      <div className="w-8 h-8 rounded-full bg-slate-100" />
                    </div>
                  </div>

                  {/* Main Content Area Simulation */}
                  <div className="flex-1 grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-4">
                      <div className="h-32 w-full bg-slate-100 rounded-2xl" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-slate-100 rounded-2xl" />
                        <div className="h-24 bg-slate-100 rounded-2xl" />
                      </div>
                    </div>
                    <div className="col-span-1 space-y-4">
                      <div className="h-16 w-full bg-slate-100 rounded-2xl" />
                      <div className="h-40 w-full bg-slate-100 rounded-2xl" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
