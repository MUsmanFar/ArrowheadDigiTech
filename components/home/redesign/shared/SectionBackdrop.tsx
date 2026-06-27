import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export type SectionTheme =
  | 'hero-dark'
  | 'light'
  | 'light-mesh'
  | 'dark'
  | 'dark-glow'
  | 'aurora'
  | 'footer-dark';

const themes: Record<SectionTheme, { bg: string; text: string; fade?: string }> = {
  'hero-dark': {
    bg: 'bg-[#070b14]',
    text: 'text-white',
    fade: 'from-[#070b14] via-[#0d1424] to-[#111827]',
  },
  light: {
    bg: 'bg-white',
    text: 'text-[#111827]',
    fade: 'from-white via-[#FAFAFA] to-white',
  },
  'light-mesh': {
    bg: 'bg-[#FAFAFA]',
    text: 'text-[#111827]',
    fade: 'from-[#FAFAFA] via-white to-[#FAFAFA]',
  },
  dark: {
    bg: 'bg-[#0a0f1a]',
    text: 'text-white',
    fade: 'from-[#0a0f1a] via-[#111827] to-[#0a0f1a]',
  },
  'dark-glow': {
    bg: 'bg-[#080d18]',
    text: 'text-white',
    fade: 'from-[#080d18] via-[#0f172a] to-[#080d18]',
  },
  aurora: {
    bg: 'bg-[#070b14]',
    text: 'text-white',
    fade: 'from-[#070b14] via-[#1a1030] to-[#070b14]',
  },
  'footer-dark': {
    bg: 'bg-[#050810]',
    text: 'text-white',
    fade: 'from-[#050810] to-[#070b14]',
  },
};

export default function SectionBackdrop({
  theme = 'light-mesh',
  className,
  children,
  topFade,
  bottomFade,
}: {
  theme?: SectionTheme;
  className?: string;
  children: ReactNode;
  topFade?: boolean;
  bottomFade?: boolean;
}) {
  const t = themes[theme];

  return (
    <div className={cn('relative overflow-hidden', t.bg, t.text, className)}>
      <div
        className={cn('pointer-events-none absolute inset-0 bg-gradient-to-b opacity-90', t.fade)}
        aria-hidden="true"
      />
      {theme === 'hero-dark' && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(43,110,242,0.35),transparent_55%)]" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#2B6EF2]/20 blur-[120px]" />
          <div className="pointer-events-none absolute top-1/4 right-0 h-[300px] w-[400px] rounded-full bg-[#E46F1E]/15 blur-[100px]" />
        </>
      )}
      {theme === 'aurora' && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(228,111,30,0.45),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(43,110,242,0.25),transparent_50%)]" />
        </>
      )}
      {theme === 'dark-glow' && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(43,110,242,0.12),transparent_60%)]" />
      )}
      <div className="home-noise pointer-events-none absolute inset-0 opacity-[0.25]" aria-hidden="true" />
      {topFade && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#070b14] to-transparent" />
      )}
      {bottomFade && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
