import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
    <div className="min-h-screen">
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />
      <Navbar />
      <main id="main-content" className="pt-32 pb-24 px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-8"
          >
            <ArrowLeft size={16} /> Back to blog
          </Link>
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
            <span className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
            </span>
            {post.author && (
              <span className="flex items-center">
                <User size={16} className="mr-1" />
                {post.author}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-montserrat">
            {post.title}
          </h1>
          <p className="text-xl text-slate-600 mb-10">{post.excerpt}</p>
          {post.coverImage && (
            <div
              className="aspect-video rounded-xl bg-cover bg-center mb-10"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
          )}
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(post.content) }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
