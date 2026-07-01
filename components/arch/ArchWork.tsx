'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { useCaseStudies } from '@/lib/use-case-studies';
import { useProjectMediaMap, thumbnailFor } from '@/lib/use-project-media';

const TECH_BY_INDUSTRY: Record<string,string[]> = {
  Transportation:['React','Node.js','Maps API'], Healthcare:['Next.js','HIPAA','Auth'],
  Travel:['Vue','Booking API','PWA'], 'E-commerce':['Shopify','Stripe','Analytics'],
  Automotive:['React Native','IoT','Node.js'], Medical:['React','FHIR','AWS'],
  Finance:['Next.js','Plaid','D3.js'], Education:['React','LMS','WebRTC'],
};
const RESULTS: string[] = ['+42% conversion','3× faster load','2× revenue','98% uptime','40% cost cut','5× organic traffic'];

/* ─── browser chrome wrapper ─────────────────────────────────── */
function BrowserChrome({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  const bar = dark ? 'bg-[#181c22]' : 'bg-[#f0efee]';
  const dot1 = dark ? 'bg-[#ff5f57]/70' : 'bg-[#ff5f57]';
  const dot2 = dark ? 'bg-[#febc2e]/70' : 'bg-[#febc2e]';
  const dot3 = dark ? 'bg-[#28c840]/70' : 'bg-[#28c840]';
  const urlBg = dark ? 'bg-white/10 text-white/40' : 'bg-black/8 text-black/35';
  return (
    <div className="overflow-hidden rounded-[1.5rem]" style={{ boxShadow: dark ? '0 40px 100px -20px rgba(15,23,42,0.45),0 0 0 1px rgba(255,255,255,0.06)' : '0 32px 80px -16px rgba(15,23,42,0.18),0 0 0 1px rgba(15,20,30,0.08)' }}>
      <div className={`flex items-center gap-2.5 px-4 py-3 ${bar}`}>
        <div className="flex gap-1.5">
          <div className={`h-2.5 w-2.5 rounded-full ${dot1}`} />
          <div className={`h-2.5 w-2.5 rounded-full ${dot2}`} />
          <div className={`h-2.5 w-2.5 rounded-full ${dot3}`} />
        </div>
        <div className={`flex-1 rounded-md px-3 py-1 text-center ${urlBg}`}>
          <span className="font-inter text-[10px]">arrowheaddigitech.com/work</span>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─── featured card ──────────────────────────────────────────── */
function FeaturedCard({ study, thumb }: { study:{slug:string;title:string;summary?:string;industry?:string}; thumb:string|null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] });
  const imgScale = useTransform(scrollYProgress, [0,1], [1.07,1]);
  const [hovered, setHovered] = useState(false);
  const result = RESULTS[0];

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:32, scale:0.98 }} animate={inView?{opacity:1,y:0,scale:1}:{}}
      transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}>
      <BrowserChrome dark>
        <Link href={`/case-studies/${study.slug}`}
          onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
          className="group relative block overflow-hidden bg-[#0d1117]"
          aria-label={`Case study: ${study.title}`}>
          {thumb && (
            <div className="absolute inset-0 overflow-hidden">
              <motion.div style={{ scale:imgScale }} className="absolute inset-0">
                <SafeImage src={thumb} alt={study.title} fill
                  className="object-cover opacity-32 mix-blend-luminosity transition-opacity duration-700 group-hover:opacity-50" />
              </motion.div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[rgba(13,17,23,0.52)] to-transparent" />
          {/* Hover glass overlay */}
          <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration:0.3 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background:'linear-gradient(135deg,rgba(228,111,30,0.08) 0%,transparent 60%)' }} aria-hidden="true" />

          <div className="relative z-10 flex min-h-[440px] flex-col justify-end p-9 md:min-h-[500px] md:p-12">
            {study.industry && (
              <motion.div animate={{ y:hovered?-3:0 }} transition={{ duration:0.28 }}
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(228,111,30,0.28)] bg-[rgba(228,111,30,0.14)] px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e46f1e]" aria-hidden="true" />
                <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f59e42]">{study.industry}</span>
              </motion.div>
            )}
            <motion.h3 animate={{ y:hovered?-5:0 }} transition={{ duration:0.32 }}
              className="font-inter font-extrabold text-white"
              style={{ fontSize:'clamp(1.4rem,2.6vw,2.4rem)', lineHeight:1.1, letterSpacing:'-0.03em' }}>
              {study.title}
            </motion.h3>
            {study.summary && (
              <motion.p animate={{ y:hovered?-3:0, opacity:hovered?1:0.65 }} transition={{ duration:0.32 }}
                className="mt-3 max-w-xl font-inter text-[14px] leading-relaxed text-[rgba(255,255,255,0.58)] line-clamp-2">
                {study.summary}
              </motion.p>
            )}
            <div className="mt-7 flex items-center justify-between border-t border-[rgba(255,255,255,0.07)] pt-5">
              {/* Result badge */}
              <div className="flex items-center gap-2 rounded-full border border-[rgba(5,150,105,0.3)] bg-[rgba(5,150,105,0.14)] px-3 py-1.5 backdrop-blur-md">
                <TrendingUp size={11} className="text-emerald-400" aria-hidden="true" />
                <span className="font-inter text-[10.5px] font-semibold text-emerald-400">{result}</span>
              </div>
              <motion.div animate={{ scale:hovered?1.1:1 }} transition={{ duration:0.28 }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)] transition-all duration-300 group-hover:bg-[#e46f1e] group-hover:shadow-[0_8px_24px_-6px_rgba(228,111,30,0.55)]">
                <ArrowUpRight size={15} className="text-white" aria-hidden="true" />
              </motion.div>
            </div>
          </div>
        </Link>
      </BrowserChrome>
    </motion.div>
  );
}

/* ─── secondary card ─────────────────────────────────────────── */
function SecondaryCard({ study, thumb, index }: { study:{slug:string;title:string;summary?:string;industry?:string}; thumb:string|null; index:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-50px' });
  const [hovered, setHovered] = useState(false);
  const tags = TECH_BY_INDUSTRY[study.industry||''] || ['React','Node.js','AWS'];
  const result = RESULTS[(index + 1) % RESULTS.length];

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:24, scale:0.97 }} animate={inView?{opacity:1,y:0,scale:1}:{}}
      transition={{ duration:0.75, ease:[0.22,1,0.36,1], delay:index*0.09 }}
      style={{ perspective:'1000px' }}>
      <motion.div
        animate={{ rotateY: hovered ? 1.5 : 0, rotateX: hovered ? -1 : 0 }}
        transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
        style={{ transformStyle:'preserve-3d' }}>
        <Link href={`/case-studies/${study.slug}`}
          onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
          className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-[#0d1117]"
          style={{ boxShadow:'0 16px 48px -16px rgba(15,23,42,0.28)' }}
          aria-label={`Case study: ${study.title}`}>
          {thumb && (
            <div className="relative h-48 overflow-hidden">
              <motion.div animate={{ scale:hovered?1.06:1 }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }} className="absolute inset-0">
                <SafeImage src={thumb} alt={study.title} fill className="object-cover opacity-42 mix-blend-luminosity" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1117]" />
              {/* Glass overlay */}
              <motion.div animate={{ opacity:hovered?1:0 }} transition={{ duration:0.28 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background:'linear-gradient(135deg,rgba(228,111,30,0.10) 0%,transparent 60%)' }} aria-hidden="true" />
            </div>
          )}
          <div className={`relative z-10 flex flex-1 flex-col p-6 ${!thumb?'min-h-[200px] justify-end':''}`}>
            {study.industry && <span className="mb-2 font-inter text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e46f1e]">{study.industry}</span>}
            <h3 className="font-inter text-[1rem] font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[#f5f0eb]">{study.title}</h3>
            {/* Tech badges */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0,3).map(t => (
                <span key={t} className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-2.5 py-1 font-inter text-[9.5px] font-semibold text-[rgba(255,255,255,0.45)]">{t}</span>
              ))}
            </div>
            {/* Result */}
            <div className="mt-3 flex items-center gap-1.5">
              <TrendingUp size={10} className="text-emerald-400" aria-hidden="true" />
              <span className="font-inter text-[10.5px] font-semibold text-emerald-400">{result}</span>
            </div>
            <motion.div animate={{ x:hovered?4:0 }} transition={{ duration:0.28 }}
              className="mt-4 flex items-center gap-1.5 font-inter text-[11px] font-semibold text-[rgba(255,255,255,0.28)] transition-colors duration-300 group-hover:text-[#e46f1e]">
              <span>View project</span><ArrowRight size={11} />
            </motion.div>
          </div>
          {/* 3D shine line */}
          <motion.div animate={{ opacity:hovered?1:0, scaleX:hovered?1:0 }}
            transition={{ duration:0.35 }}
            className="absolute inset-x-0 top-0 h-[1px] origin-left bg-gradient-to-r from-[rgba(255,255,255,0.15)] via-[rgba(255,255,255,0.06)] to-transparent"
            aria-hidden="true" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function ArchWork() {
  const { studies } = useCaseStudies();
  const mediaMap = useProjectMediaMap();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once:true, margin:'-80px' });
  if (studies.length===0) return null;

  const featured = studies[0];
  const secondary = studies.slice(1,4);
  const featuredThumb = thumbnailFor(mediaMap.get(featured.slug)) || featured.thumbnail || null;

  return (
    <section ref={sectionRef} className="relative overflow-hidden" aria-label="Selected work"
      style={{ background:'linear-gradient(180deg,rgba(249,247,244,0.98) 0%,rgba(249,247,244,0.95) 100%)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-55"
        style={{ backgroundImage:'radial-gradient(ellipse 65% 40% at 75% 0%,rgba(228,111,30,0.05),transparent 65%),radial-gradient(ellipse 45% 50% at 20% 100%,rgba(43,110,242,0.04),transparent 65%)' }}
        aria-hidden="true" />

      <div className="arch-container relative z-10 py-20 md:py-28">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:mb-14">
          <div>
            <motion.p initial={{opacity:0,x:-10}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}} className="arch-eyebrow mb-3">Selected Work</motion.p>
            <motion.h2 initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8,ease:[0.22,1,0.36,1],delay:0.07}}
              className="font-inter font-extrabold text-[#0d1117]"
              style={{fontSize:'clamp(1.75rem,3.4vw,3.2rem)',lineHeight:1.07,letterSpacing:'-0.03em'}}>
              Problems solved.<br/><span className="arch-text-orange">Results shipped.</span>
            </motion.h2>
          </div>
          <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.6,delay:0.22}}>
            <Link href="/case-studies" className="group inline-flex items-center gap-1.5 font-inter text-[13px] font-semibold text-[#374151] transition-colors hover:text-[#e46f1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2">
              All case studies <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        <FeaturedCard study={featured} thumb={featuredThumb} />

        {secondary.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((s,i) => <SecondaryCard key={s.slug} study={s} thumb={thumbnailFor(mediaMap.get(s.slug))||s.thumbnail||null} index={i} />)}
          </div>
        )}

        <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.6,ease:[0.22,1,0.36,1]}} className="mt-10 flex justify-center">
          <Link href="/portfolio"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[rgba(15,20,30,0.1)] bg-white px-8 py-3.5 font-inter text-[13px] font-semibold text-[#374151] shadow-[0_4px_16px_-4px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e46f1e] hover:text-[#e46f1e] hover:shadow-[0_10px_28px_-8px_rgba(228,111,30,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2">
            Explore full portfolio <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
