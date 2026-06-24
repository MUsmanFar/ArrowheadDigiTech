import nodemailer from 'nodemailer';
import { dbService } from '@/lib/db';

export interface ContactLeadPayload {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  intent?: string;
  budget?: string;
  message: string;
}

function resolveContactName(payload: ContactLeadPayload): string {
  if (payload.name?.trim()) {
    return payload.name.trim();
  }
  return `${payload.firstName || ''} ${payload.lastName || ''}`.trim();
}

function buildContactMessage(payload: ContactLeadPayload): string {
  const parts: string[] = [];
  if (payload.budget?.trim()) {
    parts.push(`Budget: ${payload.budget.trim()}`);
  }
  parts.push(payload.message.trim());
  return parts.join('\n\n');
}

export class ContactService {
  async processContactSubmission(payload: ContactLeadPayload) {
    const name = resolveContactName(payload);
    const { email, phone, company } = payload;
    const service = payload.service || payload.intent || null;
    const leadMessage = buildContactMessage(payload);

    const lead = await dbService.leads.create({
      name,
      email,
      phone: phone || null,
      company: company || null,
      service: service || null,
      message: leadMessage,
      status: 'new',
    });

    console.log(`Saved inbound lead to database: ${lead.id}`);

    // Send email alert
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM || 'info@arrowheaddigitech.com',
        to: 'info@arrowheaddigitech.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${service ? `<p><strong>Service Interested In:</strong> ${service}</p>` : ''}
          ${payload.budget ? `<p><strong>Budget:</strong> ${payload.budget}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${leadMessage}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Nodemailer SMTP alert sent successfully.');
    } catch (emailError) {
      console.warn('Nodemailer SMTP alert failed to send (probably unconfigured credentials). Lead is saved.', emailError);
    }

    return lead;
  }
}

export const contactService = new ContactService();
