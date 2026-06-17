import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class ServiceRepository {
  async findAll() {
    return prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async create(data: Prisma.ServiceCreateInput) {
    return prisma.service.create({
      data,
    });
  }
}

export const serviceRepository = new ServiceRepository();
