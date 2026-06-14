'use client';

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, AlertCircle, MessageSquare, Clock, Eye, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      } else {
        setError('Failed to fetch leads.');
      }
    } catch (err) {
      setError('An error occurred while fetching leads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        fetchLeads();
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      } else {
        setError('Failed to update lead status.');
      }
    } catch (err) {
      setError('Error updating status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSelectedLead(null);
        fetchLeads();
      } else {
        setError('Failed to delete lead.');
      }
    } catch (err) {
      setError('An error occurred during deletion.');
    }
  };

  const filteredLeads = leads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    (l.company && l.company.toLowerCase().includes(search.toLowerCase())) ||
    (l.service && l.service.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'contacted':
        return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'closed':
        return 'bg-slate-100 text-slate-500 border border-slate-200';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-montserrat flex items-center gap-2">
          Inbound Leads <Sparkles className="text-blue-600" size={24} />
        </h1>
        <p className="text-slate-500 font-poppins mt-1">Review contact inquiries and update customer pipelines.</p>
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
          placeholder="Search leads by name, email, company, service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl border-slate-200 bg-white"
        />
      </div>

      {/* Leads List */}
      <Card className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Company / Info</th>
                  <th className="py-4 px-6">Service</th>
                  <th className="py-4 px-6">Status</th>
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
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 font-poppins">
                      No inbound leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 text-xs text-slate-400 font-poppins">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.email}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium">{lead.company || 'Individual'}</div>
                        <div className="text-xs text-slate-400">{lead.phone || 'No phone'}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                          {lead.service || 'General'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadge(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedLead(lead)}
                          className="hover:bg-blue-50 text-blue-600 rounded-lg"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(lead.id)}
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

      {/* Details View Drawer / Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex items-center space-x-2">
                  <MessageSquare size={20} className="text-blue-600" />
                  <h2 className="text-lg font-bold text-slate-800 font-montserrat">Lead Detail View</h2>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-4 text-slate-700">
                <div className="grid grid-cols-2 gap-4 border-b border-slate-50 pb-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sender Name</label>
                    <p className="font-semibold text-slate-900">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <p className="font-semibold text-slate-900 truncate">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</label>
                    <p className="text-sm font-medium">{selectedLead.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company</label>
                    <p className="text-sm font-medium">{selectedLead.company || 'Not provided'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-slate-50 pb-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Requested Service</label>
                    <div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 inline-block mt-1">
                        {selectedLead.service || 'General Inbound'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Received Date</label>
                    <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                      <Clock size={14} className="text-slate-400" />
                      {new Date(selectedLead.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Message</label>
                  <div className="mt-1.5 p-4 bg-slate-50 rounded-xl text-slate-800 text-sm leading-relaxed border border-slate-100 whitespace-pre-wrap italic font-serif">
                    &ldquo;{selectedLead.message}&rdquo;
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Update Lead Pipeline State</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['new', 'contacted', 'closed'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleStatusChange(selectedLead.id, status)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-200 flex items-center gap-1 border ${
                          selectedLead.status === status
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {selectedLead.status === status && <CheckCircle2 size={12} />}
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between rounded-b-2xl">
                <Button 
                  variant="ghost" 
                  onClick={() => handleDelete(selectedLead.id)} 
                  className="text-red-600 hover:bg-red-50 rounded-xl"
                >
                  Delete
                </Button>
                <Button 
                  onClick={() => setSelectedLead(null)} 
                  className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
