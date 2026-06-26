import type { Metadata } from 'next';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getSiteSection('portfolio.hero');
  return cmsPageMetadata('/portfolio', 'Portfolio', hero.subheadline);
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
