import { dbService } from '@/lib/db';

const entityMap: Record<string, any> = {
  services: dbService.services,
  projects: dbService.projects,
  testimonials: dbService.testimonials,
  faqs: dbService.faqs,
  blog: dbService.blogPosts,
  pricing: dbService.pricingPackages,
  team: dbService.teamMembers,
  leads: dbService.leads,
  users: dbService.users,
  settings: dbService.settings,
  'project-media': dbService.projectMedia,
  founders: dbService.founders,
  'client-logos': dbService.clientLogos,
};

export class AdminService {
  getServiceForEntity(entity: string) {
    return entityMap[entity];
  }
}

export const adminService = new AdminService();
