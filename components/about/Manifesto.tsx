'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const manifestoItems = [
  {
    id: '01',
    title: 'Obsession with Outcomes',
    content: 'We ignore vanity metrics. Every line of code written and every design decision made is relentlessly tied to increasing your revenue, reducing your costs, or scaling your operational efficiency.'
  },
  {
    id: '02',
    title: 'Architectural Excellence',
    content: 'We refuse to build on brittle foundations. Our systems are cloud-native, headless, and engineered to scale infinitely without technical debt slowing down your future growth.'
  },
  {
    id: '03',
    title: 'Radical Transparency',
    content: 'No black boxes. You get direct access to our tracking dashboards, GitHub repositories, and staging environments. We operate as a direct extension of your internal team.'
  },
  {
    id: '04',
    title: 'Psychological Design',
    content: 'Aesthetics matter, but conversion is paramount. We utilize deep psychological principles in our UI/UX to naturally guide users toward high-value actions.'
  }
];

export default function Manifesto() {
  const [openId, setOpenId] = useState<string | null>(manifestoItems[0].id);

  return (
    <section className="py-32 bg-slate-950 text-white relative z-10" aria-label="The Arrowhead Manifesto">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-blue-500 font-bold uppercase tracking-widest text-xs font-poppins mb-4 block">Our Principles</span>
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat tracking-tight">
            The Manifesto.
          </h2>
        </div>

        <div className="border-t border-white/10">
          {manifestoItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="border-b border-white/10">
                <button 
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full py-8 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className={`font-poppins text-sm md:text-base font-bold transition-colors ${isOpen ? 'text-blue-500' : 'text-slate-500'}`}>
                      {item.id}
                    </span>
                    <h3 className={`text-2xl md:text-4xl font-bold font-montserrat tracking-tight transition-colors ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${isOpen ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/20 text-slate-400 group-hover:text-white'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pl-[4.5rem] md:pl-[5.25rem] pr-4 max-w-2xl">
                        <p className="text-lg text-slate-400 font-poppins leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
