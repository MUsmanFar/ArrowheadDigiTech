'use client';

import {
  Chapter,
  ChapterBridge,
  CommandGlass,
  DepthLayer,
  InteractiveCard,
  LightingPools,
  ParallaxLayer,
  ParticleField,
  Reveal,
  SignalButton,
  SignalCanvas,
  SignalCore,
  SignalLink,
} from '@/components/visual-engine';
import { bridgeHeights, signalCoreScale } from '@/lib/visual-engine/tokens';

function LabSection({
  title,
  children,
  dark = false,
}: {
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section className="border-b border-white/10 py-16">
      <h2
        className={`mb-8 font-montserrat text-xs font-semibold uppercase tracking-[0.28em] ${
          dark ? 'text-[#e46f1e]' : 'text-[#94a3b8]'
        }`}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignLabShowcase() {
  return (
    <div className="min-h-screen ve-chapter-void-deep text-white">
      <header className="border-b border-white/10 px-6 py-12 md:px-12">
        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.28em] text-[#e46f1e]">
          Internal · Phase 31
        </p>
        <h1 className="mt-4 font-poppins text-4xl font-bold tracking-tight md:text-5xl">
          Arrowhead <span className="ve-text-signal-gradient">Visual Engine</span>
        </h1>
        <p className="mt-4 max-w-2xl font-montserrat text-slate-400">
          Approved design system foundation. Not public. Delete before production.
        </p>
      </header>

      <div className="container-premium py-8">
        <LabSection title="1 · Background Engine — Dark Chapter" dark>
          <Chapter token="void" poolBlueOpacity={0.35} poolOrangeOpacity={0.2} fog className="min-h-[280px] rounded-[32px]">
            <DepthLayer layer="signal" className="absolute inset-0">
              <SignalCanvas className="absolute inset-0 h-full w-full" opacityScale="hero" />
            </DepthLayer>
            <DepthLayer layer="content" className="flex min-h-[280px] items-center justify-center p-8">
              <p className="font-poppins text-2xl font-bold">Void Chapter + Atmospheric Triple</p>
            </DepthLayer>
          </Chapter>
        </LabSection>

        <LabSection title="2 · Background Engine — Light Chapter + Bridge">
          <ChapterBridge from="void" to="paper" heightPx={bridgeHeights.heroToLogos} />
          <Chapter token="paper-muted" texture="mesh" poolBlue={false} poolOrange={false} className="min-h-[160px] rounded-[32px]">
            <div className="flex min-h-[160px] items-center justify-center p-8">
              <p className="font-poppins text-2xl font-bold text-[#111827]">Paper Muted + Mesh + Grain</p>
            </div>
          </Chapter>
        </LabSection>

        <LabSection title="3 · Signal Engine + Signal Core" dark>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative min-h-[240px] overflow-hidden rounded-[32px] ve-chapter-void">
              <SignalCanvas className="absolute inset-0 h-full w-full" nodeCount={24} opacityScale="grid" />
              <p className="relative z-[8] p-6 font-montserrat text-sm text-slate-400">SignalCanvas · grid scale</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 rounded-[32px] ve-chapter-void-elevated p-8">
              <SignalCore size={signalCoreScale.hero} spokes={8} animated />
              <SignalCore size={signalCoreScale.services} spokes={4} animated />
              <SignalCore size={signalCoreScale.footer} spokes={0} animated={false} opacity={0.08} />
              <p className="font-montserrat text-sm text-slate-400">Signal Core · hero / services / footer watermark</p>
            </div>
          </div>
        </LabSection>

        <LabSection title="4 · Lighting Engine" dark>
          <div className="relative min-h-[200px] overflow-hidden rounded-[32px] ve-chapter-void">
            <LightingPools />
            <p className="relative z-[8] flex min-h-[200px] items-center justify-center font-montserrat text-sm text-slate-400">
              Dual-source · blue intelligence top · orange action bottom-right
            </p>
          </div>
        </LabSection>

        <LabSection title="5 · Command Glass Engine" dark>
          <div className="grid gap-6 md:grid-cols-3">
            <CommandGlass tier="luminous" hover className="p-6">
              <p className="font-montserrat text-sm">Tier 1 · Luminous</p>
              <p className="mt-2 text-2xl font-bold font-poppins">Telemetry</p>
            </CommandGlass>
            <CommandGlass tier="matte" hover className="p-6 text-[#111827]">
              <p className="font-montserrat text-sm">Tier 2 · Matte</p>
              <p className="mt-2 text-2xl font-bold font-poppins">Panel</p>
            </CommandGlass>
            <CommandGlass tier="whisper" hover className="p-6">
              <p className="font-montserrat text-sm">Tier 3 · Whisper</p>
              <p className="mt-2 text-2xl font-bold font-poppins">Node</p>
            </CommandGlass>
          </div>
        </LabSection>

        <LabSection title="6 · Motion Engine" dark>
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal delay={0}>
              <CommandGlass tier="luminous" className="p-6">Reveal delay 0</CommandGlass>
            </Reveal>
            <Reveal delay={80}>
              <CommandGlass tier="luminous" className="p-6">Reveal delay 80</CommandGlass>
            </Reveal>
            <Reveal delay={160}>
              <CommandGlass tier="luminous" className="p-6">Reveal delay 160</CommandGlass>
            </Reveal>
          </div>
        </LabSection>

        <LabSection title="7 · Particle Engine" dark>
          <div className="grid gap-6 md:grid-cols-3">
            {(['hero', 'cta', 'tech'] as const).map((d) => (
              <div key={d} className="relative min-h-[160px] overflow-hidden rounded-[24px] ve-chapter-void-elevated">
                <ParticleField density={d} className="absolute inset-0 h-full w-full" />
                <p className="relative z-[8] p-4 font-montserrat text-xs uppercase tracking-widest text-slate-500">
                  {d} density
                </p>
              </div>
            ))}
          </div>
        </LabSection>

        <LabSection title="8 · Camera / Depth Engine" dark>
          <ParallaxLayer layer="background" parallax className="min-h-[200px] rounded-[32px] ve-chapter-void-elevated">
            <DepthLayer layer="content" className="flex min-h-[200px] items-center justify-center">
              <p className="font-montserrat text-sm text-slate-400">Parallax background layer on scroll</p>
            </DepthLayer>
          </ParallaxLayer>
        </LabSection>

        <LabSection title="9 · Premium Interaction Engine" dark>
          <div className="flex flex-wrap items-center gap-4">
            <SignalButton href="#" variant="primary" magnetic>
              Primary CTA
            </SignalButton>
            <SignalButton href="#" variant="secondary-dark">
              Secondary Dark
            </SignalButton>
            <SignalLink href="#" dark>
              Signal Link
            </SignalLink>
          </div>
          <InteractiveCard className="mt-8 ve-glass-luminous p-8">
            <p className="font-poppins text-lg font-bold">Interactive Card</p>
            <p className="mt-2 font-montserrat text-sm text-slate-400">Hover lift · signal response</p>
          </InteractiveCard>
        </LabSection>

        <LabSection title="10 · Typography Tokens" dark>
          <div className="space-y-4">
            <p className="font-poppins text-5xl font-bold tracking-[-0.03em]">
              Display <span className="ve-text-signal-gradient">Signal</span>
            </p>
            <p className="max-w-xl font-montserrat text-lg text-slate-400">
              Body · Inter/Montserrat · ink secondary on light chapters
            </p>
            <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e46f1e]">
              Eyebrow Label
            </p>
          </div>
        </LabSection>
      </div>
    </div>
  );
}
