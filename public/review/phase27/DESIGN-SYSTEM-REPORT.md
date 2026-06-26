# Phase 27 — Enterprise Design System + About & Services Redesign

**Baseline:** `53b380b`  
**Phase commit:** _(see git log after push)_

## Summary

Phase 27 establishes the permanent enterprise design language for Arrowhead DigiTech and applies it to global layout (Navbar, Footer), About, and Services — while preserving all CMS integrations and backend behavior.

## Design System (`components/design-system/`)

| Component | Purpose |
|-----------|---------|
| `Badge` | Eyebrow labels (orange / blue / neutral) |
| `SectionHeading` | Standard section title block |
| `GlassCard` | Glassmorphism surface with optional hover lift |
| `FeatureCard` | Interactive linked service/feature card |
| `StatCard` | Animated metric display |
| `IconWrapper` | Branded icon container |
| `AnimatedDivider` | Section separator with shimmer |
| `EmptyState` | CMS/API empty fallback |
| `ImageFrame` | Luxury image presentation |
| `Button` | Primary / secondary / ghost (CSS tokens) |
| `CtaBlock` | Shared premium CTA (`site.cta`, `site.nav`) |

### Global tokens (`app/globals.css`, `tailwind.config.ts`)

- `--page-surface: #fafafa`, `bg-page-surface`, `section-shell`
- Montserrat loaded globally in `app/layout.tsx`
- Focus-visible states on buttons
- Scroll keyframe for marquee parity

## Pages Redesigned

### Navbar (`components/layout/Navbar.tsx`)

- Glass effect, compact height on scroll
- Active route state via `usePathname`
- Premium mobile drawer
- CMS: `site.nav`

### Footer (`components/layout/Footer.tsx`)

- Light enterprise card layout
- Contact, social, column navigation, legal links
- CMS: `site.footer`

### About (`app/about/page.tsx` + `components/about/redesign/`)

| Section | Component | CMS / data |
|---------|-----------|------------|
| Hero | `AboutHero` | `about.hero`, `site.nav` |
| Achievements | `AboutAchievements` | `about.section-labels`, projects/case studies/testimonials |
| Story | `AboutStory` | `about.hero`, `about.manifesto` |
| Mission / Vision / Values | `AboutMissionVision` | `about.manifesto` |
| Founder | `AboutFounder` | `about.section-labels`, `/api/public/founders` |
| Team | `AboutTeam` | `about.section-labels`, `/api/public/team` |
| Process | `ProcessTimeline` (shared) | `about.process` |
| Trust | `AboutTrustQuotes` | `about.section-labels`, testimonials API |
| CTA | `CtaBlock` | `site.cta` |

### Services (`app/services/page.tsx` + `components/services/redesign/`)

| Section | Component | CMS / data |
|---------|-----------|------------|
| Hero | `ServicesHeroRedesign` | `services.hero`, `site.nav` |
| Overview | `ServicesGrid` | `services.list-intro`, `/api/public/services` |
| Benefits | `ServicesBenefits` | `home.capabilities`, services API |
| Process | `ProcessTimeline` (shared) | `about.process` |
| Technology | `ServicesTechnology` | `about.section-labels`, case studies |
| Trust | `ServicesTrust` | `services.trusted-by`, case studies |
| Industries | `ServicesIndustries` | `case-studies.hero`, case studies |
| FAQ | `ServicesFaq` | `faq.page`, `/api/public/faqs` |
| CTA | `CtaBlock` | `site.cta` |

## Screenshots

- `public/review/phase27/about-desktop.png`
- `public/review/phase27/services-desktop.png`
- `public/review/phase27/navbar-home.png`

## Verification

```
npm run lint        ✓
npx tsc --noEmit    ✓
npm run build       ✓ (52 routes)
```

## Not Modified

Backend, Prisma, APIs, authentication, R2, admin panel, SEO routes, deployment config, security headers.

## Next Phase

Phase 28 can extend the design system to Portfolio, Case Studies, Contact, and remaining pages.
