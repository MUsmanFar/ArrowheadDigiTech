import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CaseStudiesHero from '@/components/case-studies/CaseStudiesHero';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import { caseStudies } from '@/lib/case-studies';

export const metadata: Metadata = {
  title: 'Case Studies | Arrowhead DigiTech',
  description: 'Explore the product decisions and measurable outcomes behind selected Arrowhead DigiTech client work.',
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange-200 selection:text-orange-900">
      <Navbar />
      <main id="main-content">
        <CaseStudiesHero />
        <section>
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
