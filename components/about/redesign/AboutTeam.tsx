'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSiteSection } from '@/lib/use-site-content';
import { SectionHeading, GlassCard } from '@/components/design-system';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  image?: string | null;
  order: number;
}

export default function AboutTeam() {
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
    <section className="hercules-section-alt py-20 md:py-28" aria-label="Team">
      <div className="container-premium">
        <SectionHeading badge="People" title={labels.teamHeadline} className="mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassCard hover className="p-8 h-full">
                <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-slate-100 mb-6 border border-white shadow-sm">
                  {member.image ? (
                    <Image src={member.image} alt={member.name} fill sizes="80px" className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-500 font-poppins">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold font-poppins text-slate-900">{member.name}</h3>
                <p className="text-sm font-montserrat font-semibold text-orange-600 mt-1">{member.role}</p>
                {member.bio && (
                  <p className="mt-4 text-sm text-slate-500 font-montserrat leading-relaxed">{member.bio}</p>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
