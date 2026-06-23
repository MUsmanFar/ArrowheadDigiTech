'use client';

import React, { useEffect, useState } from 'react';
import type { ProjectMediaData } from '@/lib/media';
import { getProjectMedia } from '@/lib/media';

interface ProjectMediaInjectorProps {
  slug: string;
  children: (data: ProjectMediaData | null, loading: boolean) => React.ReactNode;
}

export default function ProjectMediaInjector({ slug, children }: ProjectMediaInjectorProps) {
  const [data, setData] = useState<ProjectMediaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProjectMedia(slug).then((result) => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return <>{children(data, loading)}</>;
}
