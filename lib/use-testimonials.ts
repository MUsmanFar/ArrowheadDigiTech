'use client';

import { useEffect, useState } from 'react';

export type CmsTestimonial = {
  id: string;
  name: string;
  role?: string | null;
  company?: string | null;
  content: string;
  featured?: boolean;
};

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<CmsTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/testimonials')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setTestimonials(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { testimonials, loading };
}
