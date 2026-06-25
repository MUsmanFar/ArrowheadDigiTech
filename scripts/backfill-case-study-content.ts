import { PrismaClient } from '@prisma/client';
import { CASE_STUDY_SEED_BY_SLUG } from '../lib/seed-case-study-content';

const prisma = new PrismaClient();

async function main() {
  let updated = 0;
  for (const [slug, extra] of Object.entries(CASE_STUDY_SEED_BY_SLUG)) {
    const result = await prisma.project.updateMany({
      where: { slug },
      data: {
        caseStudyContent: extra.caseStudyContent,
        serviceSlugs: extra.serviceSlugs ?? [],
      },
    });
    if (result.count > 0) {
      updated += result.count;
      console.log(`Updated ${slug}`);
    }
  }
  console.log(`Backfill complete: ${updated} project(s) updated.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
