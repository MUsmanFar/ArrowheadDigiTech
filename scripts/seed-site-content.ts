import { PrismaClient } from '@prisma/client';
import { SITE_CONTENT_DEFAULTS } from '../lib/site-content-defaults';

const prisma = new PrismaClient();

async function main() {
  let upserted = 0;
  for (const [key, value] of Object.entries(SITE_CONTENT_DEFAULTS)) {
    const existing = await prisma.setting.findUnique({ where: { key } });
    if (existing) {
      await prisma.setting.update({
        where: { key },
        data: { value: JSON.stringify(value) },
      });
    } else {
      await prisma.setting.create({ data: { key, value: JSON.stringify(value) } });
    }
    upserted++;
    console.log(`Upserted ${key}`);
  }
  console.log(`Site content seed complete: ${upserted} sections.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
