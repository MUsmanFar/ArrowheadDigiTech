'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useCaseStudies } from '@/lib/use-case-studies';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

type Testimonial = { id:string; name:string; role?:string|null; company?:string|null; content:string; featured?:boolean };

function StarRating({ delay=0 }: { delay?: number }) {
  return (
    <div className="flex gap-1" aria-label="5 star rating">
      {Array.from({length:5}).map((_,i) => (
        <motion.div key={i} initial={{opacity:0,scale:0.3}} animate={{opacity:1,scale:1}}
          transition={{delay:delay+i*0.06,duration:0.3,ease:[0.22,1,0.36,1]}}>
          <Star size={14} className="fill-[#e46f1e] text-[#e46f1e]" aria-hidden="true" />
        </motion.div>
      ))}
    </div>
  );
}

function TestimonialCard({ t, active, onClick }: { t:Testimonial; active:boolean; onClick:()=>void }) {
  return (
    <motion.button type="button" layout onClick={onClick} aria-pressed={active}
      className={`group relative w-full overflow-hidden rounded-2xl border text-left transition-all duration-450 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2 ${
        active
          ? 'scale-[1.008] border-[rgba(228,111,30,0.22)] shadow-[0_16px_48px_-16px_rgba(15,23,42,0.11)]'
          : 'border-[rgba(15,20,30,0.07)] hover:border-[rgba(15,20,30,0.11)] hover:shadow-[0_6px_24px_-8px_rgba(15,23,42,0.07)]'
      }`}
      style={{
        background: active
          ? 'rgba(255,255,255,0.92)'
          : 'rgba(250,250,249,0.85)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        boxShadow: active ? '0 16px 48px -16px rgba(15,23,42,0.11),inset 0 1px 0 rgba(255,255,255,1)' : 'inset 0 1px 0 rgba(255,255,255,0.7)',
      }}>
      {/* Radial glow */}
      <div className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-450 ${active?'opacity-100':'opacity-0 group-hover:opacity-60'}`}
        style={{ background:'radial-gradient(ellipse 80% 60% at 20% 0%,rgba(228,111,30,0.07),transparent 65%)' }} aria-hidden="true" />
      {/* Active left border */}
      <motion.div animate={{ scaleY:active?1:0 }} transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
        className="absolute left-0 top-0 h-full w-[2.5px] origin-top bg-gradient-to-b from-[#e46f1e] to-[#f59e42]" aria-hidden="true" />
      {/* Shine sweep */}
      <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full" aria-hidden="true" />

      <div className="p-5">
        {active && (
          <div className="mb-4">
            <StarRating delay={0} />
          </div>
        )}
        {/* Quote mark */}
        <div className={`mb-2 font-inter text-[3rem] font-black leading-none select-none transition-all duration-300 ${active?'text-[#e46f1e] opacity-20':' opacity-0 h-0 overflow-hidden'}`} aria-hidden="true">&ldquo;</div>

        <p className={`font-inter leading-[1.6] transition-all duration-300 ${active?'text-[#1c2333] font-medium text-[14.5px]':'text-[#6b7280] font-normal text-[13px] line-clamp-3'}`}>
          {t.content}
        </p>

        <div className={`mt-4 flex items-center gap-3 border-t pt-3.5 transition-colors duration-300 ${active?'border-[rgba(228,111,30,0.1)]':'border-[rgba(15,20,30,0.05)]'}`}>
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-inter text-[12px] font-bold transition-all duration-300 ${active?'bg-[rgba(228,111,30,0.1)] text-[#e46f1e] shadow-[0_4px_12px_-4px_rgba(228,111,30,0.22)]':'bg-[rgba(15,20,30,0.06)] text-[#6b7280]'}`}>
            {t.name.charAt(0)}
          </div>
          <div>
            <p className="font-inter text-[12px] font-bold text-[#0d1117]">{t.name}</p>
            <p className="font-inter text-[10.5px] text-[#9ca3af]">{[t.role,t.company].filter(Boolean).join(' · ')}</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function ArchTestimonials() {
  const { studies } = useCaseStudies();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once:true, margin:'-80px' });

  useEffect(() => {
    fetch('/api/public/testimonials').then(r=>r.ok?r.json():[])
      .then((d:unknown)=>{ if(!Array.isArray(d)) return; const f=d.filter((t:Testimonial)=>t.featured); setTestimonials((f.length?f:d).slice(0,5)); })
      .catch(()=>{});
  },[]);

  useEffect(()=>{
    if(testimonials.length<=1) return;
    const id=setInterval(()=>setActive(a=>(a+1)%testimonials.length),9000);
    return ()=>clearInterval(id);
  },[testimonials.length]);

  const contextStudies = studies.slice(0,3);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" aria-label="Client testimonials"
      style={{ background:'linear-gradient(180deg,rgba(255,255,255,0.98) 0%,rgba(249,247,244,0.97) 100%)' }}>
      {/* Dot texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{ backgroundImage:'radial-gradient(circle,rgba(15,20,30,0.06) 1px,transparent 1px)', backgroundSize:'28px 28px' }} aria-hidden="true" />
      {/* Floating depth layers */}
      <div className="pointer-events-none absolute -right-8 top-0 h-[45vh] w-[35vw] rounded-full"
        style={{ background:'radial-gradient(circle,rgba(228,111,30,0.065),transparent 68%)', filter:'blur(55px)' }} aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-[35vh] w-[30vw] rounded-full"
        style={{ background:'radial-gradient(circle,rgba(43,110,242,0.045),transparent 70%)', filter:'blur(50px)' }} aria-hidden="true" />
      {/* Floating geometric ornament */}
      <div className="pointer-events-none absolute right-8 top-10 h-36 w-36 opacity-[0.03]" aria-hidden="true">
        <svg viewBox="0 0 144 144" fill="none" className="h-full w-full">
          <rect x="1" y="1" width="142" height="142" stroke="#e46f1e" strokeWidth="1" strokeDasharray="4 6" rx="16"/>
          <rect x="20" y="20" width="104" height="104" stroke="#2b6ef2" strokeWidth="0.75" rx="10"/>
          <line x1="1" y1="72" x2="143" y2="72" stroke="#0d1117" strokeWidth="0.5"/>
          <line x1="72" y1="1" x2="72" y2="143" stroke="#0d1117" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="arch-container relative z-10 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">

          {/* Left */}
          <div className="lg:col-span-7">
            <motion.p initial={{opacity:0,x:-10}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}}
              className="arch-eyebrow mb-6">Client Voices</motion.p>

            {testimonials.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {testimonials.map((t,i)=>(
                  <motion.div key={t.id} initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}}
                    transition={{duration:0.65,ease:[0.22,1,0.36,1],delay:i*0.07}}>
                    <TestimonialCard t={t} active={i===active} onClick={()=>setActive(i)} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-2.5">
                {Array.from({length:3}).map((_,i)=>(
                  <div key={i} className="h-24 animate-pulse rounded-2xl bg-[rgba(15,20,30,0.04)]" />
                ))}
              </div>
            )}
          </div>

          {/* Right */}
          <div className="lg:col-span-5">
            <motion.div initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.8,ease:[0.22,1,0.36,1],delay:0.18}}>
              <p className="mb-4 font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(15,20,30,0.3)]">From our work</p>
              <div className="flex flex-col gap-3">
                {contextStudies.map((s,i)=>(
                  <motion.div key={s.slug} initial={{opacity:0,x:16}} animate={inView?{opacity:1,x:0}:{}}
                    transition={{duration:0.65,ease:[0.22,1,0.36,1],delay:0.28+i*0.09}}>
                    <Link href={`/case-studies/${s.slug}`}
                      className="group flex items-start justify-between gap-3 rounded-2xl border border-[rgba(15,20,30,0.07)] p-4.5 transition-all duration-300 hover:border-[rgba(228,111,30,0.18)] hover:shadow-[0_8px_28px_-8px_rgba(15,23,42,0.08)]"
                      style={{ padding:'1.125rem', background:'rgba(255,255,255,0.7)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.9)' }}>
                      <div className="min-w-0">
                        {s.industry && <span className="mb-1 block font-inter text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#e46f1e]">{s.industry}</span>}
                        <h4 className="font-inter text-[13px] font-bold leading-snug text-[#1c2333] transition-colors duration-300 group-hover:text-[#0d1117] truncate">{s.title}</h4>
                        {s.summary && <p className="mt-0.5 font-inter text-[11.5px] leading-relaxed text-[#9ca3af] line-clamp-2">{s.summary}</p>}
                      </div>
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(15,20,30,0.08)] bg-white transition-all duration-300 group-hover:border-[#e46f1e] group-hover:bg-[#e46f1e]">
                        <ArrowRight size={12} className="text-[#9ca3af] transition-colors duration-300 group-hover:text-white" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
                <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.6,delay:0.55}}>
                  <Link href="/case-studies"
                    className="group flex items-center justify-between rounded-2xl border border-dashed border-[rgba(15,20,30,0.09)] px-4.5 py-4 transition-all duration-300 hover:border-[#e46f1e]"
                    style={{ padding:'1rem 1.125rem' }}>
                    <span className="font-inter text-[13px] font-semibold text-[#6b7280] transition-colors duration-300 group-hover:text-[#e46f1e]">View all case studies</span>
                    <ArrowRight size={13} className="text-[#9ca3af] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#e46f1e]" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
