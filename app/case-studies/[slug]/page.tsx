import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CtaSection from '@/components/portfolio/CtaSection';
import CaseStudyDetail from '@/components/case-studies/CaseStudyDetail';
import { caseStudies, getCaseStudy } from '@/lib/case-studies';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return study ? { title: `${study.title} Case Study | Arrowhead DigiTech`, description: study.summary } : {};
}

export default async function CaseStudyPage({ params }: PageProps) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return <div className="min-h-screen bg-white selection:bg-blue-200 selection:text-blue-900"><Navbar /><CaseStudyDetail study={study} /><CtaSection /><Footer /></div>;
}
