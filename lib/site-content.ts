import { SITE_CONTENT_DEFAULTS } from './site-content-defaults';

export const SITE_CONTENT_KEYS = Object.keys(SITE_CONTENT_DEFAULTS) as SiteContentKey[];

export type SiteContentKey = keyof typeof SITE_CONTENT_DEFAULTS;

export type NavContent = {
  brandName: string;
  items: { name: string; href: string }[];
  ctaLabel: string;
  ctaHref: string;
};

export type FooterContent = {
  brandName: string;
  tagline: string;
  columns: { title: string; links: { name: string; href: string }[] }[];
  email: string;
  phone: string;
  phoneHref: string;
  address: string;
  social: { linkedin?: string; twitter?: string; facebook?: string };
};

export type CtaContent = {
  badge: string;
  headline: string;
  headlineAccent?: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
};

export type HeroContent = {
  badge?: string;
  headline: string;
  headlineAccent?: string;
  headlineSuffix?: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string };
};

export type ManifestoContent = {
  title: string;
  items: { id: string; title: string; content: string }[];
};

export type ProcessContent = {
  badge: string;
  title: string;
  steps: { title: string; desc: string }[];
};

export type LegalPageContent = {
  title: string;
  effectiveDate: string;
  sections: { heading?: string; paragraphs: string[] }[];
};

export type CareersContent = {
  heroTitle: string;
  heroTitleAccent: string;
  heroDescription: string;
  benefitsTitle: string;
  benefits: string[];
  openingsTitle: string;
  openingsDescription: string;
  openings: {
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    description: string;
  }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonLabel: string;
  ctaEmail: string;
};

export type SiteContentMap = {
  'site.nav': NavContent;
  'site.footer': FooterContent;
  'site.mobile-cta': { phone: string; phoneHref: string; buttonLabel: string; buttonHref: string };
  'site.cta': CtaContent;
  'site.client-logos': { label: string };
  'site.metadata': { title: string; description: string; keywords: string };
  'home.hero': HeroContent;
  'home.capabilities': {
    headline: string;
    headlineAccent: string;
    description: string;
    capabilitySlugs: string[];
    viewAllLabel: string;
    viewAllHref: string;
  };
  'about.hero': { badge: string; headline: string; subheadline: string };
  'about.manifesto': ManifestoContent;
  'about.process': ProcessContent;
  'services.hero': HeroContent;
  'services.trusted-by': { badge: string; headline: string };
  'portfolio.hero': HeroContent;
  'case-studies.hero': HeroContent;
  'pricing.page': {
    heroTitle: string;
    heroTitleAccent: string;
    heroDescription: string;
    compareTitle: string;
    compareDescription: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonLabel: string;
    ctaButtonHref: string;
  };
  'blog.page': {
    heroTitle: string;
    heroTitleAccent: string;
    heroDescription: string;
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterButtonLabel: string;
  };
  'faq.page': {
    heroTitle: string;
    heroTitleAccent: string;
    heroDescription: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonLabel: string;
    ctaButtonHref: string;
  };
  'contact.page': {
    badge: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    headquartersLabel: string;
    headquarters: string;
    inquiriesLabel: string;
    inquiriesEmail: string;
  };
  'careers.page': CareersContent;
  'testimonials.page': HeroContent;
  'legal.privacy': LegalPageContent;
  'legal.terms': LegalPageContent;
  'home.featured-work': {
    headline: string;
    description: string;
    viewCaseStudyLabel: string;
    viewAllLabel: string;
  };
  'home.metrics-labels': { projectsLabel: string; industriesLabel: string };
  'portfolio.showcase': {
    headline: string;
    subheadline: string;
    viewCaseStudyLabel: string;
    emptyMessage: string;
  };
  'services.list-intro': { headline: string; subheadline: string };
  'services.detail-labels': {
    backToServices: string;
    getStarted: string;
    problemTitle: string;
    problemSubtitle: string;
    solutionTitle: string;
    solutionSubtitle: string;
    processTitle: string;
    processSubtitle: string;
    benefitsTitle: string;
    benefitsSubtitle: string;
    deliverablesTitle: string;
    pricingTitle: string;
    pricingSubtitle: string;
    mostPopular: string;
    inquireNow: string;
    faqTitle: string;
    faqSubtitle: string;
  };
  'about.section-labels': {
    founderBadge: string;
    experienceTitle: string;
    coreExpertiseTitle: string;
    industriesServedTitle: string;
    projectsDeliveredTitle: string;
    statProjectsDelivered: string;
    statIndustriesServed: string;
    statClientTestimonials: string;
    statTechnologiesUsed: string;
    statCaseStudies: string;
    teamHeadline: string;
    technologiesTitle: string;
    technologiesSubtitle: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
  };
  'contact.form': {
    headline: string;
    subheadline: string;
    successTitle: string;
    successMessage: string;
    submitLabel: string;
    sendingLabel: string;
    bookCallLabel: string;
    successSchedulingLabel: string;
  };
};

function deepMerge<T>(defaults: T, override: Partial<T> | undefined): T {
  if (!override || typeof override !== 'object') return defaults;
  const result = { ...defaults } as T;
  for (const key of Object.keys(override) as (keyof T)[]) {
    const val = override[key];
    if (val === undefined) continue;
    const defaultVal = defaults[key];
    if (
      val &&
      typeof val === 'object' &&
      !Array.isArray(val) &&
      defaultVal &&
      typeof defaultVal === 'object' &&
      !Array.isArray(defaultVal)
    ) {
      result[key] = deepMerge(defaultVal, val as Partial<typeof defaultVal>);
    } else {
      result[key] = val as T[keyof T];
    }
  }
  return result;
}

export function mergeSiteContent(overrides: Partial<Record<SiteContentKey, unknown>>): SiteContentMap {
  const merged = { ...SITE_CONTENT_DEFAULTS } as SiteContentMap;
  for (const key of SITE_CONTENT_KEYS) {
    if (overrides[key] !== undefined) {
      (merged as Record<SiteContentKey, SiteContentMap[SiteContentKey]>)[key] = deepMerge(
        SITE_CONTENT_DEFAULTS[key],
        overrides[key] as Partial<SiteContentMap[typeof key]>,
      );
    }
  }
  return merged;
}
