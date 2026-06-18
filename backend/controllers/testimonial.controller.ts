import { NextResponse } from 'next/server';
import { testimonialService } from '../services/testimonial.service';
import { authenticateAdmin } from '../middleware/auth.middleware';

export class TestimonialController {
  async getTestimonials() {
    try {
      const testimonials = await testimonialService.getAllTestimonials();
      return NextResponse.json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return NextResponse.json(
        { error: 'Failed to fetch testimonials' },
        { status: 500 }
      );
    }
  }

  async createTestimonial(request: Request) {
    try {
      if (!(await authenticateAdmin(request))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const body = await request.json();
      const testimonial = await testimonialService.createTestimonial(body);
      return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
      console.error('Error creating testimonial:', error);
      return NextResponse.json(
        { error: 'Failed to create testimonial' },
        { status: 500 }
      );
    }
  }
}

export const testimonialController = new TestimonialController();
