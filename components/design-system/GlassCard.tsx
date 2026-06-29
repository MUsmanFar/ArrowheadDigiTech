import { cn } from '@/lib/utils';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  soft?: boolean;
  as?: 'div' | 'article' | 'section';
};

export default function GlassCard({
  children,
  className,
  hover = false,
  soft = false,
  as: Tag = 'div',
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl transition-all duration-500 ease-out',
        soft ? 'hercules-glass-soft' : 'hercules-glass',
        hover &&
          'hover:-translate-y-1 hover:shadow-[0_28px_80px_-32px_rgba(15,23,42,0.16)] hover:border-white',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
