import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from './GlassCard';

type FeatureCardProps = {
  title: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
  index?: number;
  tags?: string[];
  className?: string;
};

export default function FeatureCard({
  title,
  description,
  href,
  icon,
  index,
  tags,
  className,
}: FeatureCardProps) {
  const content = (
  <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {icon ?? (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/10 to-blue-500/5 text-sm font-bold font-poppins text-orange-600 border border-orange-100/60">
              {index !== undefined ? String(index + 1).padStart(2, '0') : '→'}
            </span>
          )}
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-poppins text-slate-900 tracking-tight">
              {title}
            </h3>
            {description && (
              <p className="mt-3 text-sm md:text-base text-slate-500 font-montserrat leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        {href && (
          <span className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-400 transition-colors group-hover:text-orange-600 group-hover:border-orange-200">
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        )}
      </div>
      {tags && tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 font-montserrat"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn('group block h-full', className)}>
        <GlassCard hover className="h-full p-8 md:p-9">
          {content}
        </GlassCard>
      </Link>
    );
  }

  return (
    <GlassCard hover className={cn('p-8 md:p-9', className)}>
      {content}
    </GlassCard>
  );
}
