import type { Metadata } from 'next';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSiteSection('testimonials.page');
  return cmsPageMetadata('/testimonials', 'Testimonials', page.subheadline);
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
