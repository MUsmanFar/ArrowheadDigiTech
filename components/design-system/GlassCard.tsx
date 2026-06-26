import { cn } from '@/lib/utils';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'article' | 'section';
};

export default function GlassCard({
  children,
  className,
  hover = false,
  as: Tag = 'div',
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        'rounded-[1.75rem] border border-white/60 bg-white/55 backdrop-blur-2xl shadow-[0_20px_60px_-30px_rgba(15,23,42,0.12)]',
        hover &&
          'transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-slate-200/80 hover:shadow-[0_28px_70px_-28px_rgba(15,23,42,0.16)]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
