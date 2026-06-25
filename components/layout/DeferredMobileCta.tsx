'use client';

import dynamic from 'next/dynamic';

const MobileStickyCta = dynamic(() => import('./MobileStickyCta'), {
  ssr: false,
  loading: () => null,
});

export default function DeferredMobileCta() {
  return <MobileStickyCta />;
}
