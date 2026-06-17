'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, Target, Cpu, TrendingUp, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CtaSection from '@/components/portfolio/CtaSection';

export default function CaseStudyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const [study, setStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudy() {
      try {
        const resolvedParams = await params;
        const res = await fetch('/api/admin/projects');
        if (res.ok) {
          const data = await res.json();
          const found = data.find((p: any) => p.slug === resolvedParams.slug);
          setStudy(found || null);
        }
      } catch (err) {
        console.error('Error loading study:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStudy();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold font-montserrat text-slate-900 mb-4">Case Study Not Found</h1>
        <Link href="/case-studies" className="text-blue-600 font-semibold hover:underline">
          Return to Archive
        </Link>
      </div>
    );
  }

  // Parse metrics
  const metricsList = study.metrics ? study.metrics.split(',').map((m: string) => m.trim()) : [];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      
      <main id="main-content">
        
        {/* Editorial Header */}
        <header className="pt-32 pb-12 px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold font-poppins text-sm mb-12 transition-colors">
              <ArrowLeft size={16} /> Back to Archive
            </Link>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-widest font-poppins border border-blue-100">
                {study.clientName || 'Arrowhead Partner'}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-widest font-poppins border border-slate-200">
                {study.industry}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 font-montserrat tracking-tight leading-[1.05] mb-8">
              {study.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 font-poppins leading-relaxed font-light">
              {study.description}
            </p>
          </div>
        </header>

        {/* Full Bleed Hero Media */}
        <section className="px-6 lg:px-8 py-12 bg-white">
          <div className="max-w-6xl mx-auto h-[50vh] md:h-[70vh] rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-slate-200">
            {study.thumbnail ? (
              <Image 
                src={study.thumbnail} 
                alt={study.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
            )}
          </div>
        </section>

        {/* Quick Stats Bar */}
        {metricsList.length > 0 && (
          <section className="py-12 bg-white border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {metricsList.map((metric: string, i: number) => {
                  const parts = metric.split(' ');
                  const value = parts[0];
                  const label = parts.slice(1).join(' ') || 'Metric';
                  return (
                    <div key={i} className="border-l-2 border-blue-600 pl-4">
                      <div className="text-3xl font-black text-slate-900 font-montserrat">{value}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-poppins mt-1">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Editorial Body: Framework (Challenge -> Strategy -> Execution -> Results) */}
        <section className="py-24 bg-white relative">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            
            {/* The Challenge */}
            <div className="mb-24">
              <div className="flex items-center gap-3 mb-6 text-blue-600">
                <Target size={24} />
                <h2 className="text-3xl font-bold font-montserrat">The Challenge</h2>
              </div>
              <div className="prose prose-lg prose-slate font-poppins leading-relaxed">
                <p>
                  <span className="float-left text-7xl font-bold text-slate-900 font-montserrat leading-none pr-3 pt-2">B</span>
                  efore our engagement, the client faced significant architectural bottlenecks. Their legacy infrastructure was incapable of handling the sudden surges in traffic, resulting in critical downtime during peak marketing campaigns. Furthermore, their customer acquisition funnel was heavily reliant on manual processes, leading to an unsustainably high Cost Per Acquisition (CAC).
                </p>
                <p>
                  They required a complete digital transformation: a robust, cloud-native architecture capable of auto-scaling, paired with an automated marketing funnel to capture and nurture leads effectively.
                </p>
              </div>
            </div>

            {/* The Strategy */}
            <div className="mb-24">
              <div className="flex items-center gap-3 mb-6 text-indigo-600">
                <Cpu size={24} />
                <h2 className="text-3xl font-bold font-montserrat">The Strategy</h2>
              </div>
              <div className="prose prose-lg prose-slate font-poppins leading-relaxed">
                <p>
                  Our approach was twofold: modernize the core application architecture while simultaneously redesigning the top-of-funnel user experience.
                </p>
                <ul className="list-none pl-0 space-y-4 my-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" />
                    <span><strong>Headless Migration:</strong> Decouple the frontend from the monolithic backend using Next.js and a headless CMS.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" />
                    <span><strong>Automated Workflows:</strong> Implement serverless edge functions to handle automated lead scoring and CRM integration.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" />
                    <span><strong>UX Revamp:</strong> Design a conversion-optimized interface utilizing psychological design principles and micro-animations.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* The Execution (Media Break) */}
            <div className="mb-24 w-full md:w-[150%] md:-ml-[25%]">
              <div className="aspect-[21/9] bg-slate-100 rounded-3xl overflow-hidden relative shadow-lg">
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] flex items-center justify-center">
                    <span className="text-slate-400 font-poppins font-semibold uppercase tracking-widest text-sm bg-white px-4 py-2 rounded-full border border-slate-200">System Architecture Diagram</span>
                 </div>
              </div>
              <p className="text-center text-sm text-slate-400 font-poppins mt-4 italic">High-level overview of the deployed cloud architecture.</p>
            </div>

            {/* The Results */}
            <div>
              <div className="flex items-center gap-3 mb-6 text-emerald-600">
                <TrendingUp size={24} />
                <h2 className="text-3xl font-bold font-montserrat">The Results</h2>
              </div>
              <div className="prose prose-lg prose-slate font-poppins leading-relaxed">
                <p>
                  The deployment was executed seamlessly with zero downtime. Post-launch, the new architecture achieved a <strong>lighthouse performance score of 98/100</strong>, reducing page load times by over 80%.
                </p>
                <p>
                  More importantly, the optimized acquisition funnel and enhanced user experience drove a massive increase in lead quality. Within the first quarter, the client observed a <strong>350% increase in conversions</strong> and a <strong>40% reduction in customer acquisition costs</strong>, establishing a dominant, scalable position in their market.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Original Content Fallback (If provided by CMS) */}
        {study.content && (
          <section className="py-12 bg-white border-t border-slate-100">
             <div className="max-w-3xl mx-auto px-6 lg:px-8">
               <div className="prose prose-lg prose-slate font-poppins" dangerouslySetInnerHTML={{ __html: study.content }} />
             </div>
          </section>
        )}

        <CtaSection />

      </main>
      <Footer />
    </div>
  );
}
