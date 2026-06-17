import React from 'react';
import { motion } from 'framer-motion';

export default function StatsSection() {
  return (
    <section className="py-12 px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Projects Delivered', value: '150+' },
            { label: 'Client ROI', value: '300%' },
            { label: 'Industry Awards', value: '12' },
            { label: 'Team Experts', value: '25+' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 font-montserrat tracking-tight">{stat.value}</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider font-poppins">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
