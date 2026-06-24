export interface ProjectMediaData {
  slug: string;
  homepageFeaturedImage: string | null;
  portfolioFeaturedImage: string | null;
  portfolioGridImage: string | null;
  caseStudyHeroImage: string | null;
  caseStudyGalleryImages: string[];
  mobileScreenshots: string[];
}

export interface FounderData {
  id: string;
  name: string;
  position: string;
  biography: string;
  photo: string | null;
}

export interface ClientLogoData {
  id: string;
  logo: string;
  companyName: string;
  websiteUrl: string | null;
  sortOrder: number;
}

export async function getProjectMedia(slug: string): Promise<ProjectMediaData | null> {
  try {
    const res = await fetch('/api/public/project-media');
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;
    return data.find((item: any) => item.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function getFounder(): Promise<FounderData | null> {
  try {
    const res = await fetch('/api/public/founders');
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data[0];
    return null;
  } catch {
    return null;
  }
}

export async function getClientLogos(): Promise<ClientLogoData[]> {
  try {
    const res = await fetch('/api/public/client-logos');
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
