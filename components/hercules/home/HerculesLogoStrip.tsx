'use client';

import SafeImage from '@/components/ui/SafeImage';
import type { ClientLogoData } from '@/lib/media';
import { useSiteSection } from '@/lib/use-site-content';

export default function HerculesLogoStrip({ initialLogos }: { initialLogos: ClientLogoData[] }) {
  const { section: strip } = useSiteSection('site.client-logos');
  if (!initialLogos.length) return null;

  const sorted = [...initialLogos].sort((a, b) => a.sortOrder - b.sortOrder);
  const track = [...sorted, ...sorted];

  return (
    <section className="border-y border-slate-100/80 bg-white py-14 md:py-16" aria-label="Client logos">
      <div className="container-premium mb-10">
        <p className="text-center font-montserrat text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
          {strip.label}
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white to-transparent md:w-40" />
        <div className="flex w-max animate-scroll gap-16 px-8">
          {track.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex h-12 w-36 shrink-0 items-center justify-center opacity-40 grayscale transition-all duration-500 hover:opacity-70 hover:grayscale-0"
            >
              <SafeImage
                src={logo.logo}
                alt={`${logo.companyName} logo`}
                width={120}
                height={40}
                className="h-8 w-auto max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
