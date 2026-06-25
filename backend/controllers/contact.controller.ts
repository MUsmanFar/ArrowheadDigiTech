import { NextResponse } from 'next/server';
import { contactService, ContactLeadPayload } from '../services/contact.service';
import { apiError, safeErrorMessage } from '@/lib/api-response';
import { logger } from '@/lib/logger';
import { enforceRateLimit, rateLimitResponse } from '@/lib/rate-limit';
import { parseJsonBody, contactSchema, readJsonBody } from '@/lib/validation/schemas';
import { sanitizePlainText, sanitizeRichHtml } from '@/lib/sanitize';

export class ContactController {
  async handleContactSubmission(request: Request) {
    const rl = enforceRateLimit(request, 'contact', 5, 60 * 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterSec);

    try {
      const bodyResult = await readJsonBody(request);
      if (!bodyResult.ok) return apiError(bodyResult.error, 400, { code: 'INVALID_JSON' });

      const parsed = parseJsonBody(contactSchema, bodyResult.data);
      if (!parsed.success) {
        return apiError(parsed.error, 400, { code: 'VALIDATION_ERROR' });
      }

      const payload: ContactLeadPayload = {
        ...parsed.data,
        name: parsed.data.name
          ? sanitizePlainText(parsed.data.name)
          : sanitizePlainText(`${parsed.data.firstName || ''} ${parsed.data.lastName || ''}`.trim()),
        email: sanitizePlainText(parsed.data.email),
        phone: parsed.data.phone ? sanitizePlainText(parsed.data.phone) : undefined,
        company: parsed.data.company ? sanitizePlainText(parsed.data.company) : undefined,
        service: parsed.data.service ? sanitizePlainText(parsed.data.service) : undefined,
        intent: parsed.data.intent ? sanitizePlainText(parsed.data.intent) : undefined,
        budget: parsed.data.budget ? sanitizePlainText(parsed.data.budget) : undefined,
        message: sanitizeRichHtml(parsed.data.message),
      };

      await contactService.processContactSubmission(payload);

      return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
    } catch (error) {
      logger.error('Contact form API error', { error: safeErrorMessage(error) });
      return apiError('Failed to send message', 500, { code: 'INTERNAL_ERROR' });
    }
  }
}

export const contactController = new ContactController();
