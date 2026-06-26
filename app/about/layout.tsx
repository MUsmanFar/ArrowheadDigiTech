import type { Metadata } from 'next';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getSiteSection('about.hero');
  return cmsPageMetadata('/about', 'About', hero.subheadline);
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
