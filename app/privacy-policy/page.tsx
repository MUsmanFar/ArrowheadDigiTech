'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-dot-grid">
      <Navbar />
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-20 left-1/4 w-[450px] h-[450px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <main id="main-content" className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 border-slate-100 rounded-3xl shadow-xl bg-white/70 backdrop-blur-md"
        >
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 font-montserrat tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 mb-8 font-poppins">
            Effective Date: June 15, 2026
          </p>

          <div className="prose prose-slate max-w-none text-slate-700 font-poppins space-y-6 text-sm md:text-base leading-relaxed">
            <p>
              At Arrowhead DigiTech (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting the privacy, security, and confidentiality of our clients, visitors, and users who access our website and digital services available through arrowheaddigitech.com.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, disclose, and protect your information when you interact with our platform. By accessing or using our website, you agree to the practices described in this Privacy Policy.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              1. Information We Collect
            </h2>
            <p>
              We collect information that you voluntarily provide to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information such as your name, email address, phone number, and company name when you book a consultation or submit a contact form.</li>
              <li>Details regarding your project requirements, goals, and business operations to help us customize our design, development, and marketing services.</li>
              <li>Billing and payment information, processed securely through our payment integration partners.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              2. How We Use Your Information
            </h2>
            <p>
              We utilize your information to deliver high-end digital solutions, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing and managing custom web development, mobile apps, and marketing services.</li>
              <li>Responding to inquiries, booking consultations, and providing client support.</li>
              <li>Improving our website performance, user experience, and optimizing conversions.</li>
              <li>Complying with legal and regulatory obligations.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              3. Cookies and Tracking Technologies
            </h2>
            <p>
              We may use cookies, analytics tools, and conversion pixels to analyze traffic, remember user preferences, and measure the performance of our marketing campaigns. You can adjust your browser settings to refuse cookies, though some features of the site may function differently as a result.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              4. Data Protection and Security
            </h2>
            <p>
              We implement industry-standard administrative, technical, and physical security measures to safeguard your personal data against unauthorized access, loss, or alteration. However, no database or transmission over the internet can be guaranteed to be 100% secure.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              5. Third-Party Services
            </h2>
            <p>
              Our website may contain links to third-party services (such as client portfolios or payment platforms). We are not responsible for the privacy practices or content of third-party websites. We encourage you to review their policies directly.
            </p>

            <h2 className="text-xl font-bold text-slate-900 font-montserrat pt-4">
              6. Contact Information
            </h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please contact us at:
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
