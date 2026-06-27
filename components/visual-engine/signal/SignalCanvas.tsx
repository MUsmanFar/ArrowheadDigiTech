'use client';

import { useEffect, useRef } from 'react';
import { signal as signalTokens } from '@/lib/visual-engine/tokens';
import type { SignalOpacityScale } from '@/lib/visual-engine/types';
import { useReducedMotion } from '../motion/useReducedMotion';

const OPACITY_MAP: Record<SignalOpacityScale, number> = {
  hero: signalTokens.opacity.hero,
  header: signalTokens.opacity.header,
  grid: signalTokens.opacity.grid,
  watermark: signalTokens.opacity.watermark,
  light: signalTokens.opacity.light,
};

type Props = {
  nodeCount?: number;
  connectionDistance?: number;
  opacityScale?: SignalOpacityScale;
  className?: string;
};

export default function SignalCanvas({
  nodeCount = 48,
  connectionDistance = signalTokens.connectionDistance,
  opacityScale = 'hero',
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      phase: Math.random() * Math.PI * 2,
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
      const opacity = OPACITY_MAP[opacityScale];
      ctx.clearRect(0, 0, w, h);

      if (!reducedMotion) {
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > 1) n.vx *= -1;
          if (n.y < 0 || n.y > 1) n.vy *= -1;
        });
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i].x - nodes[j].x) * w;
          const dy = (nodes[i].y - nodes[j].y) * h;
          const dist = Math.hypot(dx, dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.35 * opacity;
            ctx.strokeStyle = `rgba(43, 110, 242, ${alpha})`;
            ctx.lineWidth = signalTokens.lineWidth;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const pulse = reducedMotion
          ? 0.8
          : 0.6 + Math.sin(frame * 0.02 + n.phase) * 0.4;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, signalTokens.nodeRadius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(228, 111, 30, ${(0.4 + pulse * 0.3) * opacity})`;
        ctx.fill();
      });

      frame++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [nodeCount, connectionDistance, opacityScale, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity: OPACITY_MAP[opacityScale] }}
      aria-hidden="true"
    />
  );
}
