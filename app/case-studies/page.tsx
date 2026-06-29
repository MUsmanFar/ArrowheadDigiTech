import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageShell } from '@/components/hercules';
import CaseStudiesHero from '@/components/case-studies/CaseStudiesHero';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import { getCaseStudies } from '@/lib/cms-server';
import { getSiteSection } from '@/lib/site-content-server';
import { cmsPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getSiteSection('case-studies.hero');
  return cmsPageMetadata('/case-studies', 'Case Studies', hero.subheadline);
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <PageShell>
      <Navbar />
      <main id="main-content">
        <CaseStudiesHero />
        <section className="hercules-section-muted pb-24">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </section>
      </main>
      <Footer />
    </PageShell>
  );
}
