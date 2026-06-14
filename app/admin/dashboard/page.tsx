'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Users, Layers, TrendingUp, Sparkles, Clock, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [servicesCount, setServicesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [leadsRes, servicesRes, projectsRes] = await Promise.all([
          fetch('/api/admin/leads'),
          fetch('/api/admin/services'),
          fetch('/api/admin/projects'),
        ]);

        if (leadsRes.ok && servicesRes.ok && projectsRes.ok) {
          const leadsData = await leadsRes.json();
          const servicesData = await servicesRes.json();
          const projectsData = await projectsRes.json();

          setLeads(leadsData);
          setServicesCount(servicesData.length);
          setProjectsCount(projectsData.length);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const stats = [
    { title: 'Total Leads', value: leads.length.toString(), change: 'Live', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Case Projects', value: projectsCount.toString(), change: 'Live', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Services Catalog', value: servicesCount.toString(), change: 'Live', icon: Layers, color: 'text-violet-600', bg: 'bg-violet-50' },
    { title: 'Active Channels', value: '13', change: 'Fixed', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 lg:p-8 text-white shadow-xl shadow-blue-100">
        <div>
          <h1 className="text-3xl font-bold font-montserrat flex items-center gap-2">
            Welcome to the Console <Sparkles size={24} className="text-yellow-300 animate-pulse" />
          </h1>
          <p className="text-blue-100 mt-2 font-poppins">Here is a real-time summary of Arrowhead DigiTech digital activities and inbound inquiries.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border border-slate-100 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded-full">{stat.change}</span>
                  </div>
                  <div className="text-4xl font-extrabold text-slate-900 tracking-tight mb-1">{stat.value}</div>
                  <div className="text-slate-500 font-medium text-sm font-poppins">{stat.title}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border border-slate-100 rounded-2xl shadow-sm">
          <CardHeader className="pb-4 border-b border-slate-50">
            <CardTitle className="text-xl font-bold text-slate-800 font-montserrat">Recent Inbound Leads</CardTitle>
            <CardDescription className="font-poppins">Latest inquiries received from the contact form</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {leads.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                <p>No leads received yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2 first:pt-0 last:pb-0">
                    <div>
                      <div className="font-semibold text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-500 font-medium font-poppins mt-0.5">
                        {lead.email} {lead.company ? `• ${lead.company}` : ''}
                      </div>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2 italic font-serif">&ldquo;{lead.message}&rdquo;</p>
                    </div>
                    <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                        {lead.service || 'General'}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center font-poppins">
                        <Clock size={12} className="mr-1" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
