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
        'rounded-[1.75rem] transition-all duration-500 ease-out',
        soft ? 'hercules-glass-soft' : 'hercules-glass',
        hover &&
          'hover:-translate-y-1.5 hover:shadow-[0_32px_90px_-28px_rgba(15,23,42,0.18)] hover:border-white',
        PADDING[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
