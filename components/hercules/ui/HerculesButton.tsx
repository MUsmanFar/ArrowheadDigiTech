import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  external?: boolean;
  size?: 'md' | 'lg';
  showArrow?: boolean;
  className?: string;
};

export default function HerculesButton({
  href,
  children,
  variant = 'primary',
  external,
  size = 'md',
  showArrow = true,
  className,
}: Props) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium font-inter transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
    size === 'lg' ? 'px-9 py-4 text-[0.95rem]' : 'px-7 py-3 text-[0.875rem]',
    variant === 'primary' &&
      'bg-[#e46f1e] text-white shadow-[0_8px_24px_-8px_rgba(228,111,30,0.5)] hover:bg-[#c45a12] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(228,111,30,0.6)] active:translate-y-0 active:shadow-[0_4px_12px_-4px_rgba(228,111,30,0.5)]',
    variant === 'secondary' &&
      'border border-slate-200/60 bg-white/80 backdrop-blur-md text-slate-800 shadow-[0_4px_12px_-6px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-[0_12px_24px_-10px_rgba(15,23,42,0.1)] active:translate-y-0',
    variant === 'dark' &&
      'bg-slate-900 text-white shadow-[0_12px_36px_-14px_rgba(15,23,42,0.45)] hover:bg-slate-800',
    variant === 'ghost' &&
      'text-slate-700 hover:bg-slate-100/80',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e46f1e]',
    className,
  );

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          size={size === 'lg' ? 18 : 16}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
