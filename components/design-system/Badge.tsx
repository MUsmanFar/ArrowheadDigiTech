import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'orange' | 'blue' | 'neutral';
  className?: string;
};

export default function Badge({ children, variant = 'orange', className }: BadgeProps) {
  const variants = {
    orange:
      'text-orange-600 bg-orange-50/90 border-orange-100/80',
    blue: 'text-blue-600 bg-blue-50/90 border-blue-100/80',
    neutral: 'text-slate-600 bg-white/80 border-slate-200/80',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-montserrat font-semibold uppercase tracking-[0.18em] border backdrop-blur-sm',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
