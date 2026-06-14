import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Arrowhead DigiTech | Building Digital Experiences That Drive Growth",
  description: "Web Development, Marketing, AI Automation, CRM Solutions, Lead Generation and Business Growth.",
  keywords: "web development, digital marketing, AI automation, CRM solutions, lead generation, business growth",
  openGraph: {
    title: "Arrowhead DigiTech | Building Digital Experiences That Drive Growth",
    description: "Web Development, Marketing, AI Automation, CRM Solutions, Lead Generation and Business Growth.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arrowhead DigiTech | Building Digital Experiences That Drive Growth",
    description: "Web Development, Marketing, AI Automation, CRM Solutions, Lead Generation and Business Growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${montserrat.variable} font-montserrat antialiased bg-gradient-to-br from-white via-slate-50 to-blue-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
