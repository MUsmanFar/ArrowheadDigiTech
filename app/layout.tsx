import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { getSiteSection } from '@/lib/site-content-server';
import MobileStickyCta from '@/components/layout/MobileStickyCta';
import ClientLogoStrip from '@/components/home/ClientLogoStrip';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSiteSection('site.metadata');
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} font-inter antialiased bg-white min-h-screen pb-16 md:pb-0`}
      >
        {children}
        <ClientLogoStrip />
        <MobileStickyCta />
      </body>
    </html>
  );
}
