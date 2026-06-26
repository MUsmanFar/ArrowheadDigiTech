'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';
import MagneticButton from '@/components/home/redesign/MagneticButton';

export default function CtaBlock() {
  const { section: cta } = useSiteSection('site.cta');
  const { section: nav } = useSiteSection('site.nav');
  const portfolioLabel =
    nav.items.find((i) => i.href === '/portfolio')?.name ?? nav.items[1]?.name ?? 'Portfolio';

  return (
    <section className="relative py-28 md:py-36 bg-page-surface overflow-hidden" aria-label="Call to action">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-40" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-montserrat font-semibold uppercase tracking-widest mb-6">
              {cta.badge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-white tracking-tight leading-[1.05] max-w-3xl mx-auto">
              {cta.headline}
              {cta.headlineAccent && (
                <>
                  <br />
                  <span className="text-orange-100">{cta.headlineAccent}</span>
                </>
              )}
            </h2>
            <p className="mt-6 text-lg text-orange-50/90 font-montserrat max-w-xl mx-auto leading-relaxed">
              {cta.description}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href={cta.buttonHref}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-orange-600 font-montserrat font-bold text-sm shadow-xl hover:bg-orange-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {cta.buttonLabel}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <MagneticButton
                href="/portfolio"
                variant="secondary"
                className="!bg-white/10 !text-white !border-white/30 hover:!bg-white/20"
              >
                {portfolioLabel}
                <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
