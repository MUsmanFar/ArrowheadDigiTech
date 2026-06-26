import type { Metadata } from 'next';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata(
    '/terms-and-conditions',
    'Terms & Conditions',
    'Terms and conditions governing use of Arrowhead DigiTech services.',
  );
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
