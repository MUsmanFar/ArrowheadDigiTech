'use client';

import { cn } from '@/lib/utils';
import type { ChapterTexture, ChapterToken } from '@/lib/visual-engine/types';

const CHAPTER_CLASS: Record<ChapterToken, string> = {
  'void-deep': 've-chapter-void-deep',
  void: 've-chapter-void',
  'void-elevated': 've-chapter-void-elevated',
  'void-panel': 've-chapter-void-panel',
  paper: 've-chapter-paper',
  'paper-muted': 've-chapter-paper-muted',
  'paper-warm': 've-chapter-paper-warm',
};

const isDarkChapter = (t: ChapterToken) => t.startsWith('void');

type Props = {
  token: ChapterToken;
  texture?: ChapterTexture;
  poolBlue?: boolean;
  poolOrange?: boolean;
  poolBlueOpacity?: number;
  poolOrangeOpacity?: number;
  fog?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function Chapter({
  token,
  texture = 'grain',
  poolBlue,
  poolOrange,
  poolBlueOpacity,
  poolOrangeOpacity,
  fog,
  className,
  children,
}: Props) {
  const dark = isDarkChapter(token);
  const showBlue = poolBlue ?? dark;
  const showOrange = poolOrange ?? dark;

  return (
    <div className={cn('relative overflow-hidden', CHAPTER_CLASS[token], className)}>
      {showBlue && (
        <div
          className="pointer-events-none absolute inset-0 ve-pool-blue"
          style={poolBlueOpacity !== undefined ? { opacity: poolBlueOpacity } : undefined}
          aria-hidden="true"
        />
      )}
      {showOrange && (
        <div
          className="pointer-events-none absolute inset-0 ve-pool-orange"
          style={poolOrangeOpacity !== undefined ? { opacity: poolOrangeOpacity } : undefined}
          aria-hidden="true"
        />
      )}
      {texture === 'grain' && (
        <div className="pointer-events-none absolute inset-0 ve-grain" aria-hidden="true" />
      )}
      {texture === 'dot-grid' && (
        <div className="pointer-events-none absolute inset-0 ve-dot-grid" aria-hidden="true" />
      )}
      {texture === 'mesh' && (
        <div className="pointer-events-none absolute inset-0 ve-mesh-light" aria-hidden="true" />
      )}
      {texture === 'mesh' && (
        <div className="pointer-events-none absolute inset-0 ve-grain" aria-hidden="true" />
      )}
      {fog && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[var(--ve-void)] to-transparent opacity-15"
          aria-hidden="true"
        />
      )}
      <div className="relative z-[8]">{children}</div>
    </div>
  );
}
