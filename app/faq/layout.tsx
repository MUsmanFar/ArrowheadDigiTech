import type { Metadata } from 'next';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';
import FaqSchema from './FaqSchema';
import JsonLd, { breadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSiteSection('faq.page');
  return cmsPageMetadata('/faq', 'FAQ', page.heroDescription);
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaqSchema />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }])} />
      {children}
    </>
  );
}
