'use client';

import React, { useRef } from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  external?: boolean;
  className?: string;
};

export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  external,
  className = '',
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const base =
    variant === 'primary'
      ? 'bg-gradient-to-br from-[#E46F1E] via-[#E46F1E] to-[#f59e42] text-white shadow-[0_12px_40px_-8px_rgba(228,111,30,0.55)] hover:shadow-[0_20px_50px_-10px_rgba(228,111,30,0.65)]'
      : 'bg-white/80 text-[#111827] border border-[#E5E7EB]/90 shadow-[0_8px_30px_-12px_rgba(17,24,39,0.12)] hover:border-[#E5E7EB] hover:bg-white';

  const classes = `inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-semibold font-montserrat transition-[box-shadow,background-color,border-color] duration-300 will-change-transform ${base} ${className}`;

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave} className={classes}>
      {children}
    </Link>
  );
}
