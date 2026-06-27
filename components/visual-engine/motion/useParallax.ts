'use client';

import { useEffect } from 'react';
import { type MotionValue, useSpring, useTransform } from 'framer-motion';
import { camera, motion as motionTokens } from '@/lib/visual-engine/tokens';

export function useParallaxOffset(
  motionValue: MotionValue<number>,
  layer: keyof typeof camera.parallax = 'content',
): MotionValue<number> {
  const multiplier = camera.parallax[layer] ?? 1;
  return useTransform(motionValue, (v) => v * multiplier);
}

export function useSpringParallax(
  targetX: number,
  targetY: number,
): { x: MotionValue<number>; y: MotionValue<number> } {
  const x = useSpring(targetX, motionTokens.springNav);
  const y = useSpring(targetY, motionTokens.springNav);

  useEffect(() => {
    x.set(targetX);
    y.set(targetY);
  }, [targetX, targetY, x, y]);

  return { x, y };
}
