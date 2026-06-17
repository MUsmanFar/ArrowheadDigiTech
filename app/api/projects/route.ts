import { projectController } from '@/backend/controllers/project.controller';

export async function GET() {
  return projectController.getProjects();
}

export async function POST(request: Request) {
  return projectController.createProject(request);
}
