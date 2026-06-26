import { cn } from '@/lib/utils';
import Badge from './Badge';

type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  badgeVariant?: 'orange' | 'blue' | 'neutral';
  className?: string;
};

export default function SectionHeading({
  badge,
  title,
  description,
  align = 'left',
  badgeVariant = 'orange',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 tracking-tight leading-[1.08]',
          badge && 'mt-5',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base md:text-lg text-slate-500 font-montserrat leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
