'use client';

import { motion } from 'framer-motion';

const float = (delay: number, y = 10) => ({
  animate: { y: [0, -y, 0] },
  transition: { duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay },
});

export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]" aria-hidden="true">
      <div className="pointer-events-none absolute inset-[5%] rounded-full bg-gradient-to-br from-orange-200/35 via-white/20 to-blue-200/30 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-[20%] left-1/2 h-[45%] w-[75%] -translate-x-1/2 rounded-full bg-orange-100/25 blur-[60px]" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[6%] rounded-full border border-orange-200/25"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[14%] rounded-full border border-dashed border-blue-200/30"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[22%] rounded-full border border-white/60"
      />

      <motion.div
        {...float(0, 14)}
        className="absolute left-1/2 top-[6%] z-20 w-[54%] -translate-x-1/2"
      >
        <div className="relative aspect-square">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/90 via-white/40 to-blue-50/50 shadow-[0_40px_100px_-30px_rgba(43,110,242,0.25),inset_0_2px_20px_rgba(255,255,255,0.9)] backdrop-blur-xl" />
          <div className="absolute inset-[3%] rounded-full border border-white/80" />
          <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-orange-50/80 via-white/30 to-blue-50/40 shadow-[inset_0_-8px_24px_rgba(228,111,30,0.12)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-poppins text-[4.5rem] font-bold leading-none hercules-gradient-text md:text-[5.5rem]">
              A
            </span>
          </div>
          <div className="absolute -right-[8%] top-[18%] h-16 w-16 rotate-12 rounded-2xl border border-white/70 bg-white/50 shadow-lg backdrop-blur-md" />
          <div className="absolute -left-[6%] bottom-[22%] h-12 w-12 -rotate-6 rounded-xl border border-white/70 bg-gradient-to-br from-blue-50/80 to-white/60 shadow-md backdrop-blur-md" />
        </div>
      </motion.div>

      <div className="absolute bottom-[6%] left-1/2 z-10 w-[72%] -translate-x-1/2">
        <div className="relative mx-auto aspect-[3/1] max-w-[340px]">
          <div className="absolute inset-x-[8%] bottom-0 h-[28%] rounded-[50%] bg-gradient-to-t from-orange-200/40 to-transparent blur-xl" />
          <div className="absolute inset-x-[12%] bottom-[8%] h-[18%] rounded-[50%] border border-orange-200/40 bg-gradient-to-b from-white/80 to-orange-50/30 shadow-[0_20px_60px_-20px_rgba(228,111,30,0.2)]" />
          <div className="absolute inset-x-[22%] bottom-[18%] h-[12%] rounded-[50%] border border-white/60 bg-white/70 shadow-inner" />
        </div>
      </div>

      <motion.div {...float(0.8, 8)} className="absolute left-[2%] top-[28%] z-30">
        <div className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)] backdrop-blur-xl">
          <p className="font-montserrat text-[9px] font-semibold uppercase tracking-wider text-slate-400">Uptime</p>
          <p className="font-poppins text-lg font-bold text-slate-900">99.99%</p>
        </div>
      </motion.div>

      <motion.div {...float(1.2, 6)} className="absolute right-[0%] top-[22%] z-30">
        <div className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)] backdrop-blur-xl">
          <p className="font-montserrat text-[9px] font-semibold uppercase tracking-wider text-slate-400">Deploy</p>
          <p className="font-poppins text-sm font-bold text-emerald-600">Success</p>
        </div>
      </motion.div>

      <motion.div {...float(1.6, 7)} className="absolute bottom-[28%] right-[4%] z-30">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-gradient-to-br from-blue-50 to-white shadow-lg">
          <div className="h-5 w-5 rounded-md bg-gradient-to-br from-[#2b6ef2] to-[#60a5fa]" />
        </div>
      </motion.div>
    </div>
  );
}
