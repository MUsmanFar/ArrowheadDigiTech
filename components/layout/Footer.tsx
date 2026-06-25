'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useSiteSection } from '@/lib/use-site-content';

export default function Footer() {
  const { section: footer } = useSiteSection('site.footer');

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-montserrat">{footer.brandName}</h3>
            <p className="text-slate-400 mb-6">{footer.tagline}</p>
            <div className="flex items-center gap-1">
              {footer.social.linkedin && (
                <a href={footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all" aria-label="LinkedIn">
                  <Linkedin size={20} aria-hidden="true" />
                </a>
              )}
              {footer.social.twitter && (
                <a href={footer.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all" aria-label="Twitter">
                  <Twitter size={20} aria-hidden="true" />
                </a>
              )}
              {footer.social.facebook && (
                <a href={footer.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all" aria-label="Facebook">
                  <Facebook size={20} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
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
                <a href={`mailto:${footer.email}`} className="hover:text-white transition-colors">{footer.email}</a>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Phone size={18} />
                <a href={footer.phoneHref} className="hover:text-white transition-colors">{footer.phone}</a>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <MapPin size={18} />
                <span>{footer.address}</span>
              </div>
            </div>
            <div className="text-slate-400 text-sm">
              <p>&copy; {new Date().getFullYear()} {footer.brandName}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
