'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSiteSection } from '@/lib/use-site-content';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  image?: string | null;
  order: number;
}

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const { section: labels } = useSiteSection('about.section-labels');

  useEffect(() => {
    fetch('/api/public/team')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setMembers([...data].sort((a, b) => a.order - b.order));
        }
      })
      .catch(() => {});
  }, []);

  if (members.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-slate-50 border-b border-slate-100" aria-label="Team">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins tracking-tight">
            {labels.teamHeadline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden relative bg-slate-100 mb-4">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-bold text-slate-500">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 font-poppins">{member.name}</h3>
              <p className="text-sm text-orange-600 font-medium mb-3">{member.role}</p>
              {member.bio && (
                <p className="text-sm text-slate-600 font-inter leading-relaxed">{member.bio}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
