import nodemailer from 'nodemailer';
import { dbService } from '@/lib/db';
import { logger } from '@/lib/logger';
import { sanitizePlainText } from '@/lib/sanitize';

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
  if (payload.name?.trim()) return payload.name.trim();
  return `${payload.firstName || ''} ${payload.lastName || ''}`.trim();
}

function buildContactMessage(payload: ContactLeadPayload): string {
  const parts: string[] = [];
  if (payload.budget?.trim()) parts.push(`Budget: ${payload.budget.trim()}`);
  parts.push(payload.message.trim());
  return parts.join('\n\n');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function smtpConfigured(): boolean {
  return Boolean(
    process.env.EMAIL_HOST &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASSWORD &&
      process.env.EMAIL_FROM,
  );
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

    logger.info('Inbound lead saved', { leadId: lead.id, email });

    if (!smtpConfigured()) {
      logger.warn('SMTP not configured; skipping contact email notification', { leadId: lead.id });
      return lead;
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587', 10),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const safeName = escapeHtml(sanitizePlainText(name));
      const safeEmail = escapeHtml(sanitizePlainText(email));
      const safeMessage = escapeHtml(leadMessage).replace(/\n/g, '<br/>');

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'info@arrowheaddigitech.com',
        to: process.env.EMAIL_TO || 'info@arrowheaddigitech.com',
        subject: `New Contact Form Submission from ${sanitizePlainText(name)}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(sanitizePlainText(phone))}</p>` : ''}
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(sanitizePlainText(company))}</p>` : ''}
          ${service ? `<p><strong>Service:</strong> ${escapeHtml(sanitizePlainText(service))}</p>` : ''}
          ${payload.budget ? `<p><strong>Budget:</strong> ${escapeHtml(sanitizePlainText(payload.budget))}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      });
      logger.info('Contact email notification sent', { leadId: lead.id });
    } catch (emailError) {
      logger.warn('Contact email notification failed; lead persisted', {
        leadId: lead.id,
        error: emailError instanceof Error ? emailError.message : String(emailError),
      });
    }

    return lead;
  }
}

export const contactService = new ContactService();
