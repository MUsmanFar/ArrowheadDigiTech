import { NextResponse } from 'next/server';
import { contactService, ContactLeadPayload } from '../services/contact.service';

export class ContactController {
  async handleContactSubmission(request: Request) {
    try {
      const body = await request.json();
      const { firstName, lastName, email, message } = body as ContactLeadPayload;

      // Validate required fields
      if (!firstName || !lastName || !email || !message) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      await contactService.processContactSubmission(body);

      return NextResponse.json(
        { message: 'Message sent successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Contact form API error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }
  }
}

export const contactController = new ContactController();
