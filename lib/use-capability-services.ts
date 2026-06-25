'use client';

import { useEffect, useMemo, useState } from 'react';

export type CmsService = {
  id: string;
  slug: string;
  title: string;
  description: string;
  featured?: boolean;
  order?: number;
};

const DEFAULT_SLUGS = ['web-development', 'ai-chatbots', 'lead-generation', 'digital-strategy'];

export function useCapabilityServices(slugs?: string[]) {
  const [services, setServices] = useState<CmsService[]>([]);
  const [loading, setLoading] = useState(true);
  const filterSlugs = useMemo(
    () => (slugs?.length ? slugs : DEFAULT_SLUGS),
    [slugs],
  );

  useEffect(() => {
    fetch('/api/public/services')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data)) return;
        const filtered = data
          .filter((service: CmsService) => filterSlugs.includes(service.slug))
          .sort(
            (a: CmsService, b: CmsService) =>
              filterSlugs.indexOf(a.slug) - filterSlugs.indexOf(b.slug),
          );
        setServices(filtered);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filterSlugs]);

  return { services, loading };
}
