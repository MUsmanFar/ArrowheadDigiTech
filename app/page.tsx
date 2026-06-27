import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import LazySection from '@/components/ui/LazySection';
import HeroRedesign from '@/components/home/redesign/HeroRedesign';
import ClientLogosMarquee from '@/components/home/redesign/ClientLogosMarquee';
import { getSiteContent, getSiteSection } from '@/lib/site-content-server';
import { getClientLogosServer } from '@/lib/media-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

const ServicesShowcase = dynamic(() => import('@/components/home/redesign/ServicesShowcase'));
const PortfolioMagazine = dynamic(() => import('@/components/home/redesign/PortfolioMagazine'));
const ProcessTimeline = dynamic(() => import('@/components/home/redesign/ProcessTimeline'));
const TechStackGrid = dynamic(() => import('@/components/home/redesign/TechStackGrid'));
const CaseStudiesGrid = dynamic(() => import('@/components/home/redesign/CaseStudiesGrid'));
const TestimonialsCarousel = dynamic(() => import('@/components/home/redesign/TestimonialsCarousel'));
const MetricsShowcase = dynamic(() => import('@/components/home/redesign/MetricsShowcase'));
const CtaPremium = dynamic(() => import('@/components/home/redesign/CtaPremium'));
const FooterPreview = dynamic(() => import('@/components/home/redesign/FooterPreview'));

export const revalidate = 60;

export async function generateMetadata() {
  const meta = await getSiteSection('site.metadata');
  return cmsPageMetadata('/', 'Home', meta.description);
}

export default async function Home() {
  const [siteContent, logos] = await Promise.all([getSiteContent(), getClientLogosServer()]);

  return (
    <div className="min-h-screen bg-[#070b14] selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <main id="main-content" className="overflow-x-hidden">
        <HeroRedesign hero={siteContent['home.hero']} />
        <ClientLogosMarquee initialLogos={logos} />
        <LazySection minHeight={520}>
          <ServicesShowcase />
        </LazySection>
        <LazySection minHeight={600}>
          <PortfolioMagazine />
        </LazySection>
        <LazySection minHeight={480}>
          <ProcessTimeline />
        </LazySection>
        <LazySection minHeight={420}>
          <TechStackGrid />
        </LazySection>
        <LazySection minHeight={520}>
          <CaseStudiesGrid />
        </LazySection>
        <LazySection minHeight={420}>
          <TestimonialsCarousel />
        </LazySection>
        <LazySection minHeight={360}>
          <MetricsShowcase />
        </LazySection>
        <LazySection minHeight={320}>
          <CtaPremium />
        </LazySection>
        <FooterPreview />
      </main>
    </div>
  );
}
