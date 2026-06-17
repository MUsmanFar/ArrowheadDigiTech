import { NextResponse } from 'next/server';
import { serviceService } from '../services/service.service';

export class ServiceController {
  async getServices() {
    try {
      const services = await serviceService.getAllServices();
      return NextResponse.json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      return NextResponse.json(
        { error: 'Failed to fetch services' },
        { status: 500 }
      );
    }
  }

  async createService(request: Request) {
    try {
      const body = await request.json();
      const service = await serviceService.createService(body);
      return NextResponse.json(service, { status: 201 });
    } catch (error) {
      console.error('Error creating service:', error);
      return NextResponse.json(
        { error: 'Failed to create service' },
        { status: 500 }
      );
    }
  }
}

export const serviceController = new ServiceController();
