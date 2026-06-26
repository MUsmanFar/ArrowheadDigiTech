import type { Metadata } from 'next';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getSiteSection('services.hero');
  return cmsPageMetadata('/services', 'Services', hero.subheadline);
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
