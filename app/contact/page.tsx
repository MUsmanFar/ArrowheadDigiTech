'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ConversationalForm from '@/components/contact/ConversationalForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen relative bg-white selection:bg-blue-200 selection:text-blue-900 overflow-hidden flex flex-col">
      <Navbar />
      
      <main id="main-content" className="flex-1 flex flex-col lg:flex-row pt-20">
        
        {/* Left Side: Brand Statement & Atmosphere */}
        <div className="w-full lg:w-[45%] bg-slate-950 text-white relative flex flex-col justify-between p-8 lg:p-16">
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          </div>

          <div className="relative z-10 pt-12">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs font-poppins mb-6 block">Initiate Contact</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat tracking-tighter leading-[1.05] mb-8">
              Let&apos;s build something <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                great together.
              </span>
            </h1>
            <p className="text-lg text-slate-400 font-poppins max-w-md leading-relaxed font-light">
              Whether you need to overhaul your enterprise architecture or build a scalable acquisition funnel, our team is ready to engineer the solution.
            </p>
          </div>

          <div className="relative z-10 mt-20 lg:mt-0">
            <div className="space-y-6 text-sm font-poppins text-slate-400">
              <div>
                <div className="font-bold text-white mb-1 uppercase tracking-widest text-[10px]">Headquarters</div>
                Colombo, Sri Lanka
              </div>
              <div>
                <div className="font-bold text-white mb-1 uppercase tracking-widest text-[10px]">Direct Inquiries</div>
                info@arrowheaddigitech.com
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Conversational Form */}
        <div className="w-full lg:w-[55%] bg-white flex items-center justify-center p-6 md:p-12 lg:p-24 relative">
           <ConversationalForm />
        </div>

      </main>
    </div>
  );
}
