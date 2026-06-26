import { cn } from '@/lib/utils';

type EmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-slate-200 bg-white/60 px-8 py-20 text-center',
        className,
      )}
    >
      <div className="mb-4 h-12 w-12 rounded-2xl border border-slate-200 bg-slate-50" aria-hidden="true" />
      <p className="text-lg font-semibold font-poppins text-slate-800">{title}</p>
      {description && (
        <p className="mt-2 max-w-md text-sm text-slate-500 font-montserrat">{description}</p>
      )}
    </div>
  );
}
