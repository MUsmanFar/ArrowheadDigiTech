'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const blogPosts = [
  {
    slug: 'future-of-digital-marketing',
    title: 'The Future of Digital Marketing in 2026',
    excerpt: 'Explore the latest trends and technologies shaping the digital marketing landscape.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Marketing',
    image: 'bg-gradient-to-br from-blue-400 to-cyan-400',
  },
  {
    slug: 'ai-automation-business',
    title: 'How AI Automation is Transforming Business Operations',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way businesses operate.',
    author: 'Michael Chen',
    date: '2024-01-10',
    category: 'Technology',
    image: 'bg-gradient-to-br from-purple-400 to-pink-400',
  },
  {
    slug: 'web-development-best-practices',
    title: 'Web Development Best Practices for 2026',
    excerpt: 'Learn the essential techniques and tools for building modern web applications.',
    author: 'John Smith',
    date: '2024-01-05',
    category: 'Development',
    image: 'bg-gradient-to-br from-green-400 to-emerald-400',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-montserrat">
              Our <span className="text-gradient-blue">Blog</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Insights, trends, and expert perspectives on digital transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">Blog Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                    <div className={`aspect-video ${post.image} rounded-t-xl`} />
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                        <span className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <User size={16} className="mr-1" />
                          {post.author}
                        </span>
                      </div>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mb-2">
                        {post.category}
                      </span>
                      <CardTitle className="group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                        Read More <ArrowRight className="ml-2" size={16} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Stay Updated
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Subscribe to our newsletter for the latest insights
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </motion.div>
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}
