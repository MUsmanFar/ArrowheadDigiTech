'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturedCaseStudy() {
  return (
    <section className="bg-slate-950 py-32 relative z-10" aria-label="Featured Case Study">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <span className="text-sm font-bold text-blue-500 uppercase tracking-widest font-poppins">Featured Work</span>
        </div>

        <Link href="/case-studies" className="block group">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[70vh] min-h-[600px] w-full rounded-[2.5rem] overflow-hidden"
          >
            {/* Background Image / Gradient Fallback */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            
            {/* Overlay Gradient for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-between">
              {/* Top Row: Metrics / Tags */}
              <div className="flex justify-end">
                <div className="glass-strong border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md text-right transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="text-4xl md:text-5xl font-black text-white font-montserrat tracking-tight mb-1">
                    350<span className="text-blue-400">%</span>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-slate-300 font-bold font-poppins">
                    Increase in Lead Quality
                  </div>
                </div>
              </div>

              {/* Bottom Row: Title and CTA */}
              <div className="max-w-3xl transform group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-4 font-poppins">Enterprise SaaS Platform</div>
                <h3 className="text-4xl md:text-6xl font-bold text-white font-montserrat tracking-tight leading-tight mb-6">
                  Architecting a Scalable Acquisition Engine for TechFlow.
                </h3>
                
                <div className="flex items-center gap-6">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-900 rounded-full py-6 px-8 font-semibold backdrop-blur-md transition-all duration-300">
                    Read Case Study
                  </Button>
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white transform -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
