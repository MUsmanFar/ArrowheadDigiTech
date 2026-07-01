'use client';

import SafeImage from '@/components/ui/SafeImage';
import type { ClientLogoData } from '@/lib/media';
import { useSiteSection } from '@/lib/use-site-content';

export default function ArchLogoStrip({ initialLogos }: { initialLogos: ClientLogoData[] }) {
  const { section: strip } = useSiteSection('site.client-logos');
  if (!initialLogos.length) return null;

  const sorted = [...initialLogos].sort((a, b) => a.sortOrder - b.sortOrder);
  const track = [...sorted, ...sorted, ...sorted];

  return (
    <section
      className="relative overflow-hidden border-y border-[rgba(15,20,30,0.06)]"
      style={{
        background:
          'linear-gradient(180deg,rgba(255,255,255,0.92) 0%,rgba(250,250,249,0.96) 100%)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      aria-label="Trusted by"
    >
      {/* Faint inner glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 50%,rgba(228,111,30,0.03),transparent 70%)' }}
        aria-hidden="true" />

      {/* Label row */}
      <div className="arch-container py-5">
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(15,20,30,0.08)]" />
          <p className="shrink-0 font-inter text-[9.5px] font-semibold uppercase tracking-[0.3em] text-[rgba(15,20,30,0.32)]">
            {strip.label || 'Trusted by forward-thinking companies'}
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(15,20,30,0.08)]" />
        </div>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white to-transparent md:w-40" />

      {/* Scrolling track */}
      <div className="relative overflow-hidden pb-5">
        <div
          className="flex w-max items-center gap-16 px-8"
          style={{ animation: 'arch-marquee 46s linear infinite', willChange: 'transform' }}
        >
          {track.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex h-9 w-32 shrink-0 items-center justify-center opacity-30 grayscale transition-all duration-500 hover:opacity-60 hover:grayscale-0"
            >
              <SafeImage
                src={logo.logo}
                alt={`${logo.companyName} logo`}
                width={112}
                height={32}
                className="h-7 w-auto max-w-[112px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
