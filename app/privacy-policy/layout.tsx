import type { Metadata } from 'next';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata(
    '/privacy-policy',
    'Privacy Policy',
    'Privacy policy for Arrowhead DigiTech website and digital services.',
  );
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
