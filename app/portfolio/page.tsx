'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const cardGradients = [
  'from-blue-500 to-cyan-500',
  'from-indigo-500 to-blue-500',
  'from-purple-500 to-pink-500',
  'from-teal-500 to-emerald-500',
  'from-cyan-500 to-blue-600',
  'from-orange-500 to-rose-500',
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/admin/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error('Failed to load portfolio projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Compute dynamic categories based on loaded projects
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.industry || p.category))).filter(Boolean)];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => (project.industry || project.category) === selectedCategory);

  return (
    <div className="min-h-screen relative overflow-hidden bg-dot-grid">
      <Navbar />
      <main id="main-content">

      {/* Decorative Glow Elements */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 right-1/4 w-[450px] h-[450px] bg-cyan-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-indigo-300/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-36 pb-12 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 text-blue-600 border border-blue-100/50 text-xs font-semibold uppercase tracking-wider mb-6 font-poppins"
            >
              <Sparkles size={12} className="text-blue-500" /> Case Study Showcase
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 font-montserrat tracking-tight"
            >
              Our Agency <span className="text-gradient-blue">Portfolio</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-slate-600 mb-8 font-poppins leading-relaxed"
            >
              Explore our successful projects and discover how we&apos;ve helped businesses achieve their digital goals.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Category Selectors */}
      <section className="pb-16 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category: any) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-poppins text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === category
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10 scale-[1.02]'
                    : 'bg-white/75 border-slate-200/60 text-slate-600 hover:bg-white hover:text-slate-900 shadow-sm backdrop-blur-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-6 lg:px-8 relative z-10" aria-label="Portfolio Projects">
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">All Portfolio Projects</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-slate-200/60 bg-white/60 shadow-sm animate-pulse">
                  <div className="aspect-video bg-slate-200/80" />
                  <div className="p-6">
                    <div className="h-2.5 w-16 bg-slate-200 rounded mb-4" />
                    <div className="h-5 w-4/5 bg-slate-200 rounded mb-3" />
                    <div className="h-3 w-full bg-slate-100 rounded mb-2" />
                    <div className="h-3 w-3/4 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-poppins bg-white/40 backdrop-blur-md border border-slate-200/50 rounded-3xl max-w-lg mx-auto">
              No portfolio items found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => {
                const gradient = cardGradients[index % cardGradients.length];
                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 3) * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="h-full"
                  >
                    <Link href={`/case-studies/${project.slug}`} className="block h-full" aria-label={`View case study: ${project.title}`}>
                      <div className="glass-card rounded-2xl h-full flex flex-col justify-between overflow-hidden border border-white/50 bg-white/40 backdrop-blur-md shadow-md group cursor-pointer relative">
                        {/* Glow effect on hover */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl group-hover:bg-blue-400/10 transition-colors pointer-events-none" />

                        <div className="aspect-video relative overflow-hidden bg-slate-100/50 border-b border-slate-100/50">
                          {project.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={project.thumbnail} 
                              alt={project.title} 
                              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-90 group-hover:scale-[1.03] transition-transform duration-500`} />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center" aria-hidden="true">
                            <div className="bg-white/95 text-blue-600 rounded-full p-3 shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300 backdrop-blur-sm">
                              <ArrowRight size={20} aria-hidden="true" />
                            </div>
                          </div>
                        </div>

                        <div className="p-6 pb-4 flex-grow flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest font-poppins bg-blue-50/80 px-2.5 py-1 rounded-md w-fit">
                              {project.industry || project.category || 'General'}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 mt-3.5 mb-2 group-hover:text-blue-600 transition-colors font-montserrat">
                              {project.title}
                            </h3>
                            <p className="text-slate-500 text-xs md:text-sm font-poppins leading-relaxed line-clamp-2">
                              {project.description}
                            </p>
                          </div>

                          {project.metrics && (
                            <div className="text-xs text-slate-600 font-medium font-poppins border-t border-slate-100/50 pt-4 mt-5 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                <TrendingUp size={12} className="text-emerald-500" /> Outcomes
                              </span>
                              <span className="font-extrabold text-slate-900 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md text-[10px] font-poppins">{project.metrics}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
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
