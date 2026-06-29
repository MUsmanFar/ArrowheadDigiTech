'use client';

import { useSiteSection } from '@/lib/use-site-content';
import PageHero from '@/components/hercules/ui/PageHero';

export default function ServicesHeroRedesign() {
  const { section: hero } = useSiteSection('services.hero');
  const { section: nav } = useSiteSection('site.nav');

  return (
    <PageHero
      badge={hero.badge}
      title={hero.headline}
      titleAccent={hero.headlineAccent}
      description={hero.subheadline}
      size="large"
      primaryCta={{ label: nav.ctaLabel, href: nav.ctaHref }}
      secondaryCta={{
        label: nav.items.find((i) => i.href.includes('case'))?.name ?? 'Case Studies',
        href: '/case-studies',
      }}
    />
  );
}
