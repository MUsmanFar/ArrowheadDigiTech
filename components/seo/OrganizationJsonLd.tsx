import { getSiteSection } from '@/lib/site-content-server';
import { siteBaseUrl } from '@/lib/page-metadata';

export default async function OrganizationJsonLd() {
  const [meta, footer] = await Promise.all([
    getSiteSection('site.metadata'),
    getSiteSection('site.footer'),
  ]);

  const baseUrl = siteBaseUrl();
  const social = footer.social || {};
  const sameAs = [social.linkedin, social.twitter, social.facebook].filter(
    (url): url is string => typeof url === 'string' && url.startsWith('http'),
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Arrowhead DigiTech',
    url: baseUrl,
    logo: `${baseUrl}/icon`,
    description: meta.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: footer.email || 'info@arrowheaddigitech.com',
      availableLanguage: 'English',
    },
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
