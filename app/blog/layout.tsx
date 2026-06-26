import type { Metadata } from 'next';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSiteSection('blog.page');
  return cmsPageMetadata('/blog', 'Blog', page.heroDescription);
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
