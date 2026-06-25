import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import type { LegalPageContent } from '@/lib/site-content';

export default function LegalDocument({ content }: { content: LegalPageContent }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-dot-grid">
      <Navbar />
      <main id="main-content" className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="glass-card p-8 md:p-12 border-slate-100 rounded-3xl shadow-xl bg-white/70 backdrop-blur-md">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 font-montserrat tracking-tight">
            {content.title}
          </h1>
          <p className="text-sm text-slate-500 mb-8 font-poppins">Effective Date: {content.effectiveDate}</p>
          <div className="prose prose-slate max-w-none text-slate-700 font-poppins space-y-6 text-sm md:text-base leading-relaxed">
            {content.sections.map((section, index) => (
              <div key={index}>
                {section.heading && (
                  <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
