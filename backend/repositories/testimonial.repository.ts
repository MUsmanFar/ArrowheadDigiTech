import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class TestimonialRepository {
  async findAll() {
    return prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: Prisma.TestimonialCreateInput) {
    return prisma.testimonial.create({
      data,
    });
  }
}

export const testimonialRepository = new TestimonialRepository();
