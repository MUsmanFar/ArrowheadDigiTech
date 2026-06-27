import type { Metadata } from 'next';
import DesignLabShowcase from '@/components/visual-engine/DesignLabShowcase';

export const metadata: Metadata = {
  title: 'Visual Engine Lab (Internal)',
  robots: { index: false, follow: false },
};

export default function DesignSystemLabPage() {
  return <DesignLabShowcase />;
}
