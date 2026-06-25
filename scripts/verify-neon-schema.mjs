import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const checks = {};

  const tables = await prisma.$queryRaw`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN ('ProjectMedia', 'Founder', 'ClientLogo', 'Service', 'Lead', 'Testimonial')
    ORDER BY table_name`;
  checks.tables = tables;

  const serviceThumbnail = await prisma.$queryRaw`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Service' AND column_name = 'thumbnail'`;
  checks.serviceThumbnail = serviceThumbnail;

  const founderProfileKey = await prisma.$queryRaw`
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Founder' AND column_name = 'profileKey'`;
  checks.founderProfileKey = founderProfileKey;

  const projectMediaFk = await prisma.$queryRaw`
    SELECT tc.constraint_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name,
           rc.delete_rule, rc.update_rule
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
    JOIN information_schema.referential_constraints rc ON rc.constraint_name = tc.constraint_name
    WHERE tc.table_schema = 'public' AND tc.table_name = 'ProjectMedia' AND tc.constraint_type = 'FOREIGN KEY'`;
  checks.projectMediaFk = projectMediaFk;

  const leadCheck = await prisma.$queryRaw`
    SELECT conname, pg_get_constraintdef(oid) AS definition
    FROM pg_constraint
    WHERE conrelid = '"Lead"'::regclass AND contype = 'c' AND conname = 'Lead_status_check'`;
  checks.leadStatusCheck = leadCheck;

  const testimonialCheck = await prisma.$queryRaw`
    SELECT conname, pg_get_constraintdef(oid) AS definition
    FROM pg_constraint
    WHERE conrelid = '"Testimonial"'::regclass AND contype = 'c' AND conname = 'Testimonial_rating_check'`;
  checks.testimonialRatingCheck = testimonialCheck;

  const testimonialProjectId = await prisma.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Testimonial' AND column_name = 'projectId'`;
  checks.testimonialProjectIdDropped = testimonialProjectId;

  const diff = await prisma.$queryRaw`
    SELECT migration_name, finished_at, applied_steps_count
    FROM _prisma_migrations
    ORDER BY finished_at`;
  checks.appliedMigrations = diff;

  console.log(JSON.stringify(checks, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
