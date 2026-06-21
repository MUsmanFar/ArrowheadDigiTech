// Scheduling configuration — replace with your Calendly or Cal.com link
export const SCHEDULING_URL = process.env.NEXT_PUBLIC_SCHEDULING_URL || 'https://calendly.com/arrowheaddigitech/discovery';

export function getSchedulingUrl(source?: string): string {
  const base = SCHEDULING_URL;
  if (!source) return base;
  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}source=${encodeURIComponent(source)}`;
}
