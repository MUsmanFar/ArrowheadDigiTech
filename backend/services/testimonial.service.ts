import { testimonialRepository } from '../repositories/testimonial.repository';
import { Prisma } from '@prisma/client';

export class TestimonialService {
  async getAllTestimonials() {
    return testimonialRepository.findAll();
  }

  async createTestimonial(data: Prisma.TestimonialCreateInput) {
    return testimonialRepository.create(data);
  }
}

export const testimonialService = new TestimonialService();
