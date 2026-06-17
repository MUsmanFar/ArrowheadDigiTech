import { contactController } from '@/backend/controllers/contact.controller';

export async function POST(request: Request) {
  return contactController.handleContactSubmission(request);
}
