import { useState, useEffect } from 'react';

export interface ProjectMediaData {
  slug: string;
  homepageFeaturedImage: string | null;
  portfolioFeaturedImage: string | null;
  portfolioGridImage: string | null;
  caseStudyHeroImage: string | null;
  caseStudyGalleryImages: string[];
  mobileScreenshots: string[];
}

export function useProjectMediaBySlug(slug: string) {
  const [media, setMedia] = useState<ProjectMediaData | null>(null);

  useEffect(() => {
    fetch('/api/public/project-media')
      .then((r) => (r.ok ? r.json() : []))
      .then((list: ProjectMediaData[]) => {
        const found = list.find((m) => m.slug === slug);
        setMedia(found || null);
      })
      .catch(() => setMedia(null));
  }, [slug]);

  return media;
}

export function useProjectMediaMap() {
  const [map, setMap] = useState<Map<string, ProjectMediaData>>(new Map());

  useEffect(() => {
    fetch('/api/public/project-media')
      .then((r) => (r.ok ? r.json() : []))
      .then((list: ProjectMediaData[]) => {
        const m = new Map<string, ProjectMediaData>();
        list.forEach((item) => m.set(item.slug, item));
        setMap(m);
      })
      .catch(() => {});
  }, []);

  return map;
}

export function thumbnailFor(media: ProjectMediaData | null | undefined): string | null {
  return media?.portfolioGridImage || media?.portfolioFeaturedImage || media?.caseStudyHeroImage || null;
}

export function heroImageFor(media: ProjectMediaData | null | undefined): string | null {
  return media?.caseStudyHeroImage || media?.portfolioFeaturedImage || media?.portfolioGridImage || null;
}

export function galleryImagesFor(media: ProjectMediaData | null | undefined): string[] {
  return media?.caseStudyGalleryImages || [];
}
