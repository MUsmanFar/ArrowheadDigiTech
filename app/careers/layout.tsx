import type { Metadata } from 'next';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSiteSection('careers.page');
  return cmsPageMetadata('/careers', 'Careers', page.heroDescription);
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
