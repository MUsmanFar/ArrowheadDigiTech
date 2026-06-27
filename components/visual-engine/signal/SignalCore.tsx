'use client';

import { cn } from '@/lib/utils';
import { useReducedMotion } from '../motion/useReducedMotion';

type Props = {
  size?: number;
  spokes?: number;
  animated?: boolean;
  opacity?: number;
  className?: string;
};

export default function SignalCore({
  size = 112,
  spokes = 8,
  animated = true,
  opacity = 1,
  className,
}: Props) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animated && !reducedMotion;
  const hubR = size * 0.036;
  const discR = size / 2 - 2;
  const spokeLen = discR * 0.72;

  const angles = Array.from({ length: spokes }, (_, i) => (i / spokes) * Math.PI * 2 - Math.PI / 2);

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size, opacity }}
      aria-hidden="true"
    >
      <div
        className={cn(
          'absolute inset-0 rounded-full ve-glass-whisper',
          shouldAnimate && 'animate-[ve-hub-breathe_6s_ease-in-out_infinite]',
        )}
      />
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-[1]"
      >
        {angles.map((angle, i) => {
          const cx = size / 2;
          const cy = size / 2;
          const x2 = cx + Math.cos(angle) * spokeLen;
          const y2 = cy + Math.sin(angle) * spokeLen;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="rgba(43, 110, 242, 0.35)"
              strokeWidth={1}
              strokeLinecap="round"
            />
          );
        })}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={hubR}
          fill="#E46F1E"
          className={shouldAnimate ? 've-glow-xs' : undefined}
        />
      </svg>
    </div>
  );
}
