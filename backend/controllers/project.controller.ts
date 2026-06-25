import { NextResponse } from 'next/server';
import { projectService } from '../services/project.service';
import { requireAdmin } from '../middleware/auth.middleware';
import { apiError } from '@/lib/api-response';

export class ProjectController {
  async getProjects() {
    try {
      const projects = await projectService.getAllProjects();
      return NextResponse.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }
  }

  async createProject(request: Request) {
    try {
      if (!(await requireAdmin(request))) {
        return apiError('Unauthorized', 401, { code: 'UNAUTHORIZED' });
      }
      const body = await request.json();
      const project = await projectService.createProject(body);
      return NextResponse.json(project, { status: 201 });
    } catch (error) {
      console.error('Error creating project:', error);
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      );
    }
  }
}

export const projectController = new ProjectController();
