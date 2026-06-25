const SENSITIVE_KEYS = new Set(['password', 'passwordHash', 'hash']);

export function stripSensitive<T>(value: T): T {
  return stripSensitiveValue(value) as T;
}

function stripSensitiveValue(value: unknown): unknown {
  if (value == null) return value;
  if (Array.isArray(value)) return value.map(stripSensitiveValue);
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (SENSITIVE_KEYS.has(k)) continue;
      out[k] = stripSensitiveValue(v);
    }
    return out;
  }
  return value;
}

export function stripSensitiveList<T>(items: T[]): T[] {
  return items.map((item) => stripSensitive(item));
}
