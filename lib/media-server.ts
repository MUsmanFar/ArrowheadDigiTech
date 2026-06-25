import { dbService } from './db';
import type { ClientLogoData } from './media';

export async function getClientLogosServer(): Promise<ClientLogoData[]> {
  const rows = await dbService.clientLogos.findMany();
  if (!Array.isArray(rows)) return [];
  return rows.map((row: ClientLogoData) => ({
    id: row.id,
    logo: row.logo,
    companyName: row.companyName,
    websiteUrl: row.websiteUrl ?? null,
    sortOrder: row.sortOrder ?? 0,
  }));
}
