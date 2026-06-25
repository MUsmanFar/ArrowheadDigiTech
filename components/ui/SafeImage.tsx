'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

const FALLBACK_SRC = '/uploads/logos/1782222831635-test-logo.png';

type SafeImageProps = Omit<ImageProps, 'onError'> & {
  fallbackSrc?: string;
};

export default function SafeImage({
  src,
  alt,
  fallbackSrc = FALLBACK_SRC,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...props}
      src={currentSrc || fallbackSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
