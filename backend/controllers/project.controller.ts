import { NextResponse } from 'next/server';
import { projectService } from '../services/project.service';
import { authenticateAdmin } from '../middleware/auth.middleware';

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
      if (!(await authenticateAdmin(request))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
