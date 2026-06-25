import { dbService } from './db';
import { projectToCaseStudy, type CaseStudy } from './case-study';

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const projects = await dbService.projects.findMany();
  return projects
    .filter((project: { caseStudy?: boolean }) => project.caseStudy)
    .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
    .map((project: unknown) => projectToCaseStudy(project as Parameters<typeof projectToCaseStudy>[0]));
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const project = await dbService.projects.findUnique(slug);
  if (!project || !(project as { caseStudy?: boolean }).caseStudy) return null;
  return projectToCaseStudy(project as Parameters<typeof projectToCaseStudy>[0]);
}

export async function getPublishedBlogPosts() {
  const posts = await dbService.blogPosts.findMany();
  return (Array.isArray(posts) ? posts : []).filter(
    (post: { published?: boolean }) => post.published,
  );
}

export async function getPublishedBlogPost(slug: string) {
  const post = await dbService.blogPosts.findUnique(slug);
  if (!post || !(post as { published?: boolean }).published) return null;
  return post;
}
