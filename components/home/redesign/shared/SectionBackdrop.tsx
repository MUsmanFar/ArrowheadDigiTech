import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Variant = 'hero' | 'warm' | 'cool' | 'silver' | 'dark' | 'cta';

const variants: Record<Variant, string> = {
  hero: 'from-[#E46F1E]/12 via-[#FAFAFA] to-[#2B6EF2]/10',
  warm: 'from-[#E46F1E]/8 via-[#FAFAFA] to-white',
  cool: 'from-[#2B6EF2]/10 via-[#FAFAFA] to-[#E46F1E]/5',
  silver: 'from-white via-[#FAFAFA] to-[#E5E7EB]/40',
  dark: 'from-[#111827] via-[#1f2937] to-[#111827]',
  cta: 'from-[#E46F1E]/15 via-[#FAFAFA] to-[#2B6EF2]/8',
};

export default function SectionBackdrop({
  variant = 'warm',
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br',
          variants[variant],
        )}
        aria-hidden="true"
      />
      <div className="home-noise pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#E46F1E]/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#2B6EF2]/10 blur-[90px]"
        aria-hidden="true"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
