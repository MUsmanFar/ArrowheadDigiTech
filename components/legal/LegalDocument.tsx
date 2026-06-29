import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageShell } from '@/components/hercules';
import GlassCard from '@/components/hercules/ui/GlassCard';
import type { LegalPageContent } from '@/lib/site-content';

export default function LegalDocument({ content }: { content: LegalPageContent }) {
  return (
    <PageShell>
      <Navbar />
      <main id="main-content" className="pt-28 pb-24">
        <div className="container-premium max-w-4xl">
          <GlassCard padding="lg" className="md:p-12">
            <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e46f1e]">
              Legal
            </p>
            <h1 className="mt-4 font-poppins text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {content.title}
            </h1>
            <p className="mt-3 font-montserrat text-sm text-slate-500">
              Effective Date: {content.effectiveDate}
            </p>
            <div className="prose prose-slate mt-10 max-w-none space-y-6 font-montserrat text-sm leading-relaxed text-slate-600 md:text-base">
              {content.sections.map((section, index) => (
                <div key={index}>
                  {section.heading && (
                    <h2 className="pt-4 font-poppins text-xl font-bold text-slate-900">{section.heading}</h2>
                  )}
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </PageShell>
  );
}
