'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp } from 'lucide-react';

const fallbackProjects = [
  {
    slug: 'techflow-acquisition',
    title: 'TechFlow Acquisition Engine',
    industry: 'Enterprise SaaS',
    description: 'We engineered a highly scalable acquisition funnel and React architecture that lowered CAC by 40% while handling 100k+ daily visitors.',
    metrics: '350% Growth, 40% Lower CAC',
    gradient: 'from-blue-600 to-indigo-900',
  },
  {
    slug: 'finvest-platform',
    title: 'FinVest Secure Portal',
    industry: 'FinTech',
    description: 'A complete overhaul of a legacy banking application into a modern, lightning-fast Next.js architecture with bank-grade security.',
    metrics: 'Zero Breaches, 2M+ Users',
    gradient: 'from-emerald-600 to-teal-900',
  },
  {
    slug: 'healthsync-app',
    title: 'HealthSync Telemedicine',
    industry: 'Healthcare',
    description: 'Real-time video consultation platform with HIPAA-compliant data routing and an award-winning patient UI.',
    metrics: '99.99% Uptime, 500k Sessions',
    gradient: 'from-purple-600 to-pink-900',
  },
  {
    slug: 'nexus-commerce',
    title: 'Nexus Headless Commerce',
    industry: 'E-Commerce',
    description: 'Transitioned a monolithic store to a headless architecture, resulting in sub-second load times and massive conversion spikes.',
    metrics: '0.8s Load Time, +85% Conversions',
    gradient: 'from-orange-500 to-red-900',
  }
];

export default function HorizontalScrollGallery() {
  const [projects, setProjects] = useState<any[]>(fallbackProjects);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]); // -75% because we have 4 items (100% / 4 * 3)

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/admin/projects');
        if (res.ok) {
          const data = await res.json();
          const featured = data.filter((p: any) => p.featured).slice(0, 4);
          if (featured.length >= 2) {
            setProjects(featured);
          } else {
            setProjects(fallbackProjects);
          }
        } else {
          setProjects(fallbackProjects);
        }
      } catch (err) {
        setProjects(fallbackProjects);
      }
    }
    loadProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-slate-950" aria-label="Interactive Project Gallery">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-12 left-6 lg:left-12 z-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-montserrat tracking-tight">
            Selected Works
          </h2>
          <p className="text-slate-400 font-poppins mt-2">Scroll to explore our engineering impact.</p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 lg:px-12 pt-24 h-[70vh] min-h-[500px]">
          {projects.map((project, index) => {
            const gradient = project.gradient || fallbackProjects[index % fallbackProjects.length].gradient;
            const metricsList = project.metrics ? project.metrics.split(',').map((m: string) => m.trim()) : [];

            return (
              <div 
                key={project.slug || index} 
                className="w-[85vw] md:w-[60vw] lg:w-[50vw] h-full flex-shrink-0 relative rounded-3xl overflow-hidden group cursor-pointer"
              >
                {/* Background Image or Gradient */}
                {project.thumbnail ? (
                  <Image 
                    src={project.thumbnail} 
                    alt={project.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 60vw, 50vw"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]`} />
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 font-poppins">
                      {project.industry || 'Enterprise Solution'}
                    </span>
                    
                    {/* ROI Badge */}
                    {metricsList.length > 0 && (
                      <div className="glass-strong border border-white/20 px-4 py-3 rounded-2xl backdrop-blur-md text-right">
                        <div className="flex items-center gap-2 text-emerald-400 mb-1">
                          <TrendingUp size={16} />
                          <span className="text-xs uppercase tracking-widest font-bold font-poppins">Verified Impact</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-black text-white font-montserrat tracking-tight">
                          {metricsList[0]}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="transform group-hover:translate-y-[-10px] transition-transform duration-500">
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-montserrat tracking-tight leading-[1.1] mb-6">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 font-poppins text-sm md:text-base max-w-xl leading-relaxed mb-8 line-clamp-2 md:line-clamp-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.description}
                    </p>
                    
                    <Link href={`/case-studies/${project.slug}`}>
                      <div className="inline-flex items-center gap-3 text-white border-b-2 border-white/30 hover:border-white pb-1 transition-colors font-semibold font-poppins group/btn">
                        Read Case Study <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
