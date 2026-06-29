'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ConversationalForm from '@/components/contact/ConversationalForm';
import { PageShell, PageHero } from '@/components/hercules';
import { useSiteSection } from '@/lib/use-site-content';
import { Mail, MapPin } from 'lucide-react';
import GlassCard from '@/components/hercules/ui/GlassCard';

export default function ContactPage() {
  const { section: page } = useSiteSection('contact.page');

  return (
    <PageShell>
      <Navbar />

      <main id="main-content" className="pt-20">
        <PageHero
          badge={page.badge}
          title={page.headline}
          titleAccent={page.headlineAccent}
          description={page.subheadline}
          align="center"
        />

        <section className="pb-24 md:pb-32">
          <div className="container-premium">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
              <div className="space-y-6">
                <GlassCard padding="lg" className="h-full">
                  <h2 className="font-poppins text-2xl font-bold text-slate-900">Get in touch</h2>
                  <p className="mt-3 font-montserrat text-sm leading-relaxed text-slate-500">
                    Tell us about your project. We typically respond within one business day.
                  </p>
                  <div className="mt-8 space-y-5">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-[#e46f1e]" aria-hidden="true" />
                      <div>
                        <p className="font-montserrat text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {page.headquartersLabel}
                        </p>
                        <p className="mt-1 font-montserrat text-sm text-slate-700">{page.headquarters}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 text-[#e46f1e]" aria-hidden="true" />
                      <div>
                        <p className="font-montserrat text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {page.inquiriesLabel}
                        </p>
                        <a
                          href={`mailto:${page.inquiriesEmail}`}
                          className="mt-1 block font-montserrat text-sm text-slate-700 hover:text-[#e46f1e]"
                        >
                          {page.inquiriesEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              <GlassCard padding="lg" className="hercules-premium-shadow">
                <ConversationalForm />
              </GlassCard>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
