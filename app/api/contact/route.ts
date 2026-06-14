import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { dbService } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, company, service, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store lead in database (uses dbService which handles mock mode & real database)
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

    // Send email alert (wrapped in try/catch to prevent blocking lead creation if SMTP is unconfigured)
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
