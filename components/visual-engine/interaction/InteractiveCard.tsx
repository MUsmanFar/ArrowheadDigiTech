'use client';

import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
};

export default function InteractiveCard({ children, className, onClick }: Props) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick();
            }
          : undefined
      }
      className={cn(
        've-glass-hover rounded-[32px] transition-all duration-[400ms] [transition-timing-function:var(--ve-motion-signal)]',
        'hover:-translate-y-1 hover:shadow-[0_40px_90px_-36px_rgba(17,24,39,0.18)]',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
}
