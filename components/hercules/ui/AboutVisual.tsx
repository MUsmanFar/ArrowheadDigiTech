'use client';

import { motion } from 'framer-motion';
import { Box, Cpu, Layers, Sparkles } from 'lucide-react';

const float = (delay: number) => ({
  animate: { y: [0, -8, 0] },
  transition: { duration: 4.5 + delay, repeat: Infinity, ease: 'easeInOut', delay },
});

export default function AboutVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]" aria-hidden="true">
      <div className="pointer-events-none absolute inset-[10%] rounded-full bg-gradient-to-br from-orange-100/50 to-blue-100/30 blur-3xl" />

      <motion.div {...float(0)} className="absolute left-1/2 top-1/2 z-10 w-[55%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative" style={{ transform: 'rotateX(55deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}>
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e46f1e] to-[#f59e42] shadow-[0_24px_60px_-16px_rgba(228,111,30,0.45)]" />
            <div className="absolute -right-4 top-4 h-32 w-8 rounded-r-lg bg-gradient-to-b from-orange-400/80 to-orange-600/60" />
            <div className="absolute -bottom-4 left-4 h-8 w-32 rounded-b-lg bg-gradient-to-r from-orange-500/70 to-orange-700/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-white/90" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-[12%] left-1/2 w-[80%] -translate-x-1/2">
        <div className="h-3 rounded-full bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
        <div className="mx-auto mt-1 h-8 w-[70%] rounded-[50%] bg-slate-100/80 shadow-inner" />
      </div>

      <motion.div {...float(0.5)} className="absolute left-[4%] top-[18%]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white/75 shadow-lg backdrop-blur-md">
          <Cpu size={20} className="text-[#2b6ef2]" />
        </div>
      </motion.div>

      <motion.div {...float(1)} className="absolute right-[2%] top-[30%]">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/75 shadow-lg backdrop-blur-md">
          <Layers size={18} className="text-[#e46f1e]" />
        </div>
      </motion.div>

      <motion.div {...float(1.5)} className="absolute bottom-[30%] left-[8%]">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white/75 shadow-md backdrop-blur-md">
          <Box size={16} className="text-emerald-600" />
        </div>
      </motion.div>
    </div>
  );
}
