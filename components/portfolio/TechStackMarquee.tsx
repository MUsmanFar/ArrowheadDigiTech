import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Monitor, Layers, Smartphone } from 'lucide-react';

const technologies = [
  "Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion", "PostgreSQL", "Prisma", "AWS", "Vercel", "GraphQL", "Figma"
];

export default function TechStackMarquee() {
  return (
    <section className="py-24 px-6 lg:px-8 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-montserrat tracking-tight mb-4">Empowering Diverse Industries</h2>
          <p className="text-slate-600 font-poppins max-w-2xl mx-auto">We engineer solutions tailored to the unique challenges of modern verticals.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {[
            { icon: Globe, name: "E-Commerce" },
            { icon: Monitor, name: "SaaS & Tech" },
            { icon: Layers, name: "Finance & Fintech" },
            { icon: Smartphone, name: "Healthcare" }
          ].map((ind, idx) => (
            <div key={idx} className="glass rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer border border-blue-50/50">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-blue-600">
                <ind.icon size={28} className="text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <span className="font-semibold text-slate-800 font-poppins">{ind.name}</span>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex overflow-hidden whitespace-nowrap">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              className="flex gap-8 items-center py-4"
            >
              {[...technologies, ...technologies].map((tech, idx) => (
                <div key={idx} className="px-8 py-4 glass rounded-xl font-bold text-slate-400 font-poppins text-lg hover:text-blue-600 transition-colors cursor-default">
                  {tech}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
