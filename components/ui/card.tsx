'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export const Card = ({ children, className, glass = true }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 shadow-xl',
        glass ? 'glass' : 'bg-white',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('mb-4', className)}>{children}</div>;
};

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <h3 className={cn('text-xl font-semibold text-slate-900', className)}>{children}</h3>;
};

export const CardDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <p className={cn('text-slate-600 mt-2', className)}>{children}</p>;
};

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('', className)}>{children}</div>;
};
