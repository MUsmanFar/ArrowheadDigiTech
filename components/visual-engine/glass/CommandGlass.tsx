import { cn } from '@/lib/utils';
import type { GlassTier } from '@/lib/visual-engine/types';

const TIER_CLASS: Record<GlassTier, string> = {
  luminous: 've-glass-luminous',
  matte: 've-glass-matte',
  whisper: 've-glass-whisper',
};

type Props = {
  tier: GlassTier;
  hover?: boolean;
  lightWhisper?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function CommandGlass({
  tier,
  hover = false,
  lightWhisper = false,
  className,
  children,
}: Props) {
  return (
    <div
      className={cn(
        tier === 'whisper' && lightWhisper ? 've-glass-whisper-light' : TIER_CLASS[tier],
        hover && 've-glass-hover transition-transform',
        'rounded-[var(--radius-lg,16px)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
