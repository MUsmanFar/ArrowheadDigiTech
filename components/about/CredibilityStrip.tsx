'use client';

import React from 'react';

const logos = [
  "Forbes", "Awwwards", "TechCrunch", "AWS Certified", "Next.js Experts", "Stripe Partners"
];

export default function CredibilityStrip() {
  return (
    <section className="py-20 bg-white border-b border-slate-100 overflow-hidden" aria-label="Credibility and Awards">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 text-center">
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-poppins">Recognized & Certified By</span>
      </div>
      
      {/* Auto-scrolling logo strip */}
      <div className="flex relative w-[200%] md:w-[150%] lg:w-full">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex items-center justify-center mx-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <span className="text-2xl font-black font-montserrat tracking-tighter text-slate-800">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
