import { getSiteSection } from '@/lib/site-content-server';
import LegalDocument from '@/components/legal/LegalDocument';

export default async function TermsPage() {
  const content = await getSiteSection('legal.terms');
  return <LegalDocument content={content} />;
}
