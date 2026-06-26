import type { Metadata } from 'next';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSiteSection('contact.page');
  return cmsPageMetadata('/contact', 'Contact', page.subheadline);
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
