'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Award, Star, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';

const DeferredFloatingObjects = () => {
  const [Component, setComponent] = useState<any>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const triggerLoad = () => {
      setShouldLoad(true);
      window.removeEventListener('scroll', triggerLoad);
      window.removeEventListener('mousemove', triggerLoad);
      window.removeEventListener('touchstart', triggerLoad);
    };

    window.addEventListener('scroll', triggerLoad, { passive: true });
    window.addEventListener('mousemove', triggerLoad, { passive: true });
    window.addEventListener('touchstart', triggerLoad, { passive: true });

    return () => {
      window.removeEventListener('scroll', triggerLoad);
      window.removeEventListener('mousemove', triggerLoad);
      window.removeEventListener('touchstart', triggerLoad);
    };
  }, []);

  useEffect(() => {
    if (shouldLoad) {
      import('@/components/3d/FloatingObjects').then((mod) => {
        setComponent(() => mod.default);
      });
    }
  }, [shouldLoad]);

  if (!Component) return null;
  return <Component />;
};

const metrics = [
  { value: '500+', label: 'Projects Delivered', icon: TrendingUp },
  { value: '200+', label: 'Happy Clients', icon: Users },
  { value: '98%', label: 'Client Satisfaction', icon: Award },
  { value: '50+', label: 'Team Members', icon: Users },
];

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [srvRes, projRes, testRes] = await Promise.all([
          fetch('/api/admin/services'),
          fetch('/api/admin/projects'),
          fetch('/api/admin/testimonials'),
        ]);

        if (srvRes.ok) {
          const srvData = await srvRes.json();
          setServices(srvData.slice(0, 6)); // show top 6
        }
        if (projRes.ok) {
          const projData = await projRes.json();
          setProjects(projData.filter((p: any) => p.featured).slice(0, 3)); // show top 3 featured
        }
        if (testRes.ok) {
          const testData = await testRes.json();
          setTestimonials(testData.filter((t: any) => t.featured).slice(0, 2)); // show top 2 featured
        }
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-dot-grid">
      <Navbar />
      <main id="main-content">

      {/* Decorative Glow Elements */}
      <div className="absolute top-20 left-1/4 w-[450px] h-[450px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 right-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-label="Hero">
        {/* Premium Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 z-0 opacity-80">
            <DeferredFloatingObjects />
          </div>
          <div 
            className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[100px] mix-blend-multiply"
          />
          <div 
            className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[100px] mix-blend-multiply"
          />
          <div 
            className="absolute bottom-[10%] left-[40%] w-[800px] h-[400px] bg-indigo-300/20 rounded-full blur-[100px] mix-blend-multiply"
          />
          
          {/* Subtle Grid Pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold uppercase tracking-wider mb-6 font-poppins"
            >
              <Award size={12} className="animate-spin-slow" /> Next-Generation Digital Partner
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 font-montserrat leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              Building Digital Experiences That{' '}
              <span className="text-gradient-blue relative inline-block">
                Drive Growth
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 to-cyan-400 rounded" />
              </span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-slate-600 mb-8 font-poppins leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              We design, build, and optimize custom software architectures, premium web platforms, and automated lead acquisition structures.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 py-6 px-8 font-semibold">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="border-slate-200 hover:bg-slate-50 rounded-xl py-6 px-8 font-semibold flex items-center gap-2 bg-white">
                  View Portfolio <ArrowRight size={18} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative z-10 border-t border-slate-100 bg-white/40" aria-label="Our Services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full font-poppins">Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-4 font-montserrat">
              Our Core Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-poppins leading-relaxed">
              Comprehensive custom software engineering, high-end digital marketing campaigns, and conversational AI integrations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200/50" />
              ))
            ) : services.length === 0 ? (
              <div className="text-center col-span-3 text-slate-400 py-10 font-poppins">No services found. Add them in the admin dashboard.</div>
            ) : (
              services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="glass-card h-full flex flex-col justify-between p-2">
                    <CardHeader className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl mb-5 glow-blue shadow-sm">
                        {service.icon || '💻'}
                      </div>
                      <CardTitle className="text-lg font-bold text-slate-900 font-montserrat">{service.title}</CardTitle>
                      <CardDescription className="text-slate-500 font-poppins text-xs md:text-sm leading-relaxed mt-2.5 line-clamp-3">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 mt-auto">
                      <Link href={`/services/${service.slug}`} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 w-fit font-poppins group">
                        Learn details <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 relative z-10 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black mb-2 font-montserrat tracking-tight">{metric.value}</div>
                <div className="text-blue-100 font-poppins font-medium text-xs md:text-sm uppercase tracking-wider">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 relative z-10 bg-white/40" aria-label="Featured Projects">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full font-poppins">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-4 font-montserrat">
              Featured Case Studies
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-poppins leading-relaxed">
              Explore how we design and deploy bespoke software solutions and high-converting architectures.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-80 rounded-2xl bg-slate-100 animate-pulse border border-slate-200/50" />
              ))
            ) : projects.length === 0 ? (
              <div className="text-center col-span-3 text-slate-400 py-10 font-poppins">No featured projects found. Add/flag them in the admin console.</div>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/case-studies/${project.slug}`}>
                    <Card className="glass-card h-full cursor-pointer flex flex-col justify-between overflow-hidden p-0 group">
                      <div className="aspect-video relative overflow-hidden bg-slate-100 border-b border-slate-100">
                        {project.thumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={project.thumbnail} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-500 group-hover:scale-102 transition-transform duration-500" />
                        )}
                        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold text-slate-700 uppercase tracking-wider font-poppins">
                          {project.industry || 'Case Study'}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-montserrat">{project.title}</CardTitle>
                        <CardDescription className="text-slate-500 font-poppins text-xs md:text-sm leading-relaxed mt-2 line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>

                      <CardContent className="px-6 pb-6 pt-0 mt-auto">
                        {project.metrics && (
                          <div className="text-[10px] text-slate-500 border-t border-slate-50 pt-3 flex items-center justify-between font-poppins font-medium uppercase tracking-wider">
                            <span>Outcome:</span>
                            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{project.metrics}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-16">
            <Link href="/portfolio">
              <Button variant="outline" className="border-slate-200 hover:bg-slate-50 bg-white rounded-xl py-6 px-8 font-semibold flex items-center gap-2">
                Explore All Projects <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative z-10 border-t border-slate-100 bg-white/40" aria-label="Client Testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full font-poppins">Reviews</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-4 font-montserrat">
              What Our Partners Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {loading ? (
              [...Array(2)].map((_, i) => (
                <div key={i} className="h-56 rounded-2xl bg-slate-100 animate-pulse border border-slate-200/50" />
              ))
            ) : testimonials.length === 0 ? (
              <div className="text-center col-span-2 text-slate-400 py-10 font-poppins">No testimonials found. Add them in the admin control board.</div>
            ) : (
              testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="glass-card h-full p-8 flex flex-col justify-between border-slate-100">
                    <CardContent className="p-0">
                      <div className="flex text-yellow-400 gap-0.5 mb-5">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-slate-700 mb-6 italic font-serif leading-relaxed text-sm md:text-base">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                    </CardContent>
                    
                    <div className="flex items-center gap-3.5 pt-4 border-t border-slate-50 mt-auto">
                      {testimonial.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-10 h-10 object-cover rounded-full border shadow-sm" 
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 font-extrabold text-sm rounded-full flex items-center justify-center">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-slate-900 font-montserrat text-sm">{testimonial.name}</div>
                        <div className="text-slate-500 text-xs font-semibold font-poppins">
                          {testimonial.role} {testimonial.company ? `• ${testimonial.company}` : ''}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 relative z-10 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden" aria-label="Call to Action">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-montserrat tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Build Your Bespoke Platform?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 text-slate-300 font-poppins leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Discuss custom integrations, systems architecture consulting, and advanced customer acquisition strategies.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 px-8 font-semibold shadow-lg shadow-blue-900/40 border-transparent">
                Book Free Consultation
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
