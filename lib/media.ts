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
