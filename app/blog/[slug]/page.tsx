import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageShell } from '@/components/hercules';
import GlassCard from '@/components/hercules/ui/GlassCard';
import SafeImage from '@/components/ui/SafeImage';
import { getPublishedBlogPost } from '@/lib/cms-server';
import { sanitizeRichHtml } from '@/lib/sanitize';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { pageMetadata, siteBaseUrl } from '@/lib/page-metadata';
import JsonLd, { breadcrumbJsonLd } from '@/components/seo/JsonLd';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { getPublishedBlogPosts } = await import('@/lib/cms-server');
  const posts = await getPublishedBlogPosts();
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPublishedBlogPost(slug);
  if (!post) {
    return pageMetadata({
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    ogType: 'article',
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) notFound();

  const baseUrl = siteBaseUrl();
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: { '@type': 'Person', name: post.author || 'Arrowhead DigiTech' },
    publisher: {
      '@type': 'Organization',
      name: 'Arrowhead DigiTech',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/icon` },
    },
    mainEntityOfPage: `${baseUrl}/blog/${slug}`,
    ...(post.coverImage ? { image: post.coverImage } : {}),
  };

  return (
    <PageShell>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />
      <Navbar />
      <main id="main-content" className="pt-28 pb-24">
        <article className="container-premium max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 font-montserrat text-sm text-slate-500 transition-colors hover:text-[#e46f1e]"
          >
            <ArrowLeft size={16} /> Back to blog
          </Link>

          <GlassCard padding="lg" className="overflow-hidden md:p-12">
            {post.coverImage && (
              <div className="relative -mx-8 -mt-8 mb-8 aspect-video overflow-hidden md:-mx-12 md:-mt-12">
                <SafeImage
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 font-montserrat text-sm text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Calendar size={16} />
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
              </span>
              {post.author && (
                <span className="inline-flex items-center gap-1">
                  <User size={16} />
                  {post.author}
                </span>
              )}
            </div>

            <h1 className="mt-6 font-poppins text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 font-montserrat text-lg leading-relaxed text-slate-500">{post.excerpt}</p>

            <div
              className="prose prose-slate mt-10 max-w-none font-montserrat"
              dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(post.content) }}
            />
          </GlassCard>
        </article>
      </main>
      <Footer />
    </PageShell>
  );
}
