import { cn } from '@/lib/utils';
import Reveal from './Reveal';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  dark = false,
}: Props) {
  return (
    <Reveal className={cn(align === 'center' && 'mx-auto max-w-3xl text-center', className)}>
      {eyebrow && (
        <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e46f1e]">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-5 font-poppins text-3xl font-bold tracking-[-0.03em] md:text-4xl lg:text-[3rem] lg:leading-[1.1]',
          dark ? 'text-white' : 'text-slate-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-6 max-w-2xl font-montserrat text-base leading-[1.75] md:text-lg',
            dark ? 'text-slate-400' : 'text-slate-500',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
