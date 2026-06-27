'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useSiteSection } from '@/lib/use-site-content';
import SectionBackdrop from './shared/SectionBackdrop';

export default function TechStackGrid() {
  const { studies } = useCaseStudies();
  const { section: labels } = useSiteSection('about.section-labels');
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 18 });
  const springY = useSpring(my, { stiffness: 60, damping: 18 });

  const technologies = useMemo(() => {
    const set = new Set<string>();
    studies.forEach((s) => s.technologies.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [studies]);

  if (technologies.length === 0) return null;

  const radius = 140;

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.04);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.04);
  };

  return (
    <SectionBackdrop theme="dark-glow" bottomFade className="py-28 md:py-40">
      <section
        ref={ref}
        onMouseMove={onMove}
        className="relative overflow-hidden"
        aria-label="Technology stack"
      >
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center md:mb-20"
          >
            <p className="mb-4 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#E46F1E]">
              {labels.technologiesTitle}
            </p>
            <h2 className="text-4xl font-bold font-poppins tracking-tight text-white md:text-5xl">
              {labels.technologiesSubtitle}
            </h2>
          </motion.div>

          <div className="relative mx-auto flex h-[420px] max-w-3xl items-center justify-center md:h-[480px]">
            <motion.div style={{ x: springX, y: springY }} className="relative h-[400px] w-[400px]">
              <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                {technologies.map((_, i) => {
                  const angle = (i / technologies.length) * Math.PI * 2 - Math.PI / 2;
                  const x2 = 200 + Math.cos(angle) * radius;
                  const y2 = 200 + Math.sin(angle) * radius;
                  return (
                    <line
                      key={`line-${i}`}
                      x1="200"
                      y1="200"
                      x2={x2}
                      y2={y2}
                      stroke="rgba(43,110,242,0.35)"
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>

              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div className="figma-glass flex h-24 w-24 items-center justify-center rounded-full md:h-28 md:w-28">
                  <span className="text-2xl font-bold font-poppins text-white">▲</span>
                </div>
              </div>

              {technologies.map((tech, i) => {
                const angle = (i / technologies.length) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="absolute left-1/2 top-1/2"
                    style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  >
                    <span className="figma-glass block whitespace-nowrap rounded-xl px-4 py-2 text-xs font-montserrat font-medium text-slate-200 transition-colors hover:border-[#E46F1E]/40 hover:text-white md:text-sm">
                      {tech}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
