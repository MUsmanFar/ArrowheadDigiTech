import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSectionServer from '@/components/home/HeroSectionServer';
import ClientLogoStrip from '@/components/home/ClientLogoStrip';
import LazySection from '@/components/ui/LazySection';
import { getSiteContent, getSiteSection } from '@/lib/site-content-server';
import { getClientLogosServer } from '@/lib/media-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

const MetricsBar = dynamic(() => import('@/components/home/MetricsBar'));
const CapabilitiesHover = dynamic(() => import('@/components/home/CapabilitiesHover'));
const FeaturedCaseStudy = dynamic(() => import('@/components/home/FeaturedCaseStudy'));
const TestimonialSection = dynamic(() => import('@/components/home/TestimonialSection'));
const CtaSection = dynamic(() => import('@/components/portfolio/CtaSection'));

export const revalidate = 60;

export async function generateMetadata() {
  const meta = await getSiteSection('site.metadata');
  return cmsPageMetadata('/', 'Home', meta.description);
}

export default async function Home() {
  const [siteContent, logos] = await Promise.all([getSiteContent(), getClientLogosServer()]);

  return (
    <div className="min-h-screen bg-white selection:bg-orange-200 selection:text-orange-900">
      <Navbar />
      <main id="main-content">
        <HeroSectionServer hero={siteContent['home.hero']} />
        <ClientLogoStrip initialLogos={logos} />
        <LazySection minHeight={96}>
          <MetricsBar />
        </LazySection>
        <LazySection minHeight={480}>
          <CapabilitiesHover />
        </LazySection>
        <LazySection minHeight={480}>
          <FeaturedCaseStudy />
        </LazySection>
        <LazySection minHeight={480}>
          <TestimonialSection />
        </LazySection>
        <LazySection minHeight={256}>
          <CtaSection />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
