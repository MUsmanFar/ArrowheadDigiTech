'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

function parseValue(raw: string): { prefix: string; num: number; suffix: string } {
  const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: '', num: 0, suffix: raw };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

export default function AnimatedCounter({
  value,
  className = '',
  duration = 1.4,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { prefix, num, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || num === 0) return;
    let start: number | null = null;
    let frame: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(num * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, num, duration]);

  const shown = inView ? (num === 0 ? value : `${prefix}${display}${suffix}`) : `${prefix}0${suffix}`;

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
