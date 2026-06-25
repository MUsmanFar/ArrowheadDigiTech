import { dbService } from '@/lib/db';
import { projectToCaseStudy } from '@/lib/case-study';

const publicEntityMap: Record<string, { findMany: () => Promise<unknown> }> = {
  services: dbService.services,
  projects: dbService.projects,
  testimonials: dbService.testimonials,
  faqs: dbService.faqs,
  'project-media': dbService.projectMedia,
  founders: dbService.founders,
  'client-logos': dbService.clientLogos,
  'case-studies': {
    findMany: async () => {
      const projects = await dbService.projects.findMany();
      return (Array.isArray(projects) ? projects : [])
        .filter((project: { caseStudy?: boolean }) => project.caseStudy)
        .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
        .map((project) => projectToCaseStudy(project as Parameters<typeof projectToCaseStudy>[0]));
    },
  },
  blog: {
    findMany: async () => {
      const posts = await dbService.blogPosts.findMany();
      return (Array.isArray(posts) ? posts : []).filter(
        (post: { published?: boolean }) => post.published,
      );
    },
  },
  pricing: dbService.pricingPackages,
  team: dbService.teamMembers,
};

export class PublicService {
  getServiceForEntity(entity: string) {
    return publicEntityMap[entity];
  }
}

export const publicService = new PublicService();
