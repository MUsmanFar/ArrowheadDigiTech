'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const capabilities = [
  {
    id: 'engineering',
    title: 'Custom Engineering',
    tag: 'Development',
    color: 'bg-blue-500'
  },
  {
    id: 'acquisition',
    title: 'Acquisition Funnels',
    tag: 'Marketing',
    color: 'bg-cyan-500'
  },
  {
    id: 'architecture',
    title: 'UI/UX Architecture',
    tag: 'Design',
    color: 'bg-indigo-500'
  },
  {
    id: 'ai',
    title: 'AI Integrations',
    tag: 'Automation',
    color: 'bg-purple-500'
  }
];

export default function CapabilitiesHover() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-slate-50 relative z-10 border-y border-slate-200/50" aria-label="Capabilities">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-poppins mb-4 block">Core Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-montserrat tracking-tight">
              Enterprise Grade Solutions.
            </h2>
          </div>
          <Link href="/services" className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold font-poppins transition-colors">
            Explore all services
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="relative">
          {/* Main List */}
          <div className="border-t border-slate-200">
            {capabilities.map((item, index) => (
              <Link key={item.id} href="/services">
                <div 
                  className="group relative flex items-center justify-between py-8 md:py-12 border-b border-slate-200 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center gap-8 relative z-10">
                    <span className="text-slate-300 font-bold font-poppins text-lg w-8 transition-colors group-hover:text-blue-200">0{index + 1}</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-slate-900 font-montserrat tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-6">
                    <span className="hidden md:inline-block px-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500 font-poppins group-hover:bg-white group-hover:border-white transition-colors">
                      {item.tag}
                    </span>
                    <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-45">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  {/* Hover background slide */}
                  <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 group-hover:origin-top transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0 shadow-[0_0_40px_rgba(0,0,0,0.03)]" />
                </div>
              </Link>
            ))}
          </div>

          {/* Floating Image Reveal (Desktop only) */}
          <div className="hidden lg:block absolute right-[20%] top-1/2 -translate-y-1/2 pointer-events-none z-20 w-80 aspect-[4/5]">
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  transition={{ duration: 0.4, ease: "backOut" }}
                  className={`w-full h-full rounded-2xl ${capabilities[hoveredIndex].color} shadow-2xl relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-white font-bold font-montserrat text-2xl">{capabilities[hoveredIndex].title}</div>
                    <div className="text-white/80 font-poppins text-sm mt-2">Discover how we build scalable {capabilities[hoveredIndex].tag.toLowerCase()} architectures.</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
