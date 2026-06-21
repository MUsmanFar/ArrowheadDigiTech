'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <motion.div
            key={faq.id || index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
          >
            <div
              className={`rounded-xl border transition-all duration-300 ${
                isOpen
                  ? 'border-orange-200 bg-orange-50/50 shadow-sm'
                  : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-slate-800 focus:outline-none"
              >
                <span className="text-sm md:text-base font-inter leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-orange-500' : ''
                  }`}
                  size={16}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 pt-0 text-slate-600 text-sm leading-relaxed font-inter border-t border-slate-100 mt-0">
                      <div className="pt-4">{faq.answer}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
