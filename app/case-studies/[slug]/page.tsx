import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, TrendingUp, Users, Award, Star, Clock, Layers, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/lib/db';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await dbService.projects.findUnique(slug);

  if (!project) {
    return {
      title: 'Project Not Found - Arrowhead DigiTech',
      description: 'The requested case study could not be found.',
    };
  }

  return {
    title: `${project.title} Case Study | Arrowhead DigiTech`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Success Story`,
      description: project.description,
      type: 'website',
    }
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await dbService.projects.findUnique(slug);

  if (!project) {
    return notFound();
  }

  // Parse metrics (e.g. "50K+ Downloads, 4.8 Rating")
  const metricsList = project.metrics 
    ? project.metrics.split(',').map((m: string) => m.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen relative overflow-hidden bg-dot-grid">
      <Navbar />
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 right-1/4 w-[450px] h-[450px] bg-cyan-300/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Hero Banner Section */}
      <section className="pt-36 pb-16 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <Link href="/portfolio" className="text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center gap-1.5 font-semibold text-sm font-poppins">
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3.5 py-1.5 bg-blue-50/80 text-blue-600 border border-blue-100/50 rounded-full text-[10px] font-bold uppercase tracking-wider font-poppins">
                {project.industry || 'Case Study'}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-montserrat tracking-tight leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-8 text-sm text-slate-500 font-poppins border-t border-slate-100/50 pt-6 mt-8">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Client Partner</span>
                <span className="font-semibold text-slate-800 text-base">{project.clientName || 'N/A'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Category Industry</span>
                <span className="font-semibold text-slate-800 text-base">{project.industry || 'N/A'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">System Architecture</span>
                <span className="font-semibold text-slate-800 text-base">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Core Image */}
      <section className="pb-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {project.thumbnail && (
            <div className="w-full h-[300px] md:h-[520px] rounded-3xl overflow-hidden border border-slate-200/50 shadow-xl mb-16 bg-slate-100/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={project.thumbnail} 
                alt={`${project.title} Showcase`} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
            {/* Overview */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 font-montserrat flex items-center gap-2">
                Project Overview <Sparkles size={20} className="text-blue-500" />
              </h2>
              <p className="text-slate-600 font-poppins leading-relaxed text-base whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            {/* Metrics Checklist */}
            {metricsList.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 font-montserrat flex items-center gap-2">
                  Key Outcomes <TrendingUp size={20} className="text-emerald-500" />
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {metricsList.map((metric: string, idx: number) => (
                    <div key={idx} className="glass-card p-5 rounded-2xl border border-white/60 bg-white/40 shadow-sm flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shadow-inner">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-lg font-poppins">{metric.split(' ')[0]}</div>
                        <div className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mt-0.5">
                          {metric.split(' ').slice(1).join(' ') || 'Metric Achieved'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {project.testimonial && (
        <section className="py-24 bg-white/50 backdrop-blur-md border-y border-slate-100 relative z-10">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="glass-card p-8 md:p-12 rounded-3xl border border-white bg-white/50 shadow-md text-center space-y-6 relative overflow-hidden">
              {/* Decorative quotation mark backdrop */}
              <div className="absolute -top-6 -left-6 text-9xl text-slate-200/20 font-serif pointer-events-none select-none">“</div>
              
              <div className="flex justify-center text-yellow-400 gap-0.5 relative z-10">
                {[...Array(project.testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} size={22} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-lg md:text-xl text-slate-700 font-medium font-serif italic leading-relaxed relative z-10">
                &ldquo;{project.testimonial.content}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-3.5 pt-4 relative z-10">
                {project.testimonial.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={project.testimonial.image} 
                    alt={project.testimonial.name} 
                    className="w-12 h-12 object-cover rounded-full border border-slate-200 shadow-sm" 
                  />
                ) : (
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 font-extrabold text-sm rounded-full flex items-center justify-center border shadow-sm">
                    {project.testimonial.name.charAt(0)}
                  </div>
                )}
                <div className="text-left">
                  <div className="font-bold text-slate-900 font-montserrat text-sm">{project.testimonial.name}</div>
                  <div className="text-slate-400 text-xs font-semibold font-poppins">
                    {project.testimonial.role} {project.testimonial.company ? `• ${project.testimonial.company}` : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call To Action */}
      <section className="py-28 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-saas-grid opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent opacity-65 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat tracking-tight">
            Ready for Similar Success?
          </h2>
          <p className="text-lg mb-8 text-slate-300 font-poppins max-w-2xl mx-auto">
            Partner with Arrowhead DigiTech to design and develop your custom engineering architectures.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 py-6 px-8 transition-transform duration-300 hover:scale-[1.02]">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
