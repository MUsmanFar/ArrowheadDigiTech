'use client';

import { useEffect, useState } from 'react';
import type { CaseStudy } from './case-study';

export function useCaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/case-studies')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setStudies(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { studies, loading };
}
