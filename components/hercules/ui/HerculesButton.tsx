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
    'group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold font-montserrat transition-all duration-300 ease-out',
    size === 'lg' ? 'px-9 py-4 text-base' : 'px-7 py-3.5 text-sm',
    variant === 'primary' &&
      'bg-[#e46f1e] text-white shadow-[0_16px_48px_-14px_rgba(228,111,30,0.55)] hover:bg-[#c45a12] hover:-translate-y-0.5 hover:shadow-[0_22px_56px_-12px_rgba(228,111,30,0.65)] active:translate-y-0',
    variant === 'secondary' &&
      'border border-slate-200/90 bg-white/95 text-slate-900 shadow-[0_10px_36px_-18px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-[0_16px_44px_-16px_rgba(15,23,42,0.14)] active:translate-y-0',
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
