'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

type Step = 'intent' | 'details' | 'identity' | 'success';

export default function ConversationalForm() {
  const [step, setStep] = useState<Step>('intent');
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

  const handleIntentSelect = (intent: string) => {
    setFormData({ ...formData, intent });
    setErrors({});
    setTimeout(() => setStep('details'), 400); // slight delay for animation
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      setErrors({ message: 'Please provide some details so we can prepare.' });
      return;
    }
    setErrors({});
    setStep('identity');
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrors({ identity: 'Name and email are required.' });
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

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div className="w-full max-w-xl mx-auto min-h-[500px] flex flex-col justify-center relative">
      
      {/* Progress Indicator */}
      {step !== 'success' && (
        <div className="absolute top-0 left-0 w-full flex gap-2 mb-12">
          <div className={`h-1 flex-1 rounded-full ${step === 'intent' || step === 'details' || step === 'identity' ? 'bg-blue-600' : 'bg-slate-100'}`} />
          <div className={`h-1 flex-1 rounded-full ${step === 'details' || step === 'identity' ? 'bg-blue-600' : 'bg-slate-100'}`} />
          <div className={`h-1 flex-1 rounded-full ${step === 'identity' ? 'bg-blue-600' : 'bg-slate-100'}`} />
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* STEP 1: INTENT */}
        {step === 'intent' && (
          <motion.div
            key="intent"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full mt-12"
          >
            <h2 className="text-3xl font-bold font-montserrat text-slate-900 mb-8 leading-tight">
              Hi there. <br/>What brings you to Arrowhead?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'new_project', label: 'Start a New Project' },
                { id: 'audit', label: 'Architecture Audit' },
                { id: 'retainer', label: 'Ongoing Partnership' },
                { id: 'careers', label: 'Join the Team' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleIntentSelect(item.label)}
                  className={`p-6 text-left rounded-2xl border-2 transition-all duration-300 group ${
                    formData.intent === item.label 
                      ? 'border-blue-600 bg-blue-50/50 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
                      : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 mb-4 flex items-center justify-center transition-colors ${
                    formData.intent === item.label ? 'border-blue-600' : 'border-slate-300 group-hover:border-blue-300'
                  }`}>
                    {formData.intent === item.label && <div className="w-3 h-3 rounded-full bg-blue-600" />}
                  </div>
                  <div className={`font-semibold font-poppins transition-colors ${
                    formData.intent === item.label ? 'text-blue-900' : 'text-slate-700'
                  }`}>
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: DETAILS */}
        {step === 'details' && (
          <motion.div
            key="details"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full mt-12"
          >
            <button onClick={() => setStep('intent')} className="text-slate-400 hover:text-slate-900 mb-6 flex items-center gap-2 text-sm font-poppins transition-colors">
              <ArrowLeft size={16} /> Back
            </button>

            <h2 className="text-3xl font-bold font-montserrat text-slate-900 mb-2 leading-tight">
              Got it. Tell us a bit more.
            </h2>
            <p className="text-slate-500 font-poppins mb-8">What are your primary goals and bottlenecks?</p>
            
            <form onSubmit={handleDetailsSubmit}>
              <div className="mb-6">
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="We are looking to scale our platform and need..."
                  className="w-full min-h-[150px] p-6 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-0 transition-colors font-poppins text-slate-900 placeholder:text-slate-400 resize-none"
                />
                {errors.message && <p className="text-red-500 text-sm font-poppins mt-2">{errors.message}</p>}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-900 uppercase tracking-widest font-poppins mb-4">Estimated Budget (Optional)</label>
                <div className="flex flex-wrap gap-3">
                  {['<$10k', '$10k-$50k', '$50k-$100k', '$100k+'].map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setFormData({...formData, budget})}
                      className={`px-5 py-2.5 rounded-full border text-sm font-poppins transition-all ${
                        formData.budget === budget
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="flex items-center gap-3 bg-slate-900 hover:bg-blue-600 text-white py-4 px-8 rounded-full font-semibold font-poppins transition-colors group"
              >
                Almost there <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 3: IDENTITY */}
        {step === 'identity' && (
          <motion.div
            key="identity"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full mt-12"
          >
            <button onClick={() => setStep('details')} className="text-slate-400 hover:text-slate-900 mb-6 flex items-center gap-2 text-sm font-poppins transition-colors">
              <ArrowLeft size={16} /> Back
            </button>

            <h2 className="text-3xl font-bold font-montserrat text-slate-900 mb-8 leading-tight">
              Last step. Who are we speaking with?
            </h2>
            
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest font-poppins mb-2 pl-2">Full Name</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Jane Doe"
                    className="w-full p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-600 transition-colors font-poppins text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest font-poppins mb-2 pl-2">Company</label>
                  <input 
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Acme Corp"
                    className="w-full p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-600 transition-colors font-poppins text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest font-poppins mb-2 pl-2">Email Address</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="jane@acme.com"
                  className="w-full p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-600 transition-colors font-poppins text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {errors.identity && <p className="text-red-500 text-sm font-poppins">{errors.identity}</p>}
              {errors.submit && <p className="text-red-500 text-sm font-poppins">{errors.submit}</p>}

              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-full font-bold font-poppins transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
              >
                {loading ? (
                  <><Loader2 size={20} className="animate-spin" /> Transmitting...</>
                ) : (
                  <>Initialize Project <ArrowRight size={20} /></>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'success' && (
          <motion.div
            key="success"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col items-center justify-center text-center mt-12 py-12"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-8"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            
            <h2 className="text-4xl font-bold font-montserrat text-slate-900 mb-4">
              Transmission Received.
            </h2>
            <p className="text-lg text-slate-500 font-poppins max-w-md mx-auto leading-relaxed">
              We&apos;ve received your strategic brief. One of our lead architects will review it and reach out within 24 hours.
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
