'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const fallbackStudies = [
  {
    slug: 'techflow-acquisition',
    title: 'Architecting a Scalable Acquisition Engine',
    clientName: 'TechFlow',
    industry: 'Enterprise SaaS',
    description: 'We engineered a highly scalable acquisition funnel and React architecture that lowered CAC by 40% while handling 100k+ daily visitors.',
    metrics: '350% Growth, 40% Lower CAC',
    year: '2023',
    gradient: 'from-blue-600 to-indigo-900',
  },
  {
    slug: 'finvest-platform',
    title: 'Modernizing Legacy Banking Infrastructure',
    clientName: 'FinVest',
    industry: 'FinTech',
    description: 'A complete overhaul of a legacy banking application into a modern, lightning-fast Next.js architecture with bank-grade security.',
    metrics: 'Zero Breaches, 2M+ Users',
    year: '2023',
    gradient: 'from-emerald-600 to-teal-900',
  },
  {
    slug: 'nexus-commerce',
    title: 'Headless Commerce Migration at Scale',
    clientName: 'Nexus Commerce',
    industry: 'E-Commerce',
    description: 'Transitioned a monolithic store to a headless architecture, resulting in sub-second load times and massive conversion spikes.',
    metrics: '0.8s Load Time, +85% Conversions',
    year: '2024',
    gradient: 'from-orange-500 to-red-900',
  }
];

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudies() {
      try {
        const res = await fetch('/api/admin/projects');
        if (res.ok) {
          const data = await res.json();
          const caseStudies = data.filter((p: any) => p.caseStudy);
          if (caseStudies.length > 0) {
            setStudies(caseStudies);
          } else {
            setStudies(fallbackStudies);
          }
        } else {
          setStudies(fallbackStudies);
        }
      } catch (err) {
        setStudies(fallbackStudies);
      } finally {
        setLoading(false);
      }
    }
    loadStudies();
  }, []);

  return (
    <div className="min-h-screen relative bg-slate-50 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      
      <main id="main-content">
        {/* Editorial Hero */}
        <section className="pt-40 pb-20 px-6 lg:px-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs font-poppins mb-6 block">The Archive</span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-slate-900 font-montserrat tracking-tighter leading-[1.05]"
              >
                Verified <br/>Impact.
              </motion.h1>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-sm"
            >
              <p className="text-slate-500 font-poppins leading-relaxed">
                An editorial look into how we engineer solutions, overcome architectural challenges, and deliver unfair advantages to our partners.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Editorial List */}
        <section className="py-12">
          {loading ? (
            <div className="flex justify-center py-32">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-col">
              {studies.map((study, index) => {
                const gradient = study.gradient || fallbackStudies[index % fallbackStudies.length].gradient;
                const metricsList = study.metrics ? study.metrics.split(',').map((m: string) => m.trim()) : [];

                return (
                  <Link href={`/case-studies/${study.slug}`} key={study.slug || index} className="group">
                    <article className="border-b border-slate-200 py-16 lg:py-24 px-6 lg:px-8 relative overflow-hidden transition-colors hover:bg-white">
                      
                      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10 items-center">
                        
                        {/* Meta / Client (Left) */}
                        <div className="lg:col-span-3 flex lg:flex-col justify-between lg:justify-start gap-4 h-full">
                          <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest font-poppins mb-1">Client</div>
                            <div className="text-lg font-bold text-slate-900 font-montserrat">{study.clientName || study.industry}</div>
                          </div>
                          <div className="hidden lg:block mt-8">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest font-poppins mb-1">Industry</div>
                            <div className="text-slate-600 font-poppins">{study.industry}</div>
                          </div>
                        </div>

                        {/* Visual Mockup (Middle) */}
                        <div className="lg:col-span-4 h-[300px] lg:h-[400px] w-full relative rounded-[2rem] overflow-hidden">
                          {study.thumbnail ? (
                            <Image 
                              src={study.thumbnail} 
                              alt={study.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${gradient} transform group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] opacity-90`} />
                          )}
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        {/* Title & Excerpt (Right) */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-montserrat tracking-tight leading-[1.1] mb-6 group-hover:text-blue-600 transition-colors duration-500">
                            {study.title}
                          </h2>
                          <p className="text-slate-500 font-poppins leading-relaxed mb-8 line-clamp-3">
                            {study.description}
                          </p>

                          {metricsList.length > 0 && (
                            <div className="flex gap-6 mb-8 border-l-2 border-blue-600 pl-4">
                              <div>
                                <div className="text-2xl font-black text-slate-900 font-montserrat">{metricsList[0].split(' ')[0]}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-poppins">{metricsList[0].split(' ').slice(1).join(' ') || 'Metric'}</div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-blue-600 font-bold font-poppins uppercase tracking-widest text-xs group/btn">
                            Read Full Study <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>

                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}
