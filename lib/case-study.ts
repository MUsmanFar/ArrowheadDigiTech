export type CaseStudyMetric = { value: string; label: string };

export type CaseStudyTestimonial = {
  name: string;
  role: string;
  content: string;
  image?: string;
};

export type CaseStudyContent = {
  summary: string;
  projectType: string;
  technologies: string[];
  challenge: string;
  painPoints: string[];
  context: string;
  approach: string[];
  outcome: string;
  keyResults: string[];
  metrics: CaseStudyMetric[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  projectType: string;
  summary: string;
  technologies: string[];
  thumbnail: string | null;
  images: string[];
  metrics: CaseStudyMetric[];
  challenge: string;
  painPoints: string[];
  context: string;
  approach: string[];
  outcome: string;
  keyResults: string[];
  testimonial?: CaseStudyTestimonial;
};

export type ProjectWithTestimonial = {
  slug: string;
  title: string;
  description: string;
  clientName?: string | null;
  industry?: string | null;
  thumbnail?: string | null;
  images?: string[];
  metrics?: string | null;
  caseStudyContent?: unknown;
  testimonial?: {
    name: string;
    role?: string | null;
    content: string;
    image?: string | null;
  } | null;
};

export function parseMetricsString(metrics?: string | null): CaseStudyMetric[] {
  if (!metrics?.trim()) return [];
  return metrics.split(',').map((part) => {
    const trimmed = part.trim();
    const spaceIdx = trimmed.indexOf(' ');
    if (spaceIdx === -1) return { value: trimmed, label: 'metric' };
    return {
      value: trimmed.slice(0, spaceIdx).trim(),
      label: trimmed.slice(spaceIdx + 1).trim().toLowerCase(),
    };
  });
}

export function projectToCaseStudy(project: ProjectWithTestimonial): CaseStudy {
  const content = (project.caseStudyContent || null) as CaseStudyContent | null;
  return {
    slug: project.slug,
    title: project.title,
    client: project.clientName || '',
    industry: project.industry || '',
    projectType: content?.projectType || 'Web Application',
    summary: content?.summary || project.description,
    technologies: content?.technologies || [],
    thumbnail: project.thumbnail || null,
    images: project.images || [],
    metrics: content?.metrics?.length ? content.metrics : parseMetricsString(project.metrics),
    challenge: content?.challenge || '',
    painPoints: content?.painPoints || [],
    context: content?.context || '',
    approach: content?.approach || [],
    outcome: content?.outcome || '',
    keyResults: content?.keyResults || [],
    testimonial: project.testimonial
      ? {
          name: project.testimonial.name,
          role: project.testimonial.role || '',
          content: project.testimonial.content,
          image: project.testimonial.image || undefined,
        }
      : undefined,
  };
}
