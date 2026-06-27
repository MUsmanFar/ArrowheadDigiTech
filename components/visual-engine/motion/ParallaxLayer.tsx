'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { camera } from '@/lib/visual-engine/tokens';
import type { DepthLayer } from '@/lib/visual-engine/types';
import { cn } from '@/lib/utils';
import { useReducedMotion } from './useReducedMotion';

const Z_INDEX: Record<DepthLayer, number> = {
  background: 2,
  signal: 5,
  glass: 7,
  content: 8,
  foreground: 9,
  cursor: 10,
};

type Props = {
  layer: DepthLayer;
  parallax?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function ParallaxLayer({ layer, parallax = false, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const multiplier = camera.parallax[layer === 'signal' ? 'signal' : layer === 'background' ? 'background' : 'content'] ?? 1;
  const y = useTransform(scrollYProgress, [0, 1], [16 * multiplier, -16 * multiplier]);

  if (!parallax || reducedMotion) {
    return (
      <div ref={ref} className={cn('relative', className)} style={{ zIndex: Z_INDEX[layer] }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, zIndex: Z_INDEX[layer] }}
      className={cn('relative', className)}
    >
      {children}
    </motion.div>
  );
}
