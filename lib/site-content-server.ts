import { dbService } from './db';
import {
  SITE_CONTENT_KEYS,
  mergeSiteContent,
  type SiteContentKey,
  type SiteContentMap,
} from './site-content';

export async function loadSiteContentOverrides(): Promise<Partial<Record<SiteContentKey, unknown>>> {
  const settings = await dbService.settings.findMany();
  const overrides: Partial<Record<SiteContentKey, unknown>> = {};
  if (!Array.isArray(settings)) return overrides;
  for (const setting of settings) {
    if (!SITE_CONTENT_KEYS.includes(setting.key as SiteContentKey)) continue;
    try {
      overrides[setting.key as SiteContentKey] = JSON.parse(setting.value);
    } catch {
      // skip invalid JSON
    }
  }
  return overrides;
}

export async function getSiteContent(): Promise<SiteContentMap> {
  const overrides = await loadSiteContentOverrides();
  return mergeSiteContent(overrides);
}

export async function getSiteSection<K extends SiteContentKey>(key: K): Promise<SiteContentMap[K]> {
  const content = await getSiteContent();
  return content[key];
}

export async function upsertSiteSection<K extends SiteContentKey>(
  key: K,
  value: SiteContentMap[K],
): Promise<void> {
  const existing = await dbService.settings.findUnique(key);
  const payload = { key, value: JSON.stringify(value) };
  if (existing?.id) {
    await dbService.settings.update(existing.id, payload);
  } else {
    await dbService.settings.create(payload);
  }
}
