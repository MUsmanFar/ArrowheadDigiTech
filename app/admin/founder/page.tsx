'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, AlertCircle, Save, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

interface Founder {
  id: string;
  name: string;
  position: string;
  biography: string;
  photo: string;
}

export default function AdminFounderPage() {
  const [founder, setFounder] = useState<Founder | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [biography, setBiography] = useState('');
  const [photo, setPhoto] = useState('');

  const fetchFounder = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/founders');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const f = data[0];
          setFounder(f);
          setName(f.name);
          setPosition(f.position);
          setBiography(f.biography || '');
          setPhoto(f.photo || '');
        }
      } else {
        setError('Failed to fetch founder data.');
      }
    } catch (err) {
      setError('An error occurred while fetching founder.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFounder();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = { name, position, biography, photo };

    try {
      let res;
      if (founder) {
        res = await fetch('/api/admin/founders', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: founder.id, ...payload }),
        });
      } else {
        res = await fetch('/api/admin/founders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          if (data.length > 0) setFounder(data[0]);
        } else {
          setFounder(data);
        }
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save founder.');
      }
    } catch (err) {
      setError('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-montserrat flex items-center gap-2">
          Founder Profile <Sparkles className="text-blue-600" size={24} />
        </h1>
        <p className="text-slate-500 font-poppins mt-1">Manage the company founder information displayed on the about page.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 font-medium">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <Card className="border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
          <CardTitle className="text-xl font-bold text-slate-800 font-montserrat flex items-center gap-2">
            <UserCircle size={22} className="text-blue-600" />
            {founder ? 'Edit Founder' : 'Add Founder'}
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 font-poppins">
            {founder ? 'Update the founder profile details below.' : 'Fill in the details to create a founder profile.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Arrowhead" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Position / Title</label>
                <Input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Founder & CEO" required />
              </div>
            </div>

            <ImageUploadField
              value={photo}
              onChange={setPhoto}
              label="Founder Photo"
              helperText="Recommended: 1200x1500 WebP portrait photo"
              subdir="founder"
            />

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Biography</label>
              <textarea
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                rows={6}
                placeholder="Tell the founder's story, background, and vision..."
                className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-5 font-semibold shadow-sm flex items-center gap-2"
              >
                <Save size={18} />
                {saving ? 'Saving...' : founder ? 'Save Changes' : 'Create Founder'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
