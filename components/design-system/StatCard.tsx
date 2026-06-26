'use client';

import { cn } from '@/lib/utils';
import AnimatedCounter from '@/components/home/redesign/AnimatedCounter';
import GlassCard from './GlassCard';

type StatCardProps = {
  value: number | string;
  label: string;
  animate?: boolean;
  className?: string;
};

export default function StatCard({ value, label, animate = false, className }: StatCardProps) {
  const numeric = typeof value === 'number' ? value : parseInt(String(value), 10);
  const showCounter = animate && !Number.isNaN(numeric);

  return (
    <GlassCard className={cn('p-8 text-center', className)}>
      <div className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 tracking-tight">
        {showCounter ? <AnimatedCounter value={`${numeric}+`} /> : value}
      </div>
      <p className="mt-2 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
    </GlassCard>
  );
}
