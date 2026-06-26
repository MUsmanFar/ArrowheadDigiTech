# Phase 28 — Homepage Masterpiece Redesign

**Baseline:** `16ccc14`  
**Scope:** Frontend only — homepage components + global CSS brand tokens

## Summary

Complete visual overhaul of the homepage to enterprise / Awwwards-tier quality. All CMS bindings preserved; no backend, API, Prisma, or admin changes.

## Brand Tokens (`app/globals.css`)

| Token | Value |
|-------|--------|
| Primary accent | `#E46F1E` |
| Secondary accent | `#2B6EF2` |
| Dark text | `#111827` |
| Background | `#FAFAFA` |
| Silver | `#E5E7EB` |

New utilities: `home-noise`, `home-glass`, `home-glass-dark`

## Architecture

- **`SectionBackdrop`** — shared mesh/aurora/noise layer per section
- **`WhyChooseUs`** — replaces `TechStackGrid` on homepage (manifesto storytelling)
- All sections use layered backgrounds (no flat white blocks)

## Section Changes

| Section | Key upgrades |
|---------|----------------|
| **Hero** | MacBook + phone scene, Meta/Google/AI widgets, mouse parallax, trust badges, CMS metrics |
| **Client logos** | Triple-track infinite marquee, grayscale → color hover |
| **Services** | Alternating full-width glass cards, thumbnails when available |
| **Portfolio** | Device-frame featured case study, ROI metric chips |
| **Why Choose Us** | Editorial manifesto layout (`about.manifesto`, `services.trusted-by`) |
| **Process** | Horizontal scroll timeline, animated connectors |
| **Testimonials** | Dual-row infinite glass marquee |
| **Industries** | Premium glass cards with accent gradients |
| **Metrics** | Dark glass panel, animated counters |
| **CTA** | Massive gradient block + CMS metric illustration |
| **Footer preview** | Newsletter, social, full navigation grid |

## CMS Keys (unchanged)

`home.hero`, `site.client-logos`, `home.capabilities`, `services.hero`, `services.detail-labels`, `home.featured-work`, `case-studies.hero`, `about.manifesto`, `services.trusted-by`, `about.process`, `testimonials.page`, `home.metrics-labels`, `site.cta`, `site.nav`, `site.footer`, `blog.page`

## Screenshots

| File | Description |
|------|-------------|
| `before-home-hero.png` | Phase 27 hero (before) |
| `before-home-full.png` | Phase 26 full page (before) |
| `after-home-hero.png` | Phase 28 hero (after) |
| `after-home-full.png` | Phase 28 full page (after) |

## Verification

```
npm run lint        ✓
npx tsc --noEmit    ✓
npm run build       ✓ (52 routes)
```

## Performance

- LazySection preserved for below-fold sections
- SafeImage / Next Image unchanged
- No new heavy libraries (Framer Motion only, existing)
- GPU-friendly transforms (`will-change-transform`, CSS blur)

## Not Modified

Backend, Prisma, Neon, APIs, auth, admin, R2, SEO routes, site-content schema, deployment config.
