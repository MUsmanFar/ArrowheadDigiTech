'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, RefreshCw, AlertCircle, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  subdir?: string;
}

export function ImageUploadField({
  value,
  onChange,
  label = 'Upload Image',
  helperText = 'Recommended: PNG, JPG, WEBP or GIF. Max 5MB.',
  subdir,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    // 1. Client-Side Validation
    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setError('File is too large. Max allowed size is 5MB.');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Unsupported file type. Please upload a JPEG, PNG, WEBP, or GIF image.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (subdir) formData.append('subdir', subdir);

      // Replace: remove previous managed upload before saving the new one
      if (value) {
        try {
          await fetch(`/api/admin/upload?url=${encodeURIComponent(value)}`, { method: 'DELETE' });
        } catch (e) {
          console.warn('Failed to delete old image, continuing upload...', e);
        }
      }

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Upload failed');
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || 'An error occurred during file upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  };

  const handleRemove = async () => {
    if (!value) return;
    setUploading(true);
    try {
      const res = await fetch(`/api/admin/upload?url=${encodeURIComponent(value)}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errData = await res.json();
        console.warn('Delete warning:', errData.error);
      }
      onChange('');
      setError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Error removing file:', err);
      setError('Failed to remove image from server, cleared input.');
      onChange('');
    } finally {
      setUploading(false);
    }
  };

  const triggerSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
        {error && (
          <span className="text-xs text-red-500 flex items-center gap-1 font-medium font-poppins">
            <AlertCircle size={12} /> {error}
          </span>
        )}
      </div>

      <div className="relative">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {value ? (
          <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-all duration-300 hover:border-blue-300">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={value}
                  alt="Preview"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate font-poppins">{value.split('/').pop()}</p>
                <p className="text-xs text-slate-400 mt-0.5 truncate font-poppins">{value}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={triggerSelect}
                    disabled={uploading}
                    className="h-8 text-xs font-semibold flex items-center gap-1 border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  >
                    {uploading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                    Replace
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemove}
                    disabled={uploading}
                    className="h-8 text-xs font-semibold flex items-center gap-1 border-red-100 bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    {uploading ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={triggerSelect}
            className={`border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/30 hover:bg-blue-50/10 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[140px] group ${
              uploading ? 'pointer-events-none opacity-60' : ''
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                <span className="text-sm font-semibold text-slate-600 font-poppins">Uploading image file...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-slate-100 group-hover:bg-blue-50 text-slate-500 group-hover:text-blue-600 flex items-center justify-center transition-all duration-300">
                  <Upload size={20} />
                </div>
                <div className="text-sm font-bold text-slate-700 font-poppins">
                  Click to upload or drag & drop
                </div>
                <div className="text-xs text-slate-400 font-poppins">{helperText}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
