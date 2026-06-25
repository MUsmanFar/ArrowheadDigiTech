import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { getSiteContent, getSiteSection } from '@/lib/site-content-server';
import { SiteContentProvider } from '@/lib/site-content-context';
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd';
import DeferredMobileCta from '@/components/layout/DeferredMobileCta';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSiteSection('site.metadata');
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://arrowheaddigitech.com';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: meta.title,
      template: '%s | Arrowhead DigiTech',
    },
    description: meta.description,
    keywords: meta.keywords.split(',').map((k) => k.trim()),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      siteName: 'Arrowhead DigiTech',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: [{ url: '/icon', type: 'image/png' }],
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = await getSiteContent();

  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} font-inter antialiased bg-white min-h-screen pb-16 md:pb-0`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:inline-flex focus:items-center focus:justify-center focus:min-h-11 focus:min-w-[11rem] focus:px-4 focus:py-3 focus:bg-orange-700 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <SiteContentProvider initial={siteContent}>{children}</SiteContentProvider>
        <DeferredMobileCta />
      </body>
    </html>
  );
}
