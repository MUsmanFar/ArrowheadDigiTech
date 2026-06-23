'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Sparkles, AlertCircle, Building2, Globe, MoveVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

interface ClientLogo {
  id: string;
  logo: string;
  companyName: string;
  websiteUrl: string;
  sortOrder: number;
}

export default function AdminClientLogosPage() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [logo, setLogo] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(0);

  const fetchLogos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/client-logos');
      if (res.ok) {
        const data = await res.json();
        setLogos(data);
      } else {
        setError('Failed to fetch client logos.');
      }
    } catch (err) {
      setError('An error occurred while fetching logos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setLogo('');
    setCompanyName('');
    setWebsiteUrl('');
    setSortOrder(logos.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (l: ClientLogo) => {
    setEditingId(l.id);
    setLogo(l.logo);
    setCompanyName(l.companyName);
    setWebsiteUrl(l.websiteUrl);
    setSortOrder(l.sortOrder);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      logo,
      companyName,
      websiteUrl,
      sortOrder: Number(sortOrder),
    };

    try {
      let res;
      if (editingId) {
        res = await fetch('/api/admin/client-logos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
      } else {
        res = await fetch('/api/admin/client-logos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchLogos();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save client logo.');
      }
    } catch (err) {
      setError('An error occurred while saving.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client logo?')) return;
    try {
      const res = await fetch(`/api/admin/client-logos?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchLogos();
      } else {
        setError('Failed to delete client logo.');
      }
    } catch (err) {
      setError('An error occurred during deletion.');
    }
  };

  const filteredLogos = logos.filter((l) =>
    l.companyName.toLowerCase().includes(search.toLowerCase()) ||
    (l.websiteUrl && l.websiteUrl.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-montserrat flex items-center gap-2">
            Client Logos <Sparkles className="text-blue-600" size={24} />
          </h1>
          <p className="text-slate-500 font-poppins mt-1">Manage partner and client logos displayed on the website.</p>
        </div>
        <Button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 px-6 font-semibold flex items-center gap-2">
          <Plus size={18} />
          Add Logo
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
          placeholder="Search logos by company name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl border-slate-200 bg-white"
        />
      </div>

      {/* Logos Table */}
      <Card className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <MoveVertical size={12} />
                      Order
                    </div>
                  </th>
                  <th className="py-4 px-6">Logo</th>
                  <th className="py-4 px-6">Company Name</th>
                  <th className="py-4 px-6">Website URL</th>
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
                ) : filteredLogos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-poppins">
                      No client logos found.
                    </td>
                  </tr>
                ) : (
                  filteredLogos.sort((a, b) => a.sortOrder - b.sortOrder).map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold">{l.sortOrder}</td>
                      <td className="py-4 px-6">
                        {l.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={l.logo} alt={l.companyName} className="w-12 h-12 object-contain rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm" />
                        ) : (
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-sm">
                            <Building2 size={20} />
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-900">{l.companyName}</td>
                      <td className="py-4 px-6">
                        {l.websiteUrl ? (
                          <a href={l.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
                            <Globe size={14} />
                            {l.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          </a>
                        ) : (
                          <span className="text-sm text-slate-300">N/A</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(l)}
                          className="hover:bg-blue-50 text-blue-600 rounded-lg"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(l.id)}
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
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 font-montserrat">
                    {editingId ? 'Edit Client Logo' : 'Add Client Logo'}
                  </h2>
                  <p className="text-xs text-slate-500 font-poppins mt-0.5">
                    {editingId ? 'Modify the logo and company details.' : 'Upload a new partner or client logo.'}
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
                <ImageUploadField
                  value={logo}
                  onChange={setLogo}
                  label="Company Logo"
                  helperText="Recommended: 800x400 transparent PNG"
                  subdir="logos"
                />

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Company Name</label>
                  <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Acme Corp" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Website URL</label>
                    <Input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Sort Order</label>
                    <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} required />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-2xl">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-xl font-semibold">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-semibold shadow-sm">
                    {editingId ? 'Save Changes' : 'Add Logo'}
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
