import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arrowhead DigiTech | Digital Agency — Websites, AI & Growth",
  description:
    "Custom Websites, AI-Powered Experiences, and Digital Solutions designed to generate leads, improve credibility, and accelerate growth.",
  keywords:
    "web development, digital marketing, AI automation, CRM solutions, lead generation, business growth",
  openGraph: {
    title: "Arrowhead DigiTech | Digital Agency — Websites, AI & Growth",
    description:
      "Custom Websites, AI-Powered Experiences, and Digital Solutions designed to generate leads, improve credibility, and accelerate growth.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arrowhead DigiTech | Digital Agency — Websites, AI & Growth",
    description:
      "Custom Websites, AI-Powered Experiences, and Digital Solutions designed to generate leads, improve credibility, and accelerate growth.",
  },
};

import MobileStickyCta from '@/components/layout/MobileStickyCta';

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
        <MobileStickyCta />
      </body>
    </html>
  );
}
