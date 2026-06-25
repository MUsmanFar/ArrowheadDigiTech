import { dbService } from '@/lib/db';

/** Admin CRUD entities — `users` intentionally excluded (auth uses dedicated login route). */
const entityMap: Record<string, any> = {
  services: dbService.services,
  projects: dbService.projects,
  testimonials: dbService.testimonials,
  faqs: dbService.faqs,
  blog: dbService.blogPosts,
  pricing: dbService.pricingPackages,
  team: dbService.teamMembers,
  leads: dbService.leads,
  settings: dbService.settings,
  'project-media': dbService.projectMedia,
  founders: dbService.founders,
  'client-logos': dbService.clientLogos,
};

export class AdminService {
  getServiceForEntity(entity: string) {
    return entityMap[entity];
  }

  isAllowedEntity(entity: string): boolean {
    return entity in entityMap;
  }
}

export const adminService = new AdminService();
