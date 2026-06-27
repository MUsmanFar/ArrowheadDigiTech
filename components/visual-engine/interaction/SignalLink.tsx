import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
};

export default function SignalLink({ href, children, dark = false, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        've-signal-link group inline-flex items-center gap-2 text-sm font-semibold font-montserrat transition-colors',
        dark ? 'text-[#e46f1e] hover:text-[#f59e42]' : 'text-[#e46f1e] hover:text-[#c45a12]',
        className,
      )}
    >
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
