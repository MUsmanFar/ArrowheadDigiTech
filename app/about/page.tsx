'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Zap, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on delivering measurable outcomes that drive real business growth.',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our success. We build long-term partnerships based on trust.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards of quality in everything we deliver.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We stay ahead of the curve with cutting-edge technologies and strategies.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'We bring worldwide expertise to help you compete on a global scale.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love what we do, and it shows in every project we undertake.',
  },
];

const team = [
  {
    name: 'John Smith',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in digital transformation.',
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO',
    bio: 'Tech expert specializing in scalable architecture and AI solutions.',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Marketing',
    bio: 'Digital marketing strategist with proven ROI track record.',
  },
  {
    name: 'Emily Davis',
    role: 'Creative Director',
    bio: 'Award-winning designer with a passion for user experience.',
  },
];

export default function AboutPage() {
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
              About <span className="text-gradient-blue">Arrowhead DigiTech</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              We&apos;re a team of passionate digital experts dedicated to helping businesses thrive in the digital age
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white/50 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-8 font-montserrat">Our Story</h2>
            <p className="text-slate-600 mb-6">
              Founded with a vision to revolutionize digital experiences, Arrowhead DigiTech has grown from a small startup to a leading digital agency. Our journey began with a simple belief: every business deserves exceptional digital solutions that drive real results.
            </p>
            <p className="text-slate-600 mb-6">
              Over the years, we&apos;ve helped hundreds of businesses across various industries transform their digital presence. From startups to enterprises, we&apos;ve partnered with organizations of all sizes to deliver innovative solutions that exceed expectations.
            </p>
            <p className="text-slate-600">
              Today, we continue to push boundaries, embrace new technologies, and deliver excellence in everything we do. Our commitment to our clients&apos; success remains unwavering, and we&apos;re excited about the future of digital possibilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-montserrat">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6 text-center">
                    <value.icon className="mx-auto mb-4 text-blue-600" size={40} />
                    <h3 className="font-semibold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white/50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-montserrat">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The talented people behind our success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mx-auto mb-4" />
                    <h3 className="font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                    <p className="text-slate-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
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
            Want to Join Our Team?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We&apos;re always looking for talented individuals to join our growing team
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              View Open Positions
            </Button>
          </motion.div>
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}
