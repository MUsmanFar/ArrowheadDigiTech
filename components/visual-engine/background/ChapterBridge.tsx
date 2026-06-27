import { chapterBg } from '@/lib/visual-engine/tokens';
import type { ChapterToken } from '@/lib/visual-engine/types';
import { cn } from '@/lib/utils';

type Props = {
  from: ChapterToken;
  to: ChapterToken;
  heightPx?: number;
  className?: string;
};

export default function ChapterBridge({ from, to, heightPx = 80, className }: Props) {
  const fromColor = chapterBg[from];
  const toColor = chapterBg[to];

  return (
    <div
      className={cn('pointer-events-none w-full', className)}
      style={{
        height: heightPx,
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
      }}
      aria-hidden="true"
    />
  );
}
