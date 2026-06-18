'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const footerLinks = {
  Services: [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Mobile Apps', href: '/services/mobile-apps' },
    { name: 'SEO', href: '/services/seo' },
    { name: 'Google Ads', href: '/services/google-ads' },
    { name: 'Social Media Marketing', href: '/services/social-media-marketing' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ],
  Resources: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-montserrat">Arrowhead DigiTech</h3>
            <p className="text-slate-400 mb-6">
              Building Digital Experiences That Drive Growth
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/arrowheaddigitech" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Visit Arrowhead DigiTech on LinkedIn">
                <Linkedin size={20} aria-hidden="true" />
              </a>
              <a href="https://twitter.com/arrowheaddigit" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Follow Arrowhead DigiTech on Twitter">
                <Twitter size={20} aria-hidden="true" />
              </a>
              <a href="https://facebook.com/arrowheaddigitech" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Follow Arrowhead DigiTech on Facebook">
                <Facebook size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-400">
                <Mail size={18} />
                <span>info@arrowheaddigitech.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <MapPin size={18} />
                <span>123 Tech Street, Digital City, DC 12345</span>
              </div>
            </div>
            <div className="text-slate-400 text-sm">
              <p>&copy; {new Date().getFullYear()} Arrowhead DigiTech. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
