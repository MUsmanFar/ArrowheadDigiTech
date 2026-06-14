'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Sparkles, AlertCircle, Eye, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  clientName?: string;
  industry?: string;
  thumbnail?: string;
  featured: boolean;
  metrics?: string;
  testimonialId?: string;
  caseStudy: boolean;
  order: number;
}

interface Testimonial {
  id: string;
  name: string;
  company?: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [industry, setIndustry] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [metrics, setMetrics] = useState('');
  const [testimonialId, setTestimonialId] = useState('');
  const [caseStudy, setCaseStudy] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, testRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/testimonials')
      ]);

      if (projRes.ok && testRes.ok) {
        const projData = await projRes.json();
        const testData = await testRes.json();
        setProjects(projData);
        setTestimonials(testData);
      } else {
        setError('Failed to fetch data.');
      }
    } catch (err) {
      setError('An error occurred while loading projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setClientName('');
    setIndustry('');
    setThumbnail('');
    setMetrics('');
    setTestimonialId('');
    setCaseStudy(true);
    setFeatured(false);
    setOrder(projects.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setSlug(project.slug);
    setDescription(project.description);
    setClientName(project.clientName || '');
    setIndustry(project.industry || '');
    setThumbnail(project.thumbnail || '');
    setMetrics(project.metrics || '');
    setTestimonialId(project.testimonialId || '');
    setCaseStudy(project.caseStudy);
    setFeatured(project.featured);
    setOrder(project.order);
    setIsModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    if (!editingId) {
      setSlug(
        value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      slug,
      description,
      clientName,
      industry,
      thumbnail,
      metrics,
      testimonialId: testimonialId || null,
      caseStudy,
      featured,
      order: Number(order),
    };

    try {
      let res;
      if (editingId) {
        res = await fetch('/api/admin/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
      } else {
        res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save project.');
      }
    } catch (err) {
      setError('An error occurred while saving.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchData();
      } else {
        setError('Failed to delete project.');
      }
    } catch (err) {
      setError('An error occurred during deletion.');
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.clientName && p.clientName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-montserrat flex items-center gap-2">
            Case Studies & Portfolio <Sparkles className="text-blue-600" size={24} />
          </h1>
          <p className="text-slate-500 font-poppins mt-1">Manage corporate case studies and digital agency portfolio items.</p>
        </div>
        <Button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 px-6 font-semibold flex items-center gap-2">
          <Plus size={18} />
          Add Project
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 font-medium">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl border-slate-200 bg-white"
        />
      </div>

      {/* Projects List */}
      <Card className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Order</th>
                  <th className="py-4 px-6">Thumbnail</th>
                  <th className="py-4 px-6">Project Name</th>
                  <th className="py-4 px-6">Client / Industry</th>
                  <th className="py-4 px-6">Featured</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
                    </td>
                  </tr>
                ) : filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 font-poppins">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold">{project.order}</td>
                      <td className="py-4 px-6">
                        {project.thumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={project.thumbnail} 
                            alt={project.title} 
                            className="w-12 h-10 object-cover rounded-lg border border-slate-100 shadow-sm" 
                          />
                        ) : (
                          <div className="w-12 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] text-slate-400">No Image</div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900">{project.title}</div>
                        <div className="text-xs text-slate-500 font-mono">{project.slug}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium">{project.clientName || 'N/A'}</div>
                        <div className="text-xs text-slate-400 font-poppins">{project.industry || 'N/A'}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          project.featured 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {project.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditModal(project)}
                          className="hover:bg-blue-50 text-blue-600 rounded-lg"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(project.id)}
                          className="hover:bg-red-50 text-red-600 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Drawer */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 font-montserrat">
                    {editingId ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <p className="text-xs text-slate-500 font-poppins mt-0.5">
                    {editingId ? 'Modify existing portfolio project and case studies.' : 'Fill in the fields to append a new project.'}
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Project Name</label>
                    <Input value={title} onChange={handleTitleChange} placeholder="e.g. YalaRide Mobility" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Slug</label>
                    <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. yalaride" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Client Name</label>
                    <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. YalaRide Ltd" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Industry</label>
                    <Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. Transportation" />
                  </div>
                </div>

                {/* File Upload / Image Picker */}
                <ImageUploadField 
                  value={thumbnail} 
                  onChange={setThumbnail} 
                  label="Project Thumbnail" 
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Key Metrics</label>
                    <Input value={metrics} onChange={(e) => setMetrics(e.target.value)} placeholder="e.g. 50K+ Downloads, 4.8 Rating" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Display Order</label>
                    <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} required />
                  </div>
                  <div className="flex flex-col gap-2.5 pt-4">
                    <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={featured} 
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-semibold text-slate-700">Featured Portfolio</span>
                    </label>
                    <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={caseStudy} 
                        onChange={(e) => setCaseStudy(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 border-slate-300"
                      />
                      <span className="text-sm font-semibold text-slate-700">Case Study Details</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Linked Client Testimonial</label>
                  <select
                    value={testimonialId}
                    onChange={(e) => setTestimonialId(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                  >
                    <option value="">-- No Testimonial --</option>
                    {testimonials.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.company || 'N/A'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Short Description / Summary</label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Provide a detailed summary of the challenge, solution, and results..."
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-2xl">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-xl font-semibold">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-semibold shadow-sm">
                    {editingId ? 'Save Changes' : 'Create Project'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
