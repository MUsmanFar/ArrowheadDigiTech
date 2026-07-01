'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, Bot, Code2, Layers, LineChart, Megaphone,
  Palette, Search, ShoppingCart, Smartphone, Sparkles, Target,
  Zap, CheckCircle2, Clock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';

type Service = { slug: string; title: string; description: string; order?: number };

const SERVICE_META: Record<string, {
  icon: LucideIcon; color: string; tagline: string; benefits: string[]; delivery: string;
}> = {
  'web-development':     { icon: Code2,        color: '#2b6ef2', tagline: 'Performant. Precise. Scalable.',   benefits: ['Next.js & React apps', 'Core Web Vitals optimised', 'Full CMS integration', 'SEO-ready architecture'],  delivery: '4–8 wks' },
  'ai-chatbots':         { icon: Bot,          color: '#7c3aed', tagline: 'Intelligent automation at scale.', benefits: ['Custom LLM workflows', 'GPT-4 / Claude integration', 'CRM & API connected', 'Live handoff support'],    delivery: '3–6 wks' },
  'lead-generation':     { icon: Target,       color: '#e46f1e', tagline: 'Pipeline that converts.',          benefits: ['Multi-channel funnels', 'A/B tested landing pages', 'CRM automation', 'Analytics dashboard'],          delivery: '2–4 wks' },
  'digital-strategy':    { icon: LineChart,    color: '#059669', tagline: 'Direction before execution.',      benefits: ['Market positioning', 'Growth roadmapping', 'Competitor analysis', 'KPI framework'],                     delivery: '1–2 wks' },
  'seo':                 { icon: Search,       color: '#0891b2', tagline: 'Visibility that compounds.',       benefits: ['Technical SEO audit', 'Content strategy', 'Link building', 'Monthly ranking reports'],                  delivery: 'Ongoing' },
  'e-commerce':          { icon: ShoppingCart, color: '#e46f1e', tagline: 'Commerce built to convert.',       benefits: ['Shopify / custom builds', 'Payment gateway setup', 'Inventory integration', 'Conversion optimisation'], delivery: '5–10 wks' },
  'branding':            { icon: Palette,      color: '#db2777', tagline: 'Identity that commands respect.',  benefits: ['Logo & visual system', 'Brand guidelines', 'Typography & colour', 'Asset library'],                    delivery: '2–4 wks' },
  'marketing':           { icon: Megaphone,    color: '#d97706', tagline: 'Reach the right people.',          benefits: ['Paid social & search', 'Email sequences', 'Content marketing', 'Performance reporting'],                delivery: 'Ongoing' },
  'mobile-applications': { icon: Smartphone,   color: '#2b6ef2', tagline: 'Native. Fluid. Memorable.',       benefits: ['iOS & Android', 'React Native / Flutter', 'Push notifications', 'App Store optimisation'],              delivery: '8–14 wks' },
  'automation':          { icon: Zap,          color: '#e46f1e', tagline: 'Systems that work for you.',       benefits: ['Zapier / n8n workflows', 'API integrations', 'CRM automation', 'Reporting pipelines'],                  delivery: '2–5 wks' },
  'saas-products':       { icon: Layers,       color: '#7c3aed', tagline: 'Products built to grow.',         benefits: ['Multi-tenant architecture', 'Stripe billing', 'Role-based access', 'Usage analytics'],                  delivery: '10–16 wks' },
};
const FALLBACK_ICONS = [Code2, Bot, Target, Layers, Sparkles, LineChart, Palette, Smartphone, Zap, Search, Megaphone, ShoppingCart];
function getMeta(slug: string, i: number) {
  return SERVICE_META[slug] ?? {
    icon: FALLBACK_ICONS[i % FALLBACK_ICONS.length],
    color: ['#e46f1e','#2b6ef2','#059669','#7c3aed','#0891b2'][i % 5],
    tagline: 'Engineered for results.',
    benefits: ['Custom-built solution','Fully managed delivery','Ongoing support','Performance tracking'],
    delivery: 'Custom',
  };
}

/* ─── premium service card ──────────────────────────────────── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const meta = getMeta(service.slug, index);
  const Icon = meta.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.07 }}
    >
      <Link
        href={`/services/${service.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2"
        style={{
          background: hovered ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderColor: hovered ? `${meta.color}28` : 'rgba(15,20,30,0.08)',
          boxShadow: hovered
            ? `0 20px 52px -12px ${meta.color}20, 0 4px 16px -4px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,1)`
            : '0 4px 16px -4px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
        aria-label={service.title}
      >
        {/* Animated gradient border — top */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-0 h-[2px] origin-left"
          style={{ background: `linear-gradient(to right, ${meta.color}, ${meta.color}40)` }}
          aria-hidden="true"
        />

        {/* Ambient per-card glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-400"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 10% 0%, ${meta.color}08, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* Background icon watermark */}
        <div
          className="pointer-events-none absolute right-4 top-4 transition-all duration-500"
          style={{ opacity: hovered ? 0.06 : 0.03 }}
          aria-hidden="true"
        >
          <Icon size={88} style={{ color: meta.color }} />
        </div>

        {/* Shine sweep on hover */}
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col p-6">
          {/* Icon + delivery tag row */}
          <div className="mb-5 flex items-start justify-between">
            <motion.div
              animate={{ scale: hovered ? 1.08 : 1, rotate: hovered ? 6 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300"
              style={{
                background: hovered ? `${meta.color}12` : 'rgba(255,255,255,0.9)',
                borderColor: hovered ? `${meta.color}28` : 'rgba(15,20,30,0.08)',
                boxShadow: hovered ? `0 6px 20px -6px ${meta.color}30` : '0 2px 8px -2px rgba(15,23,42,0.07)',
              }}
            >
              <Icon size={20} style={{ color: hovered ? meta.color : '#9ca3af' }} className="transition-colors duration-300" aria-hidden="true" />
            </motion.div>

            <span
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-inter text-[10px] font-semibold transition-all duration-300"
              style={{ background: `${meta.color}10`, color: meta.color }}
            >
              <Clock size={9} aria-hidden="true" />
              {meta.delivery}
            </span>
          </div>

          {/* Title + tagline */}
          <h3
            className="font-inter text-[1rem] font-bold tracking-tight transition-colors duration-300"
            style={{ color: hovered ? '#0d1117' : '#1c2333', letterSpacing: '-0.02em' }}
          >
            {service.title}
          </h3>
          <p className="mt-1 font-inter text-[12.5px] text-[#9ca3af]">{meta.tagline}</p>

          {/* Description */}
          <p className="mt-3 font-inter text-[13px] leading-[1.72] text-[#6b7280] flex-1">
            {service.description}
          </p>

          {/* Benefits — revealed on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 overflow-hidden space-y-1.5"
              >
                {meta.benefits.map((b, bi) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: bi * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-2 font-inter text-[12px] font-medium text-[#374151]"
                  >
                    <CheckCircle2 size={12} style={{ color: meta.color }} className="shrink-0" aria-hidden="true" />
                    {b}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* CTA row */}
          <div className="mt-5 flex items-center justify-between border-t pt-4 transition-colors duration-300"
            style={{ borderColor: hovered ? `${meta.color}15` : 'rgba(15,20,30,0.06)' }}>
            <span
              className="font-inter text-[12px] font-semibold transition-colors duration-300"
              style={{ color: hovered ? meta.color : 'rgba(15,20,30,0.35)' }}
            >
              Explore service
            </span>
            <motion.div
              animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
              transition={{ duration: 0.28 }}
              className="flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300"
              style={{
                background: hovered ? meta.color : 'rgba(15,20,30,0.06)',
                boxShadow: hovered ? `0 6px 16px -4px ${meta.color}40` : 'none',
              }}
            >
              <ArrowUpRight size={13} style={{ color: hovered ? '#fff' : '#9ca3af' }} aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── main ───────────────────────────────────────────────────── */
export default function ArchServices() {
  const { section: intro } = useSiteSection('home.capabilities');
  const [services, setServices] = useState<Service[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    fetch('/api/public/services')
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setServices([...d].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))); })
      .catch(() => {});
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white" aria-label="Our services">
      {/* Architectural grid */}
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(to right,rgba(15,20,30,0.022) 1px,transparent 1px),linear-gradient(to bottom,rgba(15,20,30,0.022) 1px,transparent 1px)', backgroundSize: '64px 64px' }}
        aria-hidden="true" />
      {/* Left bloom */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[50vh] w-[20vw] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(228,111,30,0.06),transparent 70%)', filter: 'blur(50px)' }} aria-hidden="true" />
      {/* Right bloom */}
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-[40vh] w-[18vw] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(43,110,242,0.05),transparent 70%)', filter: 'blur(48px)' }} aria-hidden="true" />

      <div className="arch-container relative z-10 py-16 md:py-20">
        {/* Section header */}
        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end md:mb-14">
          <div className="lg:col-span-6">
            <motion.p initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="arch-eyebrow mb-3">
              Our Capabilities
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
              className="font-inter font-extrabold text-[#0d1117]"
              style={{ fontSize: 'clamp(1.75rem,3.4vw,3.2rem)', lineHeight: 1.07, letterSpacing: '-0.03em' }}>
              {intro.headline || 'One studio.'}<br />
              <span className="arch-text-orange">{intro.headlineAccent || 'Every discipline.'}</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-6">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
              className="font-inter text-[14.5px] leading-[1.8] text-[#6b7280]">
              {intro.description || 'From the first concept to enterprise rollout — every discipline under one roof.'}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }} className="mt-5">
              <Link href={intro.viewAllHref || '/services'}
                className="group inline-flex items-center gap-1.5 font-inter text-[13px] font-semibold text-[#0d1117] transition-colors hover:text-[#e46f1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46f1e] focus-visible:ring-offset-2">
                {intro.viewAllLabel || 'All services'}
                <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Card grid */}
        {services.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-[rgba(15,20,30,0.04)]" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
