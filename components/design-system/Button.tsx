import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  external?: boolean;
};

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  external,
}: ButtonProps) {
  const classes = cn(
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    variant === 'ghost' && 'btn-ghost',
    className,
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
