import type { Metadata } from 'next';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSiteSection('faq.page');
  return cmsPageMetadata('/faq', 'FAQ', page.heroDescription);
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
