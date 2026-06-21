import React from 'react';

export default function CaseStudiesHero() {
  return (
    <section
      className="relative min-h-[55vh] flex items-center overflow-hidden bg-white"
      aria-label="Case Studies Hero"
    >
      <div
        className="absolute inset-0 subtle-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-50/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, #2563eb, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 mt-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
          Case Studies
        </span>
        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 font-poppins tracking-tight leading-[1.05] max-w-4xl">
          Behind every project is a business problem solved.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-500 font-inter leading-relaxed max-w-2xl">
          A closer look at the constraints, decisions, and measurable outcomes
          behind the products we build for our clients.
        </p>
      </div>
    </section>
  );
}
