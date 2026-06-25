import { publicController } from '@/backend/controllers/public.controller';
import { projectController } from '@/backend/controllers/project.controller';

export async function GET() {
  return publicController.handleGet('projects');
}

export async function POST(request: Request) {
  return projectController.createProject(request);
}
