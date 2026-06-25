import sanitizeHtml from 'sanitize-html';

const RICH_TEXT_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'a', 'code', 'pre', 'span', 'div', 'img',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    '*': ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
  },
};

const PLAIN_TEXT_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [],
  allowedAttributes: {},
};

export function sanitizeRichHtml(input: string): string {
  if (!input) return '';
  return sanitizeHtml(input, RICH_TEXT_OPTIONS).trim();
}

export function sanitizePlainText(input: string): string {
  if (!input) return '';
  return sanitizeHtml(input, PLAIN_TEXT_OPTIONS).trim();
}

export function sanitizeDeep(value: unknown): unknown {
  if (typeof value === 'string') {
    if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeRichHtml(value);
    return sanitizePlainText(value);
  }
  if (Array.isArray(value)) return value.map(sanitizeDeep);
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = sanitizeDeep(v);
    }
    return out;
  }
  return value;
}

const ENTITY_HTML_FIELDS: Record<string, string[]> = {
  blog: ['content', 'excerpt'],
  faqs: ['question', 'answer'],
  testimonials: ['name', 'role', 'company', 'content'],
  founders: ['name', 'position', 'biography'],
  team: ['name', 'role', 'bio'],
  services: ['title', 'description', 'problem', 'solution', 'process', 'benefits', 'deliverables'],
  projects: ['title', 'description', 'clientName', 'metrics'],
  pricing: ['name', 'description', 'price'],
  leads: ['name', 'email', 'phone', 'company', 'service', 'message'],
};

export function sanitizeEntityPayload(entity: string, payload: Record<string, unknown>): Record<string, unknown> {
  const fields = ENTITY_HTML_FIELDS[entity];
  if (!fields) return payload;

  const out = { ...payload };
  for (const field of fields) {
    if (typeof out[field] === 'string') {
      out[field] =
        field === 'content' || field === 'answer' || field === 'biography' || field === 'bio'
          ? sanitizeRichHtml(out[field] as string)
          : sanitizePlainText(out[field] as string);
    }
  }

  if (entity === 'projects' && out.caseStudyContent) {
    out.caseStudyContent = sanitizeDeep(out.caseStudyContent);
  }

  if (entity === 'blog' && typeof out.content === 'string') {
    out.content = sanitizeRichHtml(out.content);
  }

  return out;
}

export function sanitizeSiteContentSection(value: unknown): unknown {
  return sanitizeDeep(value);
}
