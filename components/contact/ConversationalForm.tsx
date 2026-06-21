'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Calendar } from 'lucide-react';
import { getSchedulingUrl } from '@/lib/scheduling';

type Step = 'form' | 'success';

export default function ConversationalForm() {
  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    intent: '',
    budget: '',
    message: '',
    name: '',
    email: '',
    company: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrors({ identity: 'Name and email are required.' });
      return;
    }
    if (!formData.message.trim()) {
      setErrors({ message: 'Please share a few details about your project.' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStep('success');
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setErrors({ submit: 'Failed to connect. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto min-h-[400px] flex flex-col justify-center relative">
      <AnimatePresence mode="wait">

        {/* SINGLE STEP: FORM */}
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            <h2 className="text-3xl font-bold font-montserrat text-slate-900 mb-2 leading-tight">
              Tell us about your project.
            </h2>
            <p className="text-slate-400 font-poppins text-sm mb-8">
              Share what you&apos;re working on and we&apos;ll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Company row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest font-poppins mb-2 pl-2">
                    Full Name <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Jane Doe"
                    className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-0 transition-colors font-poppins text-slate-900 placeholder:text-slate-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest font-poppins mb-2 pl-2">
                    Email <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="jane@acme.com"
                    className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-0 transition-colors font-poppins text-slate-900 placeholder:text-slate-400 text-sm"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest font-poppins mb-2 pl-2">
                  Project Details <span className="text-orange-400">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="What are you looking to build? What are your goals and timeline?"
                  className="w-full min-h-[140px] p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-0 transition-colors font-poppins text-slate-900 placeholder:text-slate-400 resize-none text-sm"
                />
                {errors.message && <p className="text-red-500 text-xs font-poppins mt-1">{errors.message}</p>}
              </div>

              {/* Budget + Intent row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest font-poppins mb-2 pl-2">
                    Budget Range <span className="text-slate-300 font-normal normal-case">(optional)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['<$10k', '$10k-$50k', '$50k-$100k', '$100k+'].map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setFormData({...formData, budget})}
                        className={`px-4 py-2 rounded-full border text-xs font-poppins transition-all ${
                          formData.budget === budget
                            ? 'border-orange-400 bg-orange-50 text-orange-700'
                            : 'border-slate-200 text-slate-500 hover:border-orange-200 hover:bg-orange-50/50'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest font-poppins mb-2 pl-2">
                    I&apos;m looking to <span className="text-slate-300 font-normal normal-case">(optional)</span>
                  </label>
                  <select
                    value={formData.intent}
                    onChange={(e) => setFormData({...formData, intent: e.target.value})}
                    className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-0 transition-colors font-poppins text-slate-700 text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="Start a New Project">Start a New Project</option>
                    <option value="Architecture Audit">Architecture Audit</option>
                    <option value="Ongoing Partnership">Ongoing Partnership</option>
                    <option value="Join the Team">Join the Team</option>
                  </select>
                </div>
              </div>

              {errors.identity && <p className="text-red-500 text-xs font-poppins">{errors.identity}</p>}
              {errors.submit && <p className="text-red-500 text-xs font-poppins">{errors.submit}</p>}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-4 px-8 rounded-full font-semibold font-poppins transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_-8px_rgba(249,115,22,0.4)]"
                >
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending...</>
                  ) : (
                    <><ArrowRight size={18} /> Send Inquiry</>
                  )}
                </button>
                <a
                  href={getSchedulingUrl('contact-form')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-slate-200 text-slate-600 font-semibold font-poppins text-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  <Calendar size={16} />
                  Book a Call Instead
                </a>
              </div>
            </form>
          </motion.div>
        )}

        {/* SUCCESS */}
        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center justify-center text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6"
            >
              <CheckCircle2 size={40} />
            </motion.div>

            <h2 className="text-3xl font-bold font-montserrat text-slate-900 mb-3">
              Thanks, {formData.name.split(' ')[0]}.
            </h2>
            <p className="text-base text-slate-500 font-poppins max-w-md mx-auto leading-relaxed mb-6">
              We&apos;ve received your inquiry. One of our team will review it and reach out within 24 hours.
            </p>
            <a
              href={getSchedulingUrl('contact-success')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-all"
            >
              <Calendar size={16} />
              Prefer to pick a time now?
            </a>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
