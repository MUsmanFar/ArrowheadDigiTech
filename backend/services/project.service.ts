import { projectRepository } from '../repositories/project.repository';
import { Prisma } from '@prisma/client';

export class ProjectService {
  async getAllProjects() {
    return projectRepository.findAll();
  }

  async createProject(data: Prisma.ProjectCreateInput) {
    // Here we can add business logic, validation, etc.
    return projectRepository.create(data);
  }
}

export const projectService = new ProjectService();
