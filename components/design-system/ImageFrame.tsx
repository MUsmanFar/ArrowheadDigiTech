import Image from 'next/image';
import { cn } from '@/lib/utils';

type ImageFrameProps = {
  src?: string | null;
  alt: string;
  aspect?: 'square' | 'video' | 'portrait' | 'wide';
  priority?: boolean;
  className?: string;
  overlay?: boolean;
  fallback?: React.ReactNode;
};

const aspectClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[16/10]',
};

export default function ImageFrame({
  src,
  alt,
  aspect = 'wide',
  priority,
  className,
  overlay,
  fallback,
}: ImageFrameProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-slate-100 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.18)]',
        aspectClasses[aspect],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        fallback ?? (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50/40" />
        )
      )}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
      )}
    </div>
  );
}
