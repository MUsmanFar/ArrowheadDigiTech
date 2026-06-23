import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';

const cardGradients = [
  'from-blue-500 to-cyan-500',
  'from-indigo-500 to-blue-500',
  'from-purple-500 to-pink-500',
];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const mediaMap = useProjectMediaMap();

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/admin/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load portfolio projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <section className="py-24 px-6 lg:px-8 relative z-10 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-montserrat tracking-tight mb-4">Featured Work</h2>
            <p className="text-lg text-slate-600 font-poppins max-w-xl">A curated selection of our most impactful digital transformations.</p>
          </div>
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-blue-600 font-semibold font-poppins hover:text-blue-700 transition-colors">
            View All Case Studies <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            [...Array(3)].map((_, i) => (
               <div key={i} className="rounded-3xl h-[400px] bg-slate-200 animate-pulse" />
            ))
          ) : projects.length > 0 ? (
            projects.map((project, index) => {
              const gradient = cardGradients[index % cardGradients.length];
              const projectMedia = mediaMap.get(project.slug);
              const thumb = thumbnailFor(projectMedia) || project.thumbnail || null;
              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link href={`/case-studies/${project.slug}`} className="block h-full">
                    <div className="glass-card rounded-3xl overflow-hidden h-[500px] flex flex-col relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      <div className="flex-1 p-8 pb-0 flex flex-col justify-end z-10">
                         <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-xs text-blue-600 font-bold uppercase tracking-widest font-poppins bg-blue-50/90 backdrop-blur-md px-3 py-1.5 rounded-lg mb-4 inline-block">
                               {project.industry || project.category || 'Case Study'}
                            </span>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 font-montserrat leading-tight group-hover:text-blue-600 transition-colors">
                              {project.title}
                            </h3>
                         </div>
                      </div>
                      <div className="h-1/2 mt-auto relative overflow-hidden rounded-t-2xl mx-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                        {thumb ? (
                            <Image
                              src={thumb}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                              className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-80`} />
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-20 text-slate-500 font-poppins">Portfolio items coming soon.</div>
          )}
        </div>
      </div>
    </section>
  );
}
