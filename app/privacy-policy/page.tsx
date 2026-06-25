import { getSiteSection } from '@/lib/site-content-server';
import LegalDocument from '@/components/legal/LegalDocument';

export default async function PrivacyPolicyPage() {
  const content = await getSiteSection('legal.privacy');
  return <LegalDocument content={content} />;
}
