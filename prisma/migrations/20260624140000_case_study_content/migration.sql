-- Case study rich content and service slug associations on projects
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "caseStudyContent" JSONB;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "serviceSlugs" TEXT[] DEFAULT ARRAY[]::TEXT[];
