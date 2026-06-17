import React from 'react';
import { motion } from 'framer-motion';

const processSteps = [
  { title: "Discovery", desc: "Understanding your vision, audience, and business goals." },
  { title: "Strategy", desc: "Crafting a tailored digital roadmap and UX architecture." },
  { title: "Design", desc: "Creating premium, 3D-infused, and glassmorphic interfaces." },
  { title: "Development", desc: "Building robust, scalable, and high-performance solutions." },
  { title: "Launch & Scale", desc: "Deploying with precision and optimizing for growth." }
];

export default function ProcessTimeline() {
  return (
    <section className="py-24 px-6 lg:px-8 relative z-10 bg-slate-900 text-white rounded-t-[3rem] lg:rounded-t-[5rem]">
      <div className="absolute inset-0 bg-saas-grid opacity-10" />
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-20">
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm font-poppins mb-4 block">Our Methodology</span>
          <h2 className="text-4xl md:text-6xl font-bold font-montserrat tracking-tight">The blueprint for <br/><span className="text-blue-400">digital dominance.</span></h2>
        </div>

        <div className="space-y-12">
          {processSteps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-2xl text-blue-400 font-montserrat group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                0{idx + 1}
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold font-montserrat mb-3">{step.title}</h3>
                <p className="text-slate-400 font-poppins text-lg">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
