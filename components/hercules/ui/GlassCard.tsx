import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  soft?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

const PADDING = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function GlassCard({
  children,
  className,
  soft = false,
  hover = false,
  padding = 'none',
}: Props) {
  return (
    <div
      className={cn(
        'rounded-[2rem] transition-all duration-500 ease-out',
        soft ? 'hercules-glass-soft' : 'hercules-glass',
        hover &&
          'hover:-translate-y-2 hover:shadow-[0_40px_100px_-30px_rgba(15,23,42,0.2)] hover:border-white/80',
        PADDING[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
