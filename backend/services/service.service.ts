import { serviceRepository } from '../repositories/service.repository';
import { Prisma } from '@prisma/client';

export class ServiceService {
  async getAllServices() {
    return serviceRepository.findAll();
  }

  async createService(data: Prisma.ServiceCreateInput) {
    return serviceRepository.create(data);
  }
}

export const serviceService = new ServiceService();
