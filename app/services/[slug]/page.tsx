import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/lib/db';
import FAQSection from '@/components/ui/FAQSection';
import CtaSection from '@/components/portfolio/CtaSection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = await dbService.services.findUnique(slug);

  if (!service) {
    return {
      title: 'Service Not Found - Arrowhead DigiTech',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: `${service.title} Services | Arrowhead DigiTech`,
    description: service.description,
    openGraph: {
      title: `${service.title} - Digital Agency Solutions`,
      description: service.description,
      type: 'website',
    },
  };
}

function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  const separator = value.includes('->') ? '->' : ',';
  return value
    .split(separator)
    .map((s: string) => s.trim())
    .filter(Boolean);
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await dbService.services.findUnique(slug);

  if (!service) {
    return notFound();
  }

  const processSteps = parseList(service.process);
  const benefitsList = parseList(service.benefits);
  const deliverablesList = parseList(service.deliverables);
  const packages = service.pricingPackages || [];
  const faqs = await dbService.faqs.findMany();

  return (
    <div className="min-h-screen bg-white selection:bg-orange-200 selection:text-orange-900">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 subtle-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-50/40 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors font-inter mb-8"
            >
              <ArrowLeft size={16} /> Back to Services
            </Link>

            <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 text-3xl mb-6">
              {service.icon || '💻'}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 font-poppins tracking-tight leading-[1.05] mb-6">
              {service.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-500 font-inter leading-relaxed max-w-2xl mb-8">
              {service.description}
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-orange-500 text-white text-base font-semibold transition-all duration-300 ease-out hover:bg-orange-600 hover:shadow-[0_12px_30px_-8px_rgba(249,115,22,0.5)] hover:-translate-y-0.5"
            >
              Get Started
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      {service.problem && service.solution && (
        <section className="py-20 px-6 lg:px-8 border-t border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 md:p-10 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-semibold tracking-wider uppercase text-red-500 font-inter">
                  The Problem
                </span>
                <h3 className="mt-2 text-xl font-bold text-slate-900 font-poppins mb-4">
                  What businesses face
                </h3>
                <p className="text-slate-600 font-inter leading-relaxed">
                  {service.problem}
                </p>
              </div>

              <div className="p-8 md:p-10 rounded-2xl bg-orange-50 border border-orange-100">
                <span className="text-xs font-semibold tracking-wider uppercase text-orange-600 font-inter">
                  Our Solution
                </span>
                <h3 className="mt-2 text-xl font-bold text-slate-900 font-poppins mb-4">
                  How we solve it
                </h3>
                <p className="text-slate-600 font-inter leading-relaxed">
                  {service.solution}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {processSteps.length > 0 && (
        <section className="py-20 md:py-28 px-6 lg:px-8 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl mb-14">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                Our Process
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 font-poppins tracking-tight">
                How we deliver
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {processSteps.map((step: string, index: number) => (
                <div key={step} className="relative">
                  <div className="p-6 rounded-xl bg-white border border-slate-100 h-full">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 text-orange-600 text-base font-bold font-poppins mb-4">
                      {index + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 font-poppins leading-snug">
                      {step}
                    </h3>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-orange-200 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits & Deliverables */}
      <section className="py-20 md:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {benefitsList.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-poppins tracking-tight mb-8">
                  Key Benefits
                </h2>
                <div className="space-y-4">
                  {benefitsList.map((benefit: string) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3.5 p-5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle
                        className="text-emerald-500 flex-shrink-0 mt-0.5"
                        size={18}
                      />
                      <span className="text-slate-700 font-inter text-sm">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {deliverablesList.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-poppins tracking-tight mb-8">
                  What You Get
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {deliverablesList.map((deliv: string) => (
                    <div
                      key={deliv}
                      className="p-5 rounded-xl bg-white border border-slate-100 text-center flex flex-col items-center justify-center hover:border-orange-100 hover:bg-orange-50/30 transition-colors duration-300"
                    >
                      <span className="text-2xl mb-2">📦</span>
                      <span className="text-slate-800 font-semibold font-inter text-xs">
                        {deliv}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      {packages.length > 0 && (
        <section
          id="pricing"
          className="py-20 md:py-28 px-6 lg:px-8 bg-slate-50 border-y border-slate-100"
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl mb-14">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                Pricing
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 font-poppins tracking-tight">
                Choose your plan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
              {packages.map((plan: any) => (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-2xl flex flex-col transition-all duration-300 ${
                    plan.popular
                      ? 'bg-white border-2 border-orange-400 shadow-xl shadow-orange-500/5 scale-[1.02]'
                      : 'bg-white border border-slate-100 shadow-sm hover:border-slate-200'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 font-poppins">
                      {plan.name}
                    </h3>
                    <div className="text-3xl font-extrabold text-slate-900 mt-3 font-poppins">
                      {plan.price}
                    </div>
                    <p className="text-xs text-slate-400 font-inter mt-2 mb-6">
                      {plan.description}
                    </p>

                    <ul className="space-y-3 border-t border-slate-100 pt-5 mb-8">
                      {plan.features.map((feature: string) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-slate-500 font-inter"
                        >
                          <CheckCircle
                            className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className={`block w-full text-center py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-[0_8px_25px_-6px_rgba(249,115,22,0.4)]'
                        : 'bg-transparent text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {plan.popular ? 'Get Started' : 'Inquire Now'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 md:py-28 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-600 bg-orange-50 border border-orange-100/60">
                FAQ
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 font-poppins tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQSection faqs={faqs} />
          </div>
        </section>
      )}

      <CtaSection />

      <Footer />
    </div>
  );
}
