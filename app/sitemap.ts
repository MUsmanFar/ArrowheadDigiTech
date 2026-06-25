import { MetadataRoute } from 'next';
import { getCaseStudies, getPublishedBlogPosts } from '@/lib/cms-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://arrowheaddigitech.com';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/case-studies',
    '/pricing',
    '/contact',
    '/faq',
    '/blog',
    '/careers',
    '/testimonials',
    '/privacy-policy',
    '/terms-and-conditions',
  ];

  const [studies, posts] = await Promise.all([getCaseStudies(), getPublishedBlogPosts()]);

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const caseStudyEntries = studies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogEntries = posts.map((post: { slug: string; updatedAt?: string | Date }) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...caseStudyEntries, ...blogEntries];
}
