import nodemailer from 'nodemailer';
import { dbService } from '@/lib/db';

export interface ContactLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export class ContactService {
  async processContactSubmission(payload: ContactLeadPayload) {
    const { firstName, lastName, email, phone, company, service, message } = payload;

    const lead = await dbService.leads.create({
      name: `${firstName} ${lastName}`,
      email,
      phone: phone || null,
      company: company || null,
      service: service || null,
      message,
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
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${service ? `<p><strong>Service Interested In:</strong> ${service}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message}</p>
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
