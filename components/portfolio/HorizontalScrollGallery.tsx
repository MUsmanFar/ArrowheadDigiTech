'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';

const fallbackProjects = [
  {
    slug: 'yalaride',
    title: 'YalaRide',
    industry: 'Transportation',
    description: 'Premium ride-sharing platform with real-time tracking and seamless booking experience.',
    metrics: '50K+ Downloads, 4.8 Rating',
    gradient: 'from-blue-600 to-indigo-900',
  },
  {
    slug: 'america-needs-nurses',
    title: 'America Needs Nurses',
    industry: 'Healthcare',
    description: 'Healthcare recruitment platform connecting nurses with top medical facilities nationwide.',
    metrics: '200+ Placements, 95% Success',
    gradient: 'from-emerald-600 to-teal-900',
  },
  {
    slug: 'go-jetter-tours',
    title: 'Go Jetter Tours',
    industry: 'Travel',
    description: 'Travel booking platform with AI-powered recommendations and seamless itinerary management.',
    metrics: '10K+ Bookings, 4.9 Rating',
    gradient: 'from-purple-600 to-pink-900',
  },
  {
    slug: 'cars-compound',
    title: 'Cars Compound',
    industry: 'E-Commerce',
    description: 'Luxury car dealership platform with virtual showroom and financing integration.',
    metrics: '$2M+ Sales, 300+ Cars',
    gradient: 'from-orange-500 to-red-900',
  },
];

export default function HorizontalScrollGallery() {
  const [projects, setProjects] = useState<any[]>(fallbackProjects);
  const mediaMap = useProjectMediaMap();
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          const featured = data.filter((p: any) => p.featured).slice(0, 4);
          if (featured.length >= 2) {
            setProjects(featured);
          }
        }
      } catch (err) {
        // keep fallback
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
            const projectMedia = mediaMap.get(project.slug);
            const thumb = thumbnailFor(projectMedia) || project.thumbnail || null;

            return (
              <div
                key={project.slug || index}
                className="w-[85vw] md:w-[60vw] lg:w-[50vw] h-full flex-shrink-0 relative rounded-3xl overflow-hidden group cursor-pointer"
              >
                {thumb ? (
                  <Image
                    src={thumb}
                    alt={project.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 60vw, 50vw"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]`} />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 font-poppins">
                      {project.industry || 'Enterprise Solution'}
                    </span>

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
