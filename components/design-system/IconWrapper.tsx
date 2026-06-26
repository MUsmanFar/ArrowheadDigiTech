import { cn } from '@/lib/utils';

type IconWrapperProps = {
  children: React.ReactNode;
  variant?: 'orange' | 'blue' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function IconWrapper({
  children,
  variant = 'orange',
  size = 'md',
  className,
}: IconWrapperProps) {
  const variants = {
    orange: 'from-orange-500/15 to-amber-500/5 text-orange-600 border-orange-100/70',
    blue: 'from-blue-500/15 to-cyan-500/5 text-blue-600 border-blue-100/70',
    neutral: 'from-slate-100 to-white text-slate-600 border-slate-200/80',
  };

  const sizes = {
    sm: 'h-10 w-10 rounded-xl',
    md: 'h-12 w-12 rounded-2xl',
    lg: 'h-14 w-14 rounded-2xl',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center border bg-gradient-to-br shadow-sm',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
