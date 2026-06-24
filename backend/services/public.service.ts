import { dbService } from '@/lib/db';

const publicEntityMap: Record<string, { findMany: () => Promise<unknown> }> = {
  services: dbService.services,
  projects: dbService.projects,
  testimonials: dbService.testimonials,
  faqs: dbService.faqs,
  'project-media': dbService.projectMedia,
  founders: dbService.founders,
  'client-logos': dbService.clientLogos,
};

export class PublicService {
  getServiceForEntity(entity: string) {
    return publicEntityMap[entity];
  }
}

export const publicService = new PublicService();
