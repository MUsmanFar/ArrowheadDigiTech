import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LazySection from '@/components/ui/LazySection';
import { PageShell } from '@/components/hercules';
import {
  HerculesHero,
  HerculesLogoStrip,
  HerculesAbout,
  HerculesServices,
  HerculesProcess,
  HerculesIndustries,
  HerculesTestimonials,
  HerculesFaq,
  HerculesCta,
} from '@/components/hercules/home';
import { getSiteContent, getSiteSection } from '@/lib/site-content-server';
import { getClientLogosServer } from '@/lib/media-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export const revalidate = 60;

export async function generateMetadata() {
  const meta = await getSiteSection('site.metadata');
  return cmsPageMetadata('/', 'Home', meta.description);
}

export default async function Home() {
  const [siteContent, logos] = await Promise.all([getSiteContent(), getClientLogosServer()]);

  return (
    <PageShell>
      <Navbar />
      <main id="main-content" className="overflow-x-hidden">
        <HerculesHero hero={siteContent['home.hero']} />
        <HerculesLogoStrip initialLogos={logos} />
        <LazySection minHeight={480}>
          <HerculesAbout />
        </LazySection>
        <LazySection minHeight={520}>
          <HerculesServices />
        </LazySection>
        <LazySection minHeight={480}>
          <HerculesProcess />
        </LazySection>
        <LazySection minHeight={480}>
          <HerculesIndustries />
        </LazySection>
        <LazySection minHeight={420}>
          <HerculesTestimonials />
        </LazySection>
        <LazySection minHeight={420}>
          <HerculesFaq />
        </LazySection>
        <LazySection minHeight={320}>
          <HerculesCta />
        </LazySection>
        <Footer />
      </main>
    </PageShell>
  );
}
