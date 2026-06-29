'use client';

import { useSiteSection } from '@/lib/use-site-content';
import PageHero from '@/components/hercules/ui/PageHero';

export default function AboutHero() {
  const { section: hero } = useSiteSection('about.hero');
  const { section: nav } = useSiteSection('site.nav');
  const portfolioItem = nav.items.find((i) => i.href === '/portfolio');

  return (
    <PageHero
      badge={hero.badge}
      title={hero.headline}
      description={hero.subheadline}
      size="large"
      primaryCta={{ label: nav.ctaLabel, href: nav.ctaHref }}
      secondaryCta={
        portfolioItem ? { label: portfolioItem.name, href: portfolioItem.href } : undefined
      }
    />
  );
}
