'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const VARIANTS = {
  orange: 'from-orange-100 to-orange-50 text-[#e46f1e] shadow-[0_8px_24px_-8px_rgba(228,111,30,0.2)]',
  blue: 'from-blue-100 to-blue-50 text-[#2b6ef2] shadow-[0_8px_24px_-8px_rgba(43,110,242,0.2)]',
  emerald: 'from-emerald-100 to-emerald-50 text-emerald-600 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.2)]',
  violet: 'from-violet-100 to-violet-50 text-violet-600 shadow-[0_8px_24px_-8px_rgba(139,92,246,0.2)]',
  slate: 'from-slate-100 to-slate-50 text-slate-600 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.08)]',
} as const;

type Props = {
  icon: LucideIcon;
  variant?: keyof typeof VARIANTS;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SIZES = {
  sm: { box: 'h-10 w-10', icon: 18 },
  md: { box: 'h-12 w-12', icon: 22 },
  lg: { box: 'h-14 w-14', icon: 26 },
};

export default function IconBox({ icon: Icon, variant = 'orange', size = 'md', className }: Props) {
  const s = SIZES[size];
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br',
        s.box,
        VARIANTS[variant],
        className,
      )}
    >
      <Icon size={s.icon} strokeWidth={1.75} aria-hidden="true" />
    </div>
  );
}
