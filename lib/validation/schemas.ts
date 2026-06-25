import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  company: z.string().max(200).optional(),
  service: z.string().max(200).optional(),
  intent: z.string().max(200).optional(),
  budget: z.string().max(100).optional(),
  message: z.string().min(1).max(5000),
}).refine(
  (data) => Boolean(data.name?.trim() || `${data.firstName || ''} ${data.lastName || ''}`.trim()),
  { message: 'Name is required', path: ['name'] },
);

export const siteContentPutSchema = z.object({
  key: z.string().min(1),
  value: z.record(z.unknown()),
});

export const idBodySchema = z.object({ id: z.string().min(1) });

export const projectMediaPutSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1).max(120),
}).passthrough();

export function formatZodError(error: z.ZodError): string {
  return error.errors.map((e) => `${e.path.join('.') || 'body'}: ${e.message}`).join('; ');
}

export function parseJsonBody<T>(schema: z.ZodSchema<T>, body: unknown):
  | { success: true; data: T }
  | { success: false; error: string } {
  const parsed = schema.safeParse(body);
  if (!parsed.success) return { success: false, error: formatZodError(parsed.error) };
  return { success: true, data: parsed.data };
}

export async function readJsonBody(
  request: Request,
): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  try {
    return { ok: true, data: await request.json() };
  } catch {
    return { ok: false, error: 'Invalid JSON body' };
  }
}
