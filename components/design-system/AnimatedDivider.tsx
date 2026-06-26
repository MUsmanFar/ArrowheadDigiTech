import { cn } from '@/lib/utils';

type AnimatedDividerProps = {
  className?: string;
};

export default function AnimatedDivider({ className }: AnimatedDividerProps) {
  return (
    <div className={cn('relative h-px w-full overflow-hidden', className)} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-y-0 left-1/4 w-1/2 bg-gradient-to-r from-transparent via-orange-300/60 to-transparent animate-shimmer bg-[length:200%_100%]" />
    </div>
  );
}
