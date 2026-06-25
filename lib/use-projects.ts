'use client';

import { useEffect, useState } from 'react';

export type CmsProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  clientName?: string | null;
  industry?: string | null;
  thumbnail?: string | null;
  metrics?: string | null;
  featured?: boolean;
  caseStudy?: boolean;
  order?: number;
  serviceSlugs?: string[];
};

export function useProjects() {
  const [projects, setProjects] = useState<CmsProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/projects')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects([...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
}
