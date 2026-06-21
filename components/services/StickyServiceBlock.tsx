'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle } from 'lucide-react';

interface ServiceCardProps {
  index: number;
  title: string;
  description: string;
  features: string[];
  slug: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] },
  },
};

const colorPairs = [
  {
    dot: 'bg-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    text: 'text-orange-600',
    gradient: 'from-orange-500 to-amber-400',
    shadow: 'shadow-orange-500/10',
  },
  {
    dot: 'bg-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-blue-500/10',
  },
  {
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-500/10',
  },
  {
    dot: 'bg-purple-500',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-400',
    shadow: 'shadow-purple-500/10',
  },
];

export default function StickyServiceBlock({
  index,
  title,
  description,
  features,
  slug,
}: ServiceCardProps) {
  const colors = colorPairs[index % colorPairs.length];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="group"
    >
      <Link href={`/services/${slug}`} className="block h-full">
        <div
          className={`relative ${colors.bg} ${colors.border} border rounded-2xl p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl ${colors.shadow}`}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <span
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} text-2xl font-bold ${colors.text} font-poppins`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <span className={`text-xs font-semibold tracking-wide uppercase ${colors.text}`}>
                      Service
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 font-poppins tracking-tight">
                    {title}
                  </h3>
                </div>
                <span
                  className={`hidden md:flex w-10 h-10 rounded-full ${colors.bg} border ${colors.border} items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white group-hover:border-slate-200`}
                >
                  <ArrowUpRight
                    size={16}
                    className={`${colors.text} transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
                  />
                </span>
              </div>

              <p className="mt-3 text-sm md:text-base text-slate-500 font-inter leading-relaxed max-w-2xl">
                {description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {features.slice(0, 3).map((feature, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}
                  >
                    <CheckCircle size={12} />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
        </div>
      </Link>
    </motion.div>
  );
}
