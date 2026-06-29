import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageShell({ children, className }: Props) {
  return (
    <div className={cn('hercules-page min-h-screen selection:bg-orange-100 selection:text-orange-900', className)}>
      {children}
    </div>
  );
}
