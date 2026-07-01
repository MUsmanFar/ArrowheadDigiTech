import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getSiteContent, getSiteSection } from '@/lib/site-content-server';
import { SiteContentProvider } from '@/lib/site-content-context';
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd';
import DeferredMobileCta from '@/components/layout/DeferredMobileCta';

/**
 * Inter loaded with display:swap + preload:true.
 * Critical weights (400–700) are bundled; 300 is light usage only.
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
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
    <html lang="en" className={`${inter.variable} font-inter antialiased`}>
      <head>
        {/* ── DNS prefetch + preconnect for Google Fonts CDN ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── Viewport meta (best practice — Next.js injects this but we pin it) ── */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ── Theme colour — matches warm white background ── */}
        <meta name="theme-color" content="#fdfcfb" />

        <OrganizationJsonLd />
      </head>
      <body
        className="bg-[#fdfcfb] text-foreground min-h-screen pb-16 md:pb-0 selection:bg-orange-500/25 selection:text-orange-900"
        style={{
          /* Premium scroll feel — GPU-composited, no jank */
          scrollBehavior: 'smooth',
          /* Prevent content flash during font load */
          fontSynthesis: 'none',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased' as any,
          MozOsxFontSmoothing: 'grayscale' as any,
        }}
      >
        {/* Skip-to-content for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:inline-flex focus:items-center focus:justify-center focus:min-h-11 focus:min-w-[11rem] focus:px-4 focus:py-3 focus:bg-orange-600 focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>

        <SiteContentProvider initial={siteContent}>
          {children}
        </SiteContentProvider>

        <DeferredMobileCta />
      </body>
    </html>
  );
}
