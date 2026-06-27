import { cn } from '@/lib/utils';

type Props = {
  blue?: boolean;
  orange?: boolean;
  blueClassName?: string;
  orangeClassName?: string;
  className?: string;
};

export default function LightingPools({
  blue = true,
  orange = true,
  blueClassName,
  orangeClassName,
  className,
}: Props) {
  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} aria-hidden="true">
      {blue && <div className={cn('absolute inset-0 ve-pool-blue', blueClassName)} />}
      {orange && <div className={cn('absolute inset-0 ve-pool-orange', orangeClassName)} />}
    </div>
  );
}
