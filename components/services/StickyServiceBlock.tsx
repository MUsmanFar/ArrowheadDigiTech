'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface StickyServiceBlockProps {
  index: number;
  title: string;
  description: string;
  features: string[];
  slug: string;
  align: 'left' | 'right';
  gradient: string;
}

export default function StickyServiceBlock({ index, title, description, features, slug, align, gradient }: StickyServiceBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yVisual = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacityVisual = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className={`flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 lg:gap-24`}>
          
          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <span className="text-4xl font-black text-slate-200 font-montserrat mb-6 block">0{index}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-montserrat tracking-tight leading-tight mb-6">
              {title}
            </h2>
            <p className="text-xl text-slate-600 font-poppins leading-relaxed mb-8">
              {description}
            </p>
            
            <ul className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-poppins text-lg">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href={`/services/${slug}`} className="inline-flex items-center gap-3 text-white bg-slate-900 hover:bg-blue-600 transition-colors py-4 px-8 rounded-full font-semibold font-poppins group">
              Explore Capability <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Visual Demonstration */}
          <div className="w-full md:w-1/2 h-[500px] lg:h-[600px] relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center p-8 group">
            {/* We simulate a premium UI mockup or abstract representation using framer-motion */}
            <motion.div 
              style={{ y: yVisual, opacity: opacityVisual }}
              className="w-full h-full relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-10 blur-3xl`} />
              
              <div className="absolute inset-4 rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
                <div className="h-10 border-b border-slate-100 flex items-center px-4 gap-2 bg-slate-50/50">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 p-6 relative">
                  <div className={`absolute -right-10 -bottom-10 w-64 h-64 bg-gradient-to-br ${gradient} rounded-full opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                  <div className="w-3/4 h-6 bg-slate-100 rounded-md mb-4" />
                  <div className="w-full h-32 bg-slate-50 rounded-xl border border-slate-100 mb-4" />
                  <div className="w-1/2 h-4 bg-slate-100 rounded-md mb-2" />
                  <div className="w-2/3 h-4 bg-slate-100 rounded-md" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
