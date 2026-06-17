import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class ProjectRepository {
  async findAll() {
    return prisma.project.findMany({
      include: {
        testimonial: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  async create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({
      data,
    });
  }
}

export const projectRepository = new ProjectRepository();
