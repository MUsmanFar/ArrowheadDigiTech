-- Remove orphan testimonial.projectId (canonical link is Project.testimonialId)
ALTER TABLE "Testimonial" DROP COLUMN IF EXISTS "projectId";

-- Founder singleton: one active profile row
DELETE FROM "Founder"
WHERE "id" NOT IN (
  SELECT "id" FROM "Founder" ORDER BY "createdAt" ASC LIMIT 1
);

ALTER TABLE "Founder" ADD COLUMN IF NOT EXISTS "profileKey" TEXT;
UPDATE "Founder" SET "profileKey" = 'primary' WHERE "profileKey" IS NULL;
ALTER TABLE "Founder" ALTER COLUMN "profileKey" SET NOT NULL;
ALTER TABLE "Founder" ALTER COLUMN "profileKey" SET DEFAULT 'primary';
CREATE UNIQUE INDEX IF NOT EXISTS "Founder_profileKey_key" ON "Founder"("profileKey");

-- Link project media to projects; remove rows for missing projects first
DELETE FROM "ProjectMedia"
WHERE "slug" NOT IN (SELECT "slug" FROM "Project");

ALTER TABLE "ProjectMedia" DROP CONSTRAINT IF EXISTS "ProjectMedia_slug_fkey";
ALTER TABLE "ProjectMedia"
  ADD CONSTRAINT "ProjectMedia_slug_fkey"
  FOREIGN KEY ("slug") REFERENCES "Project"("slug")
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Lead pipeline indexes and status guard
CREATE INDEX IF NOT EXISTS "Lead_status_idx" ON "Lead"("status");
CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt");

ALTER TABLE "Lead" DROP CONSTRAINT IF EXISTS "Lead_status_check";
ALTER TABLE "Lead"
  ADD CONSTRAINT "Lead_status_check"
  CHECK ("status" IN ('new', 'contacted', 'closed'));

-- Testimonial rating guard
ALTER TABLE "Testimonial" DROP CONSTRAINT IF EXISTS "Testimonial_rating_check";
ALTER TABLE "Testimonial"
  ADD CONSTRAINT "Testimonial_rating_check"
  CHECK ("rating" >= 1 AND "rating" <= 5);
