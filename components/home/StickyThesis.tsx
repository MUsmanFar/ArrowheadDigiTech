'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const thesisPoints = [
  {
    id: '01',
    title: "We don't just build websites.",
    description: "We engineer digital ecosystems designed to capture attention and convert it into revenue.",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: '02',
    title: "We engineer digital moats.",
    description: "In a crowded market, generic solutions fail. We build bespoke architectures that give you an unfair advantage over competitors.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: '03',
    title: "We optimize for enterprise scale.",
    description: "From day one, our infrastructure is designed to handle immense traffic, rigorous security demands, and complex integrations.",
    gradient: "from-emerald-400 to-teal-500"
  }
];

export default function StickyThesis() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the active index based on scroll progress
  // We have 3 items, so progress 0-0.33 is item 0, 0.33-0.66 is item 1, 0.66-1 is item 2
  
  return (
    <section ref={containerRef} className="relative h-[300vh] bg-white" aria-label="Our Thesis">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Text Side */}
          <div className="relative h-[60vh] flex flex-col justify-center">
            {thesisPoints.map((point, i) => {
              // Create specific transforms for each item
              const start = i * 0.33;
              const end = (i + 1) * 0.33;
              const peak = start + 0.165; // Middle of the segment
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(
                scrollYProgress,
                [start - 0.1, start, peak, end, end + 0.1],
                [0, 1, 1, 0, 0]
              );
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(
                scrollYProgress,
                [start - 0.1, start, peak, end, end + 0.1],
                [50, 0, 0, -50, -50]
              );

              return (
                <motion.div 
                  key={point.id}
                  style={{ opacity, y }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                >
                  <span className="text-sm font-bold text-slate-400 tracking-widest font-poppins mb-6 block">
                    THESIS {point.id}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-montserrat tracking-tight leading-tight mb-6">
                    {point.title}
                  </h2>
                  <p className="text-xl text-slate-600 font-poppins leading-relaxed max-w-lg">
                    {point.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Visual Side */}
          <div className="relative h-[60vh] hidden md:flex items-center justify-center">
            <div className="w-full aspect-square max-w-md relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
              {thesisPoints.map((point, i) => {
                const start = i * 0.33;
                const end = (i + 1) * 0.33;
                const peak = start + 0.165;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(
                  scrollYProgress,
                  [start - 0.1, start, peak, end, end + 0.1],
                  [0, 1, 1, 0, 0]
                );
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(
                  scrollYProgress,
                  [start, peak, end],
                  [0.8, 1, 1.2]
                );

                return (
                  <motion.div
                    key={`visual-${point.id}`}
                    style={{ opacity }}
                    className="absolute inset-0 flex items-center justify-center p-8"
                  >
                    <motion.div 
                      style={{ scale }}
                      className={`w-full h-full rounded-2xl bg-gradient-to-br ${point.gradient} opacity-80 blur-2xl absolute`}
                    />
                    <motion.div 
                      style={{ scale }}
                      className={`w-3/4 h-3/4 rounded-2xl bg-gradient-to-br ${point.gradient} shadow-2xl relative z-10 border border-white/20 backdrop-blur-sm`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
