'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  AlertCircle,
  Image as ImageIcon,
  Columns3,
  Grid3X3,
  Play,
  Images,
  Smartphone,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Project {
  id: string;
  slug: string;
  title: string;
}

interface ProjectMedia {
  slug: string;
  homepageFeaturedImage: string | null;
  portfolioFeaturedImage: string | null;
  portfolioGridImage: string | null;
  caseStudyHeroImage: string | null;
  caseStudyGalleryImages: string[];
  mobileScreenshots: string[];
}

const mediaFields: { key: keyof Omit<ProjectMedia, 'slug'>; label: string; icon: React.ReactNode }[] = [
  { key: 'homepageFeaturedImage', label: 'Homepage', icon: <ImageIcon size={14} /> },
  { key: 'portfolioFeaturedImage', label: 'Portfolio', icon: <Columns3 size={14} /> },
  { key: 'portfolioGridImage', label: 'Grid', icon: <Grid3X3 size={14} /> },
  { key: 'caseStudyHeroImage', label: 'Hero', icon: <Play size={14} /> },
  { key: 'caseStudyGalleryImages', label: 'Gallery', icon: <Images size={14} /> },
  { key: 'mobileScreenshots', label: 'Mobile', icon: <Smartphone size={14} /> },
];

function hasMedia(projectMedia: ProjectMedia | undefined, key: keyof Omit<ProjectMedia, 'slug'>): boolean {
  if (!projectMedia) return false;
  const val = projectMedia[key];
  if (Array.isArray(val)) return val.length > 0;
  return !!val;
}

export default function AdminProjectMediaPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [mediaMap, setMediaMap] = useState<Map<string, ProjectMedia>>(new Map());
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, mediaRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/project-media'),
      ]);

      if (!projRes.ok) {
        setError('Failed to fetch projects.');
        return;
      }

      const projData: Project[] = await projRes.json();
      setProjects(projData);

      if (mediaRes.ok) {
        const mediaData: ProjectMedia[] = await mediaRes.json();
        const map = new Map<string, ProjectMedia>();
        mediaData.forEach((m) => map.set(m.slug, m));
        setMediaMap(map);
      }
    } catch (err) {
      setError('An error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-montserrat flex items-center gap-2">
            Project Media <Sparkles className="text-blue-600" size={24} />
          </h1>
          <p className="text-slate-500 font-poppins mt-1">
            Manage images for homepage, portfolio, case studies, and mobile screenshots.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 font-medium">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl border-slate-200 bg-white"
        />
      </div>

      <Card className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Project</th>
                  <th className="py-4 px-6">Slug</th>
                  <th className="py-4 px-6 text-center" colSpan={6}>
                    Media Status
                  </th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                  <th colSpan={2}></th>
                  {mediaFields.map((f) => (
                    <th key={f.key} className="py-2 px-3 text-center">
                      {f.label}
                    </th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <Loader2 className="animate-spin h-8 w-8 mx-auto text-blue-600" />
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 font-poppins">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((project) => {
                    const pm = mediaMap.get(project.slug);
                    return (
                      <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-semibold text-slate-900">
                          {project.title}
                        </td>
                        <td className="py-4 px-6">
                          <code className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                            {project.slug}
                          </code>
                        </td>
                        {mediaFields.map((f) => {
                          const populated = hasMedia(pm, f.key);
                          return (
                            <td key={f.key} className="py-4 px-3 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                                  populated
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-slate-50 text-slate-300'
                                }`}
                                title={`${f.label}: ${populated ? 'Set' : 'Not set'}`}
                              >
                                {f.icon}
                              </span>
                            </td>
                          );
                        })}
                        <td className="py-4 px-6 text-right">
                          <Link href={`/admin/project-media/${project.slug}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 text-blue-600 rounded-lg font-semibold gap-1.5"
                            >
                              <ExternalLink size={14} />
                              Manage Media
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
