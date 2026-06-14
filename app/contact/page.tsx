'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          company,
          service,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setService('');
        setMessage('');
      } else {
        setFormError(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setFormError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-montserrat">
              Get in <span className="text-gradient-blue">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Ready to transform your digital presence? Let&apos;s discuss how we can help you achieve your business goals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4 font-montserrat">
                    Contact Information
                  </h2>
                  <p className="text-slate-600 mb-8 font-poppins">
                    Have a question or want to work together? Drop us a line or visit our office.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-4">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Email</h3>
                      <p className="text-slate-600">info@arrowheaddigitech.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-4">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Phone</h3>
                      <p className="text-slate-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-4">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Office</h3>
                      <p className="text-slate-600">123 Agency Suite, Colombo, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {success && (
                    <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-600 p-4 rounded-xl font-semibold text-sm">
                      Thank you! Your message has been sent successfully. We will get back to you shortly.
                    </div>
                  )}
                  {formError && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl font-semibold text-sm">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-slate-700 mb-2">
                          First Name
                        </label>
                        <Input 
                          id="first-name"
                          placeholder="John" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                          required 
                        />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-slate-700 mb-2">
                          Last Name
                        </label>
                        <Input 
                          id="last-name"
                          placeholder="Doe" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                          required 
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="john@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Phone (Optional)
                      </label>
                      <Input 
                        id="phone"
                        type="tel" 
                        placeholder="+1 (555) 123-4567" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                        Company (Optional)
                      </label>
                      <Input 
                        id="company"
                        placeholder="Your Company" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                      />
                    </div>

                    <div>
                      <label htmlFor="service-select" className="block text-sm font-medium text-slate-700 mb-2">
                        Service Interested In
                      </label>
                      <select 
                        id="service-select"
                        value={service} 
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a service</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Apps">Mobile Apps</option>
                        <option value="SEO">SEO</option>
                        <option value="Google Ads">Google Ads</option>
                        <option value="Meta Ads">Meta Ads</option>
                        <option value="Social Media Marketing">Social Media Marketing</option>
                        <option value="Lead Generation">Lead Generation</option>
                        <option value="CRM Solutions">CRM Solutions</option>
                        <option value="AI Chatbots">AI Chatbots</option>
                        <option value="Custom Software">Custom Software</option>
                        <option value="Video Production">Video Production</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Digital Strategy">Digital Strategy</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project..."
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      <Send className="mr-2" size={20} />
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Prefer a Call?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Schedule a free consultation with our team
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Book Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}
