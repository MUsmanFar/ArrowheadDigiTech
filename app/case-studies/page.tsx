'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const studyGradients = [
  'from-blue-500 to-cyan-500',
  'from-indigo-500 to-blue-500',
  'from-purple-500 to-pink-500',
  'from-teal-500 to-emerald-500',
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
          // Filter projects that are flagged as case studies
          const caseStudies = data.filter((p: any) => p.caseStudy);
          setStudies(caseStudies);
        }
      } catch (err) {
        console.error('Failed to load case studies:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStudies();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-dot-grid">
      <Navbar />
      <main id="main-content">

      {/* Decorative Glow Elements */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 right-1/4 w-[450px] h-[450px] bg-cyan-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-indigo-300/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-36 pb-16 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 text-blue-600 border border-blue-100/50 text-xs font-semibold uppercase tracking-wider mb-6 font-poppins"
            >
              <Sparkles size={12} className="text-blue-500" /> Success Stories
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 font-montserrat tracking-tight"
            >
              Agency Case <span className="text-gradient-blue">Studies</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-slate-600 mb-8 font-poppins leading-relaxed"
            >
              Discover how we&apos;ve helped businesses achieve remarkable results through custom digital architectures and strategic online initiatives.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-24 px-6 lg:px-8 relative z-10" aria-label="Case Studies List">
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">All Case Studies</h2>
          {loading ? (
            <div className="space-y-12 max-w-5xl mx-auto">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-3xl overflow-hidden border border-slate-200/60 bg-white/60 shadow-sm animate-pulse">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="lg:col-span-2 min-h-[220px] bg-slate-200/80" />
                    <div className="lg:col-span-3 p-8 md:p-10">
                      <div className="h-2.5 w-24 bg-slate-200 rounded mb-4" />
                      <div className="h-7 w-3/4 bg-slate-200 rounded mb-4" />
                      <div className="h-3 w-full bg-slate-100 rounded mb-2" />
                      <div className="h-3 w-5/6 bg-slate-100 rounded mb-2" />
                      <div className="h-3 w-4/5 bg-slate-100 rounded mb-8" />
                      <div className="h-10 w-36 bg-slate-200 rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : studies.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-poppins bg-white/40 backdrop-blur-md border border-slate-200/50 rounded-3xl max-w-lg mx-auto">
              No case studies found in the database.
            </div>
          ) : (
            <div className="space-y-12 max-w-5xl mx-auto">
              {studies.map((study, index) => {
                const gradient = studyGradients[index % studyGradients.length];
                const metricsList = study.metrics 
                  ? study.metrics.split(',').map((m: string) => m.trim()).filter(Boolean)
                  : [];

                return (
                  <motion.div
                    key={study.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="glass-card rounded-3xl overflow-hidden border border-white/50 bg-white/40 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 relative group">
                      <div className="grid grid-cols-1 lg:grid-cols-5">
                        
                        {/* Visual Thumbnail */}
                        <div className="lg:col-span-2 relative overflow-hidden bg-slate-100/50 min-h-[220px] lg:min-h-full border-r border-slate-100/50">
                          {study.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={study.thumbnail} 
                              alt={study.title} 
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                            />
                          ) : (
                            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:scale-[1.03] transition-transform duration-500`} />
                          )}
                          <div className="absolute inset-0 flex flex-col justify-between p-6 text-white bg-black/15">
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                              {study.industry || 'Success Story'}
                            </span>
                            
                            {metricsList.length > 0 && (
                              <div className="space-y-1 mt-auto bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 w-fit">
                                <div className="text-2xl font-black font-poppins">{metricsList[0].split(' ')[0]}</div>
                                <div className="text-[9px] uppercase tracking-widest font-bold opacity-90">
                                  {metricsList[0].split(' ').slice(1).join(' ') || 'Outcomes'}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Text Details */}
                        <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-poppins bg-blue-50/80 px-2.5 py-1 rounded-md">
                              {study.clientName || 'Arrowhead Partner'}
                            </span>
                            <h3 className="text-2xl font-bold font-montserrat text-slate-900 mt-4 mb-4 group-hover:text-blue-600 transition-colors">
                              {study.title}
                            </h3>
                            <p className="text-slate-500 font-poppins text-sm leading-relaxed mb-6 line-clamp-3">
                              {study.description}
                            </p>

                            {/* outcomes metrics */}
                            {metricsList.length > 1 && (
                              <div className="grid grid-cols-2 gap-4 mb-8 border-t border-slate-100/50 pt-5">
                                {metricsList.slice(0, 2).map((metric: string, i: number) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <TrendingUp className="text-emerald-500 flex-shrink-0" size={16} />
                                    <span className="text-xs font-bold text-slate-700 font-poppins">{metric}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <Link href={`/case-studies/${study.slug}`} aria-label={`Read full case study: ${study.title}`}>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 w-fit py-5 px-6 shadow-md shadow-blue-500/10 hover:translate-x-0.5 transition-transform">
                              Read Case Study <ArrowRight size={16} aria-hidden="true" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-saas-grid opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent opacity-65 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-montserrat tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Want Results Like These?
          </motion.h2>
          <motion.p
            className="text-lg mb-8 text-slate-300 font-poppins max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Let&apos;s discuss how we can partner to achieve similar success for your business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 py-6 px-8 transition-transform duration-300 hover:scale-[1.02]">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
