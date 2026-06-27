'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary-dark' | 'secondary-light';
  external?: boolean;
  magnetic?: boolean;
  className?: string;
};

export default function SignalButton({
  href,
  children,
  variant = 'primary',
  external,
  magnetic = false,
  className,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold font-montserrat transition-[box-shadow,background-color,border-color,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e46f1e]',
    variant === 'primary' &&
      'bg-[#e46f1e] text-white shadow-[0_12px_40px_-8px_rgba(228,111,30,0.55)] hover:bg-[#c45a12] hover:shadow-[0_20px_50px_-10px_rgba(228,111,30,0.65)] hover:scale-[1.02]',
    variant === 'secondary-dark' &&
      'border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10',
    variant === 'secondary-light' &&
      'border border-[#e5e7eb] bg-white/80 text-[#111827] hover:bg-white hover:shadow-[0_8px_30px_-12px_rgba(17,24,39,0.12)]',
    className,
  );

  const content = (
    <>
      {children}
      <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(classes, 'group')}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(classes, 'group')}
    >
      {content}
    </Link>
  );
}
