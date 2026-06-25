import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CaseStudyDetail from '@/components/case-studies/CaseStudyDetail';
import CtaSection from '@/components/portfolio/CtaSection';
import { getCaseStudies, getCaseStudyBySlug } from '@/lib/cms-server';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = await getCaseStudyBySlug((await params).slug);
  return study
    ? { title: `${study.title} Case Study | Arrowhead DigiTech`, description: study.summary }
    : {};
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  const allStudies = await getCaseStudies();
  if (!study) notFound();

  return (
    <div className="min-h-screen bg-white selection:bg-orange-200 selection:text-orange-900">
      <Navbar />
      <CaseStudyDetail study={study} allStudies={allStudies} />
      <CtaSection />
      <Footer />
    </div>
  );
}
