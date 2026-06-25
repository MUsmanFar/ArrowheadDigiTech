const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://arrowheaddigitech.com';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Arrowhead DigiTech',
  url: baseUrl,
  logo: `${baseUrl}/favicon.ico`,
  description:
    'Custom websites, AI-powered experiences, and digital solutions designed to generate leads and accelerate growth.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'info@arrowheaddigitech.com',
    availableLanguage: 'English',
  },
  sameAs: [],
};

export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
