'use client';

import { useEffect, useRef } from 'react';
import { particles as particleTokens } from '@/lib/visual-engine/tokens';
import type { ParticleDensity } from '@/lib/visual-engine/types';
import { useReducedMotion } from '../motion/useReducedMotion';

const COUNT_MAP: Record<Exclude<ParticleDensity, 'none'>, number> = {
  hero: particleTokens.hero,
  cta: particleTokens.cta,
  tech: particleTokens.tech,
};

type Props = {
  density: ParticleDensity;
  className?: string;
};

export default function ParticleField({ density, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (density === 'none' || reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const count = COUNT_MAP[density];
    let raf = 0;

    const items = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: particleTokens.sizeMin + Math.random() * (particleTokens.sizeMax - particleTokens.sizeMin),
      speed: particleTokens.speedMin + Math.random() * (particleTokens.speedMax - particleTokens.speedMin),
      drift: (Math.random() - 0.5) * 0.0003,
      color: Math.random() > 0.4 ? '#E46F1E' : '#2B6EF2',
      opacity: 0.3 + Math.random() * 0.3,
    }));

    const resize = () => {
      const dpr = devicePixelRatio;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      items.forEach((p) => {
        p.y -= (p.speed / h) * 0.016;
        p.x += p.drift;
        if (p.y < 0) p.y = 1;
        if (p.x < 0 || p.x > 1) p.drift *= -1;

        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size / 2, 0, Math.PI * 2);
        const hex = p.color === '#E46F1E' ? '228, 111, 30' : '43, 110, 242';
        ctx.fillStyle = `rgba(${hex}, ${p.opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density, reducedMotion]);

  if (density === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
