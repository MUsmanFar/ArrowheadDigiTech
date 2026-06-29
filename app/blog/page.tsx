'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageShell, PageHero } from '@/components/hercules';
import GlassCard from '@/components/hercules/ui/GlassCard';
import Reveal from '@/components/hercules/ui/Reveal';
import SafeImage from '@/components/ui/SafeImage';
import { useSiteSection } from '@/lib/use-site-content';

const imageGradients = [
  'from-blue-100 to-cyan-100',
  'from-orange-100 to-amber-100',
  'from-violet-100 to-purple-100',
];

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  createdAt: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { section: page } = useSiteSection('blog.page');

  useEffect(() => {
    fetch('/api/public/blog')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setBlogPosts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <PageShell>
      <Navbar />
      <main id="main-content">
        <PageHero
          title={page.heroTitle}
          titleAccent={page.heroTitleAccent}
          description={page.heroDescription}
          align="center"
          size="large"
        />

        <section className="pb-24">
          <div className="container-premium">
            {blogPosts.length === 0 ? (
              <p className="py-12 text-center font-montserrat text-slate-500">No blog posts yet.</p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post, index) => (
                  <Reveal key={post.id} delay={index * 60}>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <GlassCard hover className="h-full overflow-hidden">
                        <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${imageGradients[index % 3]}`}>
                          {post.coverImage ? (
                            <SafeImage
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : null}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 font-montserrat text-xs text-slate-400">
                            {post.author && (
                              <span className="inline-flex items-center gap-1">
                                <User size={12} /> {post.author}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="mt-3 font-poppins text-xl font-bold text-slate-900 transition-colors group-hover:text-[#e46f1e]">
                            {post.title}
                          </h3>
                          <p className="mt-2 line-clamp-3 font-montserrat text-sm leading-relaxed text-slate-500">
                            {post.excerpt}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1 font-montserrat text-sm font-semibold text-[#e46f1e]">
                            Read more <ArrowRight size={14} />
                          </span>
                        </div>
                      </GlassCard>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </PageShell>
  );
}
