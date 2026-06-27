'use client';

import { motion } from 'framer-motion';
import { motion as motionTokens } from '@/lib/visual-engine/tokens';
import { cn } from '@/lib/utils';
import { useReducedMotion } from './useReducedMotion';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

export default function Reveal({ children, delay = 0, className, y = 24 }: Props) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: motionTokens.reveal / 1000,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
