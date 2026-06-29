'use client';

import { useSiteSection } from '@/lib/use-site-content';
import PageHero from '@/components/hercules/ui/PageHero';

export default function CaseStudiesHero() {
  const { section: hero } = useSiteSection('case-studies.hero');

  return (
    <PageHero
      badge={hero.badge}
      title={hero.headline}
      titleAccent={hero.headlineAccent}
      description={hero.subheadline}
      size="large"
    />
  );
}
