'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon?: string;
  thumbnail?: string;
  problem?: string;
  solution?: string;
  process?: string;
  benefits?: string;
  deliverables?: string;
  featured: boolean;
  order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('💻');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [processVal, setProcessVal] = useState('');
  const [benefits, setBenefits] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [thumbnail, setThumbnail] = useState('');

  // Fetch all services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      } else {
        setError('Failed to fetch services.');
      }
    } catch (err) {
      setError('An error occurred while fetching services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setIcon('💻');
    setProblem('');
    setSolution('');
    setProcessVal('');
    setBenefits('');
    setDeliverables('');
    setFeatured(false);
    setOrder(services.length + 1);
    setThumbnail('');
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingId(service.id);
    setTitle(service.title);
    setSlug(service.slug);
    setDescription(service.description);
    setIcon(service.icon || '💻');
    setProblem(service.problem || '');
    setSolution(service.solution || '');
    setProcessVal(service.process || '');
    setBenefits(service.benefits || '');
    setDeliverables(service.deliverables || '');
    setFeatured(service.featured);
    setOrder(service.order);
    setThumbnail(service.thumbnail || '');
    setIsModalOpen(true);
  };

  // Auto-generate slug from title
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
      icon,
      thumbnail: thumbnail || undefined,
      problem,
      solution,
      process: processVal,
      benefits,
      deliverables,
      featured,
      order: Number(order),
    };

    try {
      let res;
      if (editingId) {
        res = await fetch('/api/admin/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
      } else {
        res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchServices();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save service.');
      }
    } catch (err) {
      setError('An error occurred while saving.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchServices();
      } else {
        setError('Failed to delete service.');
      }
    } catch (err) {
      setError('An error occurred during deletion.');
    }
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-montserrat flex items-center gap-2">
            Services Catalog <Sparkles className="text-blue-600" size={24} />
          </h1>
          <p className="text-slate-500 font-poppins mt-1">Manage the digital services offered on your website.</p>
        </div>
        <Button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 px-6 font-semibold flex items-center gap-2">
          <Plus size={18} />
          Add Service
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
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl border-slate-200 bg-white"
        />
      </div>

      {/* Services List */}
      <Card className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Order</th>
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Slug</th>
                  <th className="py-4 px-6">Featured</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
                    </td>
                  </tr>
                ) : filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-poppins">
                      No services found.
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold">{service.order}</td>
                      <td className="py-4 px-6 font-medium">
                        <span className="mr-2 text-lg">{service.icon}</span>
                        {service.title}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs">{service.slug}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          service.featured 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {service.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditModal(service)}
                          className="hover:bg-blue-50 text-blue-600 rounded-lg"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(service.id)}
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

      {/* Add / Edit Modal Drawer */}
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
                    {editingId ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <p className="text-xs text-slate-500 font-poppins mt-0.5">
                    {editingId ? 'Modify existing catalog parameters.' : 'Fill in the fields to append a new service.'}
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Service Title</label>
                    <Input value={title} onChange={handleTitleChange} placeholder="e.g. App Development" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Slug</label>
                    <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. app-development" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Icon (Emoji / unicode)</label>
                    <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="e.g. 💻" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Display Order</label>
                    <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} required />
                  </div>
                  <div className="flex items-center pt-5">
                    <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={featured} 
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-semibold text-slate-700">Featured Service</span>
                    </label>
                  </div>
                </div>

                <div>
                  <ImageUploadField
                    value={thumbnail}
                    onChange={setThumbnail}
                    label="Service Thumbnail"
                    helperText="Recommended: 1200x800 WebP. Max 5MB."
                    subdir="services"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Brief Description</label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Short summary displayed on cards..."
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-1 mt-2">Detail Page Contents (SQL columns)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">The Problem Statement</label>
                    <textarea 
                      value={problem} 
                      onChange={(e) => setProblem(e.target.value)}
                      rows={2}
                      placeholder="What issues do clients face?"
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Our Solution</label>
                    <textarea 
                      value={solution} 
                      onChange={(e) => setSolution(e.target.value)}
                      rows={2}
                      placeholder="How does our service fix it?"
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Process Steps (Comma / Arrow separated)</label>
                  <Input value={processVal} onChange={(e) => setProcessVal(e.target.value)} placeholder="e.g. Planning -> Design -> Development -> Release" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Benefits (Comma separated)</label>
                    <textarea 
                      value={benefits} 
                      onChange={(e) => setBenefits(e.target.value)}
                      rows={2}
                      placeholder="e.g. Faster speeds, Lower costs, 24/7 uptime"
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Deliverables (Comma separated)</label>
                    <textarea 
                      value={deliverables} 
                      onChange={(e) => setDeliverables(e.target.value)}
                      rows={2}
                      placeholder="e.g. Vector logo, Figma source, React code, Analytics report"
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-2xl">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-xl font-semibold">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-semibold shadow-sm">
                    {editingId ? 'Save Changes' : 'Create Service'}
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
