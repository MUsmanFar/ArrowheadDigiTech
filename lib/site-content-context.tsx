'use client';

import { createContext, useContext } from 'react';
import type { SiteContentMap } from './site-content';

const SiteContentContext = createContext<SiteContentMap | null>(null);

export function SiteContentProvider({
  initial,
  children,
}: {
  initial: SiteContentMap;
  children: React.ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={initial}>{children}</SiteContentContext.Provider>
  );
}

export function useSiteContentContext(): SiteContentMap | null {
  return useContext(SiteContentContext);
}
