'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Sparkles, AlertCircle, Save, ArrowLeft, Image as ImageIcon, Plus, X, Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

interface Project {
  id: string;
  slug: string;
  title: string;
}

interface ProjectMedia {
  id?: string;
  slug: string;
  homepageFeaturedImage: string;
  portfolioFeaturedImage: string;
  portfolioGridImage: string;
  caseStudyHeroImage: string;
  caseStudyGalleryImages: string[];
  mobileScreenshots: string[];
}

const emptyMedia = (slug: string): ProjectMedia => ({
  slug,
  homepageFeaturedImage: '',
  portfolioFeaturedImage: '',
  portfolioGridImage: '',
  caseStudyHeroImage: '',
  caseStudyGalleryImages: [],
  mobileScreenshots: [],
});

function ArrayImageUpload({
  images,
  onChange,
  subdir,
  label,
  helperText,
}: {
  images: string[];
  onChange: (urls: string[]) => void;
  subdir: string;
  label: string;
  helperText: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subdir', subdir);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        onChange([...images, data.url]);
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const handleMoveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...images];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  };

  const handleMoveDown = (idx: number) => {
    if (idx === images.length - 1) return;
    const next = [...images];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
        <span className="text-[10px] text-slate-400">{helperText}</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {images.map((url, idx) => (
          <div key={idx} className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`${label} ${idx + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
              <button onClick={() => handleMoveUp(idx)} disabled={idx === 0} className="w-6 h-6 rounded-full bg-white/90 text-slate-700 text-xs font-bold hover:bg-white disabled:opacity-30">&#8593;</button>
              <button onClick={() => handleMoveDown(idx)} disabled={idx === images.length - 1} className="w-6 h-6 rounded-full bg-white/90 text-slate-700 text-xs font-bold hover:bg-white disabled:opacity-30">&#8595;</button>
              <button onClick={() => handleRemove(idx)} className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold hover:bg-red-600"><X size={12} /></button>
            </div>
          </div>
        ))}
        <label className="relative aspect-[4/3] rounded-lg border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/10 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[100px]">
          {uploading ? (
            <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
          ) : (
            <>
              <Plus size={20} className="text-slate-400" />
              <span className="text-[10px] text-slate-400 mt-1">Add Image</span>
            </>
          )}
          <input type="file" accept="image/*" onChange={handleAdd} className="hidden" />
        </label>
      </div>
    </div>
  );
}

export default function AdminProjectMediaSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [media, setMedia] = useState<ProjectMedia>(emptyMedia(slug));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [projRes, mediaRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/project-media'),
      ]);

      if (projRes.ok) {
        const projects: Project[] = await projRes.json();
        const found = projects.find((p) => p.slug === slug);
        if (found) setProject(found);
        else setError('Project not found.');
      }

      if (mediaRes.ok) {
        const allMedia: ProjectMedia[] = await mediaRes.json();
        const found = allMedia.find((m) => m.slug === slug);
        if (found) setMedia(found);
      }
    } catch (err) {
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const payload = { ...media };
      ['homepageFeaturedImage', 'portfolioFeaturedImage', 'portfolioGridImage', 'caseStudyHeroImage'].forEach((key) => {
        if (!(payload as any)[key]) (payload as any)[key] = null;
      });

      const res = await fetch('/api/admin/project-media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess('Media saved successfully.');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to save.');
      }
    } catch (err) {
      setError('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof ProjectMedia, value: any) => {
    setMedia((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl flex items-center gap-3 font-medium">
          <AlertCircle size={24} />
          <span>Project &quot;{slug}&quot; not found.</span>
        </div>
        <Button variant="outline" onClick={() => router.push('/admin/project-media')} className="rounded-xl">
          <ArrowLeft size={16} className="mr-2" /> Back to Project Media
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push('/admin/project-media')} className="rounded-xl text-slate-500">
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-montserrat flex items-center gap-2">
              {project.title} <Sparkles className="text-blue-600" size={24} />
            </h1>
            <p className="text-slate-500 font-poppins text-sm mt-0.5">/{project.slug}</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-5 font-semibold shadow-sm flex items-center gap-2">
          <Save size={18} />
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 font-medium">
          <AlertCircle size={20} /> <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl flex items-center gap-2 font-medium">
          <Sparkles size={20} /> <span>{success}</span>
        </div>
      )}

      <div className="space-y-5">
        <Card className="border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-5">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ImageIcon size={18} className="text-blue-600" /> Hero &amp; Featured Images
            </CardTitle>
            <CardDescription>Recommended formats: WEBP, max 5MB each.</CardDescription>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <ImageUploadField
              value={media.homepageFeaturedImage}
              onChange={(v) => updateField('homepageFeaturedImage', v)}
              label="Homepage Featured Image"
              helperText="1920x1080 WebP — displayed on the homepage hero section"
              subdir={`projects/${slug}`}
            />
            <div className="grid md:grid-cols-2 gap-5">
              <ImageUploadField
                value={media.portfolioFeaturedImage}
                onChange={(v) => updateField('portfolioFeaturedImage', v)}
                label="Portfolio Featured Image"
                helperText="1600x900 WebP"
                subdir={`projects/${slug}`}
              />
              <ImageUploadField
                value={media.portfolioGridImage}
                onChange={(v) => updateField('portfolioGridImage', v)}
                label="Portfolio Grid Image"
                helperText="1200x675 WebP"
                subdir={`projects/${slug}`}
              />
            </div>
            <ImageUploadField
              value={media.caseStudyHeroImage}
              onChange={(v) => updateField('caseStudyHeroImage', v)}
              label="Case Study Hero Image"
              helperText="1920x1080 WebP"
              subdir={`projects/${slug}`}
            />
          </CardContent>
        </Card>

        <Card className="border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-5">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ImageIcon size={18} className="text-blue-600" /> Case Study Gallery
            </CardTitle>
            <CardDescription>Multiple images displayed in the case study detail page. Drag to reorder.</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <ArrayImageUpload
              images={media.caseStudyGalleryImages}
              onChange={(v) => updateField('caseStudyGalleryImages', v)}
              subdir={`projects/${slug}`}
              label="Gallery Images"
              helperText="1440x900 or 1600x1000 WebP"
            />
          </CardContent>
        </Card>

        <Card className="border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-5">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ImageIcon size={18} className="text-blue-600" /> Mobile Screenshots
            </CardTitle>
            <CardDescription>Screenshots for mobile app projects. Drag to reorder.</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <ArrayImageUpload
              images={media.mobileScreenshots}
              onChange={(v) => updateField('mobileScreenshots', v)}
              subdir={`projects/${slug}`}
              label="Mobile Screenshots"
              helperText="1290x2796 WebP"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
