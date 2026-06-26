import type { Metadata } from 'next';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSiteSection('pricing.page');
  return cmsPageMetadata(
    '/pricing',
    'Pricing',
    page.heroDescription,
  );
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
