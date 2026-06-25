'use client';

import { useEffect, useState } from 'react';
import type { SiteContentKey, SiteContentMap } from './site-content';
import { SITE_CONTENT_DEFAULTS } from './site-content-defaults';

let cache: SiteContentMap | null = null;
let inflight: Promise<SiteContentMap> | null = null;

async function fetchSiteContent(): Promise<SiteContentMap> {
  if (cache) return cache;
  if (!inflight) {
    inflight = fetch('/api/public/site-content')
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        cache = { ...SITE_CONTENT_DEFAULTS, ...data };
        return cache;
      })
      .catch(() => {
        cache = SITE_CONTENT_DEFAULTS;
        return cache;
      });
  }
  return inflight;
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContentMap>(SITE_CONTENT_DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteContent()
      .then(setContent)
      .finally(() => setLoading(false));
  }, []);

  return { content, loading };
}

export function useSiteSection<K extends SiteContentKey>(key: K) {
  const { content, loading } = useSiteContent();
  return { section: content[key], loading };
}

export function invalidateSiteContentCache() {
  cache = null;
  inflight = null;
}
