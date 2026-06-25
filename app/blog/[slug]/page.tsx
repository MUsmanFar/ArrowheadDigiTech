import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPublishedBlogPost } from '@/lib/cms-server';
import { sanitizeRichHtml } from '@/lib/sanitize';
import { Calendar, User, ArrowLeft } from 'lucide-react';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { getPublishedBlogPosts } = await import('@/lib/cms-server');
  const posts = await getPublishedBlogPosts();
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPublishedBlogPost((await params).slug);
  return post
    ? { title: `${post.title} | Arrowhead DigiTech Blog`, description: post.excerpt }
    : {};
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen">
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
