'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <motion.div
            key={faq.id || index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
              isOpen 
                ? 'border-blue-200 bg-blue-50/10 shadow-md shadow-blue-100/10' 
                : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
            }`}>
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 font-semibold text-slate-800 focus:outline-none"
              >
                <span className="flex items-center gap-3 font-montserrat text-sm md:text-base leading-snug">
                  <HelpCircle className={`flex-shrink-0 transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-400'}`} size={20} />
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`} 
                  size={18} 
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <CardContent className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed font-poppins border-t border-slate-50/50">
                      {faq.answer}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
