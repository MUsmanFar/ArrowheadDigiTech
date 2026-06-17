'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FounderLetter() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yVisual = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="py-32 bg-white relative z-10 border-b border-slate-100" aria-label="Founder's Letter">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sticky Visual / Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <motion.div 
                style={{ y: yVisual }}
                className="aspect-[3/4] w-full rounded-[2rem] overflow-hidden relative shadow-2xl shadow-slate-200"
              >
                {/* Fallback visual representing the founder or office */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white bg-gradient-to-t from-black/80 to-transparent">
                  <div className="font-bold font-montserrat text-2xl">John Smith</div>
                  <div className="font-poppins text-sm text-slate-300">Founder & CEO, Arrowhead</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Text */}
          <div className="lg:col-span-7 pt-12">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs font-poppins mb-6 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-montserrat tracking-tight leading-[1.1] mb-12">
              We built the agency we wished existed.
            </h2>

            <div className="prose prose-lg prose-slate font-poppins leading-relaxed">
              <p>
                When we started Arrowhead DigiTech, the digital agency landscape was broken. We saw too many companies selling generic templates disguised as custom solutions, focusing on vanity metrics rather than actual business outcomes.
              </p>
              <p>
                We believed there was a better way. A way that combined high-end software engineering with ruthless conversion optimization. 
              </p>
              <p>
                Arrowhead was founded on a singular principle: <strong>to engineer unfair digital advantages for our partners.</strong> We don&apos;t just build websites; we architect scalable ecosystems designed to capture attention, build trust, and drive revenue.
              </p>
              <p>
                Over the years, we&apos;ve assembled a global team of obsessed engineers, designers, and growth architects. We treat every client&apos;s business as our own, investing deeply in understanding their unit economics, market positioning, and operational bottlenecks.
              </p>
              <p>
                If you&apos;re looking for an execution partner that operates at the intersection of enterprise software and elite marketing, you&apos;re in the right place.
              </p>
              <div className="mt-12">
                {/* Placeholder for Signature */}
                <div className="font-serif italic text-4xl text-slate-900">J. Smith</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
