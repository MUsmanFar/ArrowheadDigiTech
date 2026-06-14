import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, Phone, Mail, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/lib/db';
import FAQSection from '@/components/ui/FAQSection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = await dbService.services.findUnique(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found - Arrowhead DigiTech',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: `${service.title} Services | Arrowhead DigiTech`,
    description: service.description,
    openGraph: {
      title: `${service.title} - Digital Agency Solutions`,
      description: service.description,
      type: 'website',
    }
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await dbService.services.findUnique(slug);

  if (!service) {
    return notFound();
  }

  // Parse SQL-friendly text fields into list arrays
  const processSteps = service.process 
    ? service.process.split('->').map((s: string) => s.trim()).filter(Boolean)
    : [];

  const benefitsList = service.benefits 
    ? service.benefits.split(',').map((b: string) => b.trim()).filter(Boolean)
    : [];

  const deliverablesList = service.deliverables 
    ? service.deliverables.split(',').map((d: string) => d.trim()).filter(Boolean)
    : [];

  // Get packages
  const packages = service.pricingPackages || [];

  // Fetch FAQs from DB
  const faqs = await dbService.faqs.findMany();

  return (
    <div className="min-h-screen relative overflow-hidden bg-dot-grid">
      <Navbar />
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 right-1/4 w-[450px] h-[450px] bg-cyan-300/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <Link href="/services" className="text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center gap-1.5 font-semibold text-sm font-poppins">
              <ArrowLeft size={16} /> Back to Services
            </Link>
            
            <div className="text-6xl mb-6 bg-white/50 backdrop-blur-md w-20 h-20 rounded-2xl border border-white/80 shadow-md flex items-center justify-center">
              {service.icon || '💻'}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-montserrat tracking-tight">
              {service.title}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 font-poppins leading-relaxed max-w-3xl">
              {service.description}
            </p>
            
            <Link href="#pricing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 px-8 font-semibold shadow-lg shadow-blue-500/10">
                View Pricing Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      {service.problem && service.solution && (
        <section className="py-16 px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-2xl border border-white/50 bg-white/30 backdrop-blur-md shadow-sm">
                <span className="text-red-500 text-xs font-bold uppercase tracking-wider font-poppins">The Challenge</span>
                <h3 className="text-xl font-bold text-slate-900 font-montserrat mt-1.5 mb-4">What Businesses Face</h3>
                <p className="text-slate-600 font-poppins leading-relaxed text-sm md:text-base">{service.problem}</p>
              </div>

              <div className="glass-card p-8 rounded-2xl border-blue-200/50 bg-blue-50/20 backdrop-blur-md shadow-md">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider font-poppins">Our Solution</span>
                <h3 className="text-xl font-bold text-slate-900 font-montserrat mt-1.5 mb-4">How We Drive Success</h3>
                <p className="text-slate-600 font-poppins leading-relaxed text-sm md:text-base">{service.solution}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {processSteps.length > 0 && (
        <section className="py-24 bg-white/50 backdrop-blur-md border-y border-slate-100 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100/50 px-3.5 py-1.5 rounded-full font-poppins">Workflow</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4 font-montserrat tracking-tight">
                Our Work Process
              </h2>
              <p className="text-slate-500 font-poppins">How we take your project from initial concept to deployment.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {processSteps.map((step: string, index: number) => (
                <div key={step} className="text-center relative group">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-md shadow-blue-100 group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-slate-800 font-montserrat text-sm mb-2">{step}</h3>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-gradient-to-r from-blue-200 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits & Deliverables Grid */}
      <section className="py-24 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            {benefitsList.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 font-montserrat flex items-center gap-2">
                  Key Benefits <Sparkles size={20} className="text-blue-500" />
                </h2>
                <div className="space-y-4">
                  {benefitsList.map((benefit: string) => (
                    <div key={benefit} className="glass p-5 rounded-xl border border-white/60 flex items-center gap-3.5 shadow-sm">
                      <CheckCircle className="text-emerald-500 flex-shrink-0" size={18} />
                      <span className="text-slate-700 text-sm font-poppins font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables */}
            {deliverablesList.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 font-montserrat flex items-center gap-2">
                  What You Get <Sparkles size={20} className="text-blue-500" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {deliverablesList.map((deliv: string) => (
                    <div key={deliv} className="glass p-6 rounded-xl border border-white bg-white/40 shadow-sm text-center flex flex-col items-center justify-center">
                      <div className="text-3xl mb-3">📦</div>
                      <span className="text-slate-800 font-semibold font-poppins text-xs md:text-sm">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing packages */}
      {packages.length > 0 && (
        <section id="pricing" className="py-24 bg-white/50 backdrop-blur-md border-y border-slate-100 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100/50 px-3.5 py-1.5 rounded-full font-poppins">Transparent Pricing</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4 font-montserrat tracking-tight">
                Pricing Packages
              </h2>
              <p className="text-slate-500 font-poppins">Plans tailored to your project scale and engineering requirements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {packages.map((plan: any) => (
                <div key={plan.id} className={`glass-card p-8 rounded-2xl h-full flex flex-col justify-between overflow-hidden transition-all duration-300 bg-white/60 ${
                  plan.popular 
                    ? 'border-blue-500 border-2 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/20 scale-[1.02]' 
                    : 'border border-slate-200/50 shadow-sm'
                }`}>
                  <div>
                    {plan.popular && (
                      <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-montserrat text-lg font-bold text-slate-900">{plan.name}</h3>
                    <div className="text-3xl font-extrabold text-slate-900 mt-3 font-poppins">{plan.price}</div>
                    <p className="text-xs text-slate-400 font-poppins mt-2 mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-8 border-t border-slate-100/50 pt-5">
                      {plan.features.map((feature: string) => (
                        <li key={feature} className="flex items-center text-xs text-slate-500 font-poppins font-medium">
                          <CheckCircle className="w-3.5 h-3.5 mr-2 text-emerald-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href="/contact" className="block mt-auto w-full">
                    <Button className="w-full font-semibold rounded-xl py-5" variant={plan.popular ? 'primary' : 'outline'}>
                      {plan.popular ? 'Get Started' : 'Inquire Now'}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Accordion */}
      {faqs.length > 0 && (
        <section className="py-24 px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100/50 px-3.5 py-1.5 rounded-full font-poppins">Help Center</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4 font-montserrat">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQSection faqs={faqs} />
          </div>
        </section>
      )}

      {/* Call To Action */}
      <section className="py-28 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-saas-grid opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent opacity-65 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat tracking-tight">
            Ready to Begin?
          </h2>
          <p className="text-lg mb-8 text-slate-300 font-poppins max-w-2xl mx-auto">
            Contact us today to discuss your {service.title} objectives with our engineering and integration experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="tel:+1234567890">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-50 rounded-xl font-semibold flex items-center gap-2 py-6 px-8 transition-transform duration-300 hover:scale-[1.02]">
                <Phone size={18} /> Call Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 py-6 px-8 transition-transform duration-300 hover:scale-[1.02]">
                <Mail size={18} /> Send Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
