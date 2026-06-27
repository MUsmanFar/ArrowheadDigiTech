import type { DepthLayer } from '@/lib/visual-engine/types';
import { cn } from '@/lib/utils';

const Z_MAP: Record<DepthLayer, string> = {
  background: 'z-[2]',
  signal: 'z-[5]',
  glass: 'z-[7]',
  content: 'z-[8]',
  foreground: 'z-[9]',
  cursor: 'z-[10]',
};

type Props = {
  layer: DepthLayer;
  perspective?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function DepthLayer({ layer, perspective = false, className, children }: Props) {
  return (
    <div
      className={cn(
        'relative',
        Z_MAP[layer],
        perspective && 've-depth-perspective',
        className,
      )}
    >
      {children}
    </div>
  );
}
