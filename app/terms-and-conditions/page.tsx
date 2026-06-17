'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-dot-grid">
      <Navbar />
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <main id="main-content" className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 border-slate-100 rounded-3xl shadow-xl bg-white/70 backdrop-blur-md"
        >
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 font-montserrat tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-sm text-slate-500 mb-8 font-poppins">
            Effective Date: June 15, 2026
          </p>

          <div className="prose prose-slate max-w-none text-slate-700 font-poppins space-y-6 text-sm md:text-base leading-relaxed">
            <p>
              Welcome to Arrowhead DigiTech. These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of our website available through arrowheaddigitech.com, including any custom software designs, web applications, content, and consultation services offered by us.
            </p>
            <p>
              By accessing or using our website, you agree to comply with and be bound by these Terms. If you do not agree to these terms, you should not access or use our platform.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              1. Services Offered
            </h2>
            <p>
              Arrowhead DigiTech is a next-generation digital agency specializing in custom software architectures, premium web platforms (Next.js, React), mobile app development, CRM solutions, conversational AI chatbots, and SEO/marketing automation campaigns. Specific service deliverables are scoped and agreed upon via individual contract agreements.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              2. User Obligations
            </h2>
            <p>
              You agree to use our website and services only for lawful purposes. You represent that all contact and business information provided through our consultation booking system is accurate, current, and complete. Any attempt to disrupt the performance of our website or extract data via scraping is strictly prohibited.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              3. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise specified in a separate client contract, all intellectual property rights, codebases, brand marks, layout templates, designs, and content featured on this website remain the exclusive property of Arrowhead DigiTech. No materials may be copied, reproduced, or distributed without our prior written consent.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              4. Disclaimer of Warranties
            </h2>
            <p>
              Our website and public content are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. While we strive to maintain the highest quality of service, we make no representations or warranties, express or implied, regarding the continuous availability, accuracy of service benchmarks, or complete protection against third-party network issues.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Arrowhead DigiTech, its founders, and employees shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of this site or our digital services.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              6. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where our agency operates, without regard to conflict of law principles.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              7. Contact Us
            </h2>
            <p>
              For any questions regarding these Terms &amp; Conditions, please contact us:
            </p>
            <p className="font-semibold text-slate-900">
              Arrowhead DigiTech<br />
              Email: info@arrowheaddigitech.com<br />
              Address: 123 Tech Street, Digital City, DC 12345
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
