'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';

export default function Manifesto() {
  const { section: manifesto } = useSiteSection('about.manifesto');
  const [openId, setOpenId] = useState<string | null>(manifesto.items[0]?.id ?? null);

  return (
    <section className="py-32 bg-slate-950 text-white relative z-10" aria-label="The Arrowhead Manifesto">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat tracking-tight">
            {manifesto.title}
          </h2>
        </div>

        <div className="space-y-4">
          {manifesto.items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="border-b border-white/10 pb-4">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-mono text-orange-400">{item.id}</span>
                    <span className="text-xl md:text-2xl font-bold font-poppins group-hover:text-orange-300 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  {isOpen ? <Minus className="text-orange-400" /> : <Plus className="text-slate-500" />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-400 font-poppins leading-relaxed pl-12 md:pl-16 pb-4">
                        {item.content}
                      </p>
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
