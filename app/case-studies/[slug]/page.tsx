import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageShell } from '@/components/hercules';
import CaseStudyDetail from '@/components/case-studies/CaseStudyDetail';
import CtaBlock from '@/components/design-system/CtaBlock';
import { getCaseStudies, getCaseStudyBySlug } from '@/lib/cms-server';
import { pageMetadata } from '@/lib/page-metadata';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const study = await getCaseStudyBySlug(slug);
  if (!study) {
    return pageMetadata({
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
      path: `/case-studies/${slug}`,
      noIndex: true,
    });
  }
  return pageMetadata({
    title: study.title,
    description: study.summary,
    path: `/case-studies/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  const allStudies = await getCaseStudies();
  if (!study) notFound();

  return (
    <PageShell>
      <Navbar />
      <CaseStudyDetail study={study} allStudies={allStudies} />
      <CtaBlock />
      <Footer />
    </PageShell>
  );
}
