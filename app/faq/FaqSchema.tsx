import { dbService } from '@/lib/db';
import JsonLd from '@/components/seo/JsonLd';

export default async function FaqSchema() {
  const faqs = await dbService.faqs.findMany();
  const items = (Array.isArray(faqs) ? faqs : []).filter(
    (f: { published?: boolean }) => f.published !== false,
  );

  if (items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}
