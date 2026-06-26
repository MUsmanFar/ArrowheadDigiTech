'use client';

import React, { useEffect, useState } from 'react';
import { Save, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONTENT_KEYS } from '@/lib/site-content';
import type { SiteContentKey, SiteContentMap } from '@/lib/site-content';
import { invalidateSiteContentCache } from '@/lib/use-site-content';

const SECTION_LABELS: Record<SiteContentKey, string> = {
  'site.nav': 'Navigation',
  'site.footer': 'Footer',
  'site.mobile-cta': 'Mobile Sticky CTA',
  'site.cta': 'Shared CTA Block',
  'site.client-logos': 'Client Logo Strip',
  'site.metadata': 'Site Metadata (SEO)',
  'home.hero': 'Homepage — Hero',
  'home.capabilities': 'Homepage — Capabilities Intro',
  'home.featured-work': 'Homepage — Featured Work Labels',
  'home.metrics-labels': 'Homepage — Metrics Labels',
  'about.hero': 'About — Hero',
  'about.manifesto': 'About — Manifesto',
  'about.process': 'About — Process Timeline',
  'about.section-labels': 'About — Section Labels',
  'services.hero': 'Services — Hero',
  'services.trusted-by': 'Services — Trusted By Header',
  'services.list-intro': 'Services — List Intro',
  'services.detail-labels': 'Services — Detail Page Labels',
  'portfolio.hero': 'Portfolio — Hero',
  'portfolio.showcase': 'Portfolio — Project Showcase Labels',
  'case-studies.hero': 'Case Studies — Hero',
  'pricing.page': 'Pricing Page',
  'blog.page': 'Blog Page',
  'faq.page': 'FAQ Page',
  'contact.page': 'Contact Page',
  'contact.form': 'Contact — Form Labels',
  'careers.page': 'Careers Page',
  'testimonials.page': 'Testimonials Page',
  'legal.privacy': 'Privacy Policy',
  'legal.terms': 'Terms & Conditions',
};

export default function AdminSiteContentPage() {
  const [content, setContent] = useState<SiteContentMap | null>(null);
  const [activeKey, setActiveKey] = useState<SiteContentKey>('home.hero');
  const [editorValue, setEditorValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/site-content');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setContent(data.content);
      setEditorValue(JSON.stringify(data.content[activeKey], null, 2));
    } catch {
      setError('Could not load site content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (content) {
      setEditorValue(JSON.stringify(content[activeKey], null, 2));
    }
  }, [activeKey, content]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const parsed = JSON.parse(editorValue);
      const res = await fetch('/api/admin/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: activeKey, value: parsed }),
      });
      if (!res.ok) throw new Error('Save failed');
      invalidateSiteContentCache();
      setContent((prev) => (prev ? { ...prev, [activeKey]: parsed } : prev));
      setSuccess(`Saved "${SECTION_LABELS[activeKey]}"`);
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Invalid JSON or save failed. Check your syntax.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-montserrat flex items-center gap-2">
          Site Content <FileText className="text-blue-600" size={24} />
        </h1>
        <p className="text-slate-500 mt-1">
          Edit heroes, navigation, footer, legal pages, careers, and other static sections.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
          <AlertCircle size={18} /> {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100">{success}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden max-h-[70vh] overflow-y-auto">
          {SITE_CONTENT_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveKey(key)}
              className={`w-full text-left px-4 py-3 text-sm border-b border-slate-50 transition-colors ${
                activeKey === key
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              {SECTION_LABELS[key]}
              <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{key}</span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">{SECTION_LABELS[activeKey]}</h2>
            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              <Save size={16} className="mr-2" />
              {saving ? 'Saving…' : 'Save Section'}
            </Button>
          </div>
          <textarea
            value={editorValue}
            onChange={(e) => setEditorValue(e.target.value)}
            rows={24}
            className="w-full font-mono text-sm border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
