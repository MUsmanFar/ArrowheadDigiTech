'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/case-study';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';

const industryColors: Record<string, { border: string; bg: string; text: string }> = {
  Transportation: { border: 'border-orange-100', bg: 'bg-orange-50', text: 'text-orange-600' },
  Healthcare: { border: 'border-blue-100', bg: 'bg-blue-50', text: 'text-blue-600' },
  Travel: { border: 'border-emerald-100', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  'E-commerce': { border: 'border-purple-100', bg: 'bg-purple-50', text: 'text-purple-600' },
  Automotive: { border: 'border-slate-200', bg: 'bg-slate-50', text: 'text-slate-600' },
};

function getColor(industry: string) {
  return industryColors[industry] || industryColors.Automotive;
}

export default function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const mediaMap = useProjectMediaMap();
  const colors = getColor(study.industry);
  const projectMedia = mediaMap.get(study.slug);
  const thumb = thumbnailFor(projectMedia) || study.thumbnail;

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group block border-b border-slate-100 px-6 py-16 transition-colors hover:bg-slate-50/50 lg:px-8 lg:py-24"
    >
      <article className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 font-inter">
            {String(index + 1).padStart(2, '0')}
          </p>
          <span
            className={`mt-3 inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}
          >
            {study.industry}
          </span>
          <p className="mt-2 font-poppins text-lg font-bold text-slate-900">
            {study.client}
          </p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 lg:col-span-5">
          {thumb && (
            <Image
              src={thumb}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          )}
        </div>

        <div className="lg:col-span-5">
          <h2 className="font-poppins text-3xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-orange-600 md:text-4xl">
            {study.title}
          </h2>
          <p className="mt-4 max-w-xl font-inter leading-relaxed text-slate-500">
            {study.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-6 border-l-2 border-orange-500 pl-4">
            {study.metrics.map((metric) => (
              <div key={metric.label}>
                <strong className="block font-poppins text-2xl text-slate-900">
                  {metric.value}
                </strong>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600">
            Read case study <ArrowUpRight size={14} />
          </span>
        </div>
      </article>
    </Link>
  );
}
