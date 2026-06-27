'use client';

import type { MotionValue } from 'framer-motion';
import { motion } from 'framer-motion';
import { Activity, TrendingUp } from 'lucide-react';
import { CommandGlass, SignalCore } from '@/components/visual-engine';
import { signalCoreScale } from '@/lib/visual-engine/tokens';

type Props = {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  compact?: boolean;
};

export default function HeroCommandCenter({ parallaxX, parallaxY, compact = false }: Props) {
  const coreSize = compact ? signalCoreScale.services : signalCoreScale.hero;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] ve-depth-perspective">
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-[12%] rounded-full border border-white/[0.06] bg-white/[0.02]" aria-hidden="true" />
        <div className="absolute inset-[24%] rounded-full border border-[#2B6EF2]/10" aria-hidden="true" />

        <div className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2">
          <SignalCore size={coreSize} spokes={8} animated />
        </div>

        {!compact && (
          <>
            <CommandGlass
              tier="luminous"
              hover
              className="absolute right-0 top-[8%] w-44 p-4 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] lg:w-52"
            >
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Analytics
              </p>
              <div className="mt-3 flex h-14 items-end gap-1">
                {[38, 62, 48, 78, 55, 92, 68].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-[#2B6EF2] to-[#60a5fa]/70"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="mt-2 font-montserrat text-[10px] text-slate-500">Live telemetry</p>
            </CommandGlass>

            <CommandGlass
              tier="luminous"
              hover
              className="absolute left-0 top-[32%] px-4 py-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
            >
              <TrendingUp className="h-4 w-4 text-[#E46F1E]" aria-hidden="true" />
              <p className="mt-1 font-poppins text-lg font-bold text-white">+214%</p>
              <p className="font-montserrat text-[10px] text-slate-400">Pipeline velocity</p>
            </CommandGlass>

            <CommandGlass
              tier="whisper"
              hover
              className="absolute bottom-[18%] right-[12%] px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-[#2B6EF2]" aria-hidden="true" />
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-slate-400">
                  AI Nodes
                </p>
              </div>
              <p className="mt-1 font-poppins text-sm font-bold text-white">Active</p>
            </CommandGlass>

            <CommandGlass
              tier="whisper"
              className="absolute bottom-[8%] left-[10%] hidden px-3 py-2 lg:block"
            >
              <p className="font-montserrat text-[9px] uppercase tracking-widest text-slate-500">
                Inference
              </p>
              <p className="font-mono text-xs text-[#2B6EF2]">12.4ms</p>
            </CommandGlass>
          </>
        )}
      </motion.div>
    </div>
  );
}
