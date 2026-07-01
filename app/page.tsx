import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LazySection from '@/components/ui/LazySection';
import { PageShell } from '@/components/hercules';
import {
  ArchHero,
  ArchLogoStrip,
  ArchManifesto,
  ArchServices,
  ArchWork,
  ArchProcess,
  ArchTestimonials,
  ArchFaq,
  ArchCta,
  SiteBackground,
} from '@/components/arch';
import { getSiteContent, getSiteSection } from '@/lib/site-content-server';
import { getClientLogosServer } from '@/lib/media-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export const revalidate = 60;

export async function generateMetadata() {
  const meta = await getSiteSection('site.metadata');
  return cmsPageMetadata('/', 'Home', meta.description);
}

/**
 * Ultra-thin gradient separator between sections on the same light surface.
 * Adds just enough visual rhythm without a hard edge or dead space.
 */
function SectionRule() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none h-px w-full"
      style={{
        background:
          'linear-gradient(to right,transparent 0%,rgba(15,20,30,0.065) 25%,rgba(15,20,30,0.065) 75%,transparent 100%)',
      }}
    />
  );
}

export default async function Home() {
  const [siteContent, logos] = await Promise.all([
    getSiteContent(),
    getClientLogosServer(),
  ]);

  return (
    <PageShell>
      {/* Fixed living background — behind all sections */}
      <SiteBackground />

      <Navbar />

      <main id="main-content" className="overflow-x-hidden">

        {/* ── Hero ── above-the-fold, no lazy */}
        <ArchHero hero={siteContent['home.hero']} />

        {/* ── Client logo strip ── immediate trust signal */}
        <ArchLogoStrip initialLogos={logos} />

        <SectionRule />

        {/* ── About / Manifesto ── */}
        <LazySection minHeight={480}>
          <ArchManifesto />
        </LazySection>

        <SectionRule />

        {/* ── Services ── */}
        <LazySection minHeight={520}>
          <ArchServices />
        </LazySection>

        <SectionRule />

        {/* ── Selected Work ── */}
        <LazySection minHeight={480}>
          <ArchWork />
        </LazySection>

        <SectionRule />

        {/* ── How We Build / Process ── */}
        <LazySection minHeight={520}>
          <ArchProcess />
        </LazySection>

        <SectionRule />

        {/* ── Testimonials ── */}
        <LazySection minHeight={400}>
          <ArchTestimonials />
        </LazySection>

        <SectionRule />

        {/* ── FAQ ── */}
        <LazySection minHeight={360}>
          <ArchFaq />
        </LazySection>

        <SectionRule />

        {/* ── CTA ── */}
        <LazySection minHeight={480}>
          <ArchCta />
        </LazySection>

        <Footer />
      </main>
    </PageShell>
  );
}
