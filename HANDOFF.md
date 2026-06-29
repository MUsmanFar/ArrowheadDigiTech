# Arrowhead DigiTech — AI Handoff Document

**Last updated:** June 29, 2026  
**Branch:** `main`  
**Baseline:** Treat the current committed state as the design and functionality baseline. Do not redesign UI unless explicitly requested.

---

## Project Overview

Arrowhead DigiTech is a **Next.js 16** marketing website with a **full admin CMS**, PostgreSQL database (Prisma), media uploads (local dev / Cloudflare R2 in production), and a premium enterprise frontend built around the **Hercules design system**.

The public site showcases services, portfolio, case studies, blog, pricing, FAQ, contact, and legal pages. Content is driven by CMS keys stored in the database (`Setting` model) with fallbacks in `lib/site-content-defaults.ts`.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.9 (App Router, Turbopack) |
| Language | TypeScript 5.6 |
| UI | React 19, Tailwind CSS 3.4, Framer Motion 11 |
| Icons | Lucide React |
| 3D (internal lab) | Three.js, React Three Fiber, Drei |
| Database | PostgreSQL via Prisma 5.20 |
| Auth (admin) | JWT in `admin_token` cookie, bcrypt passwords |
| Email | Nodemailer / SendGrid |
| Storage | Local `public/uploads/` (dev) or Cloudflare R2 (prod) |
| Validation | Zod |
| Node | `>=20 <21` (see Known Issues if using Node 24) |

---

## Folder Structure

```
app/                          # Next.js App Router pages & API routes
  page.tsx                    # Homepage (Hercules sections)
  about/ services/ portfolio/ case-studies/ contact/ faq/ blog/ pricing/ careers/
  testimonials/ privacy-policy/ terms-and-conditions/
  admin/                      # Protected admin CMS UI
  api/                        # Public & admin API routes
  internal/design-system/     # Visual Engine design lab (Phase 31)
backend/
  controllers/                # API controllers
  services/                   # Business logic (admin, public)
components/
  hercules/                   # Primary public design system (current baseline)
    home/                     # Homepage section components
    ui/                       # GlassCard, HerculesButton, PageHero, etc.
    layout/                   # PageShell
  design-system/              # Shared primitives (GlassCard wrapper, CtaBlock, etc.)
  about/redesign/             # About page inner sections
  services/redesign/          # Services page inner sections
  portfolio/                  # Portfolio components
  case-studies/               # Case study list & detail
  home/redesign/              # Legacy homepage redesign (Phase 29/32 Visual Engine hero)
  visual-engine/              # Phase 31 dark command-center design system
  layout/                     # Navbar, Footer
  admin/                      # Admin UI components
lib/                          # Hooks, CMS, DB helpers, media, validation
prisma/                       # Schema, migrations, seed
public/uploads/               # Local uploaded media
scripts/                      # Build helpers (DB URL, prisma generate)
```

---

## Important Reusable Components

### Hercules (current public UI baseline)

| Component | Path | Purpose |
|-----------|------|---------|
| `PageShell` | `components/hercules/layout/PageShell.tsx` | Page wrapper with `hercules-page` class |
| `GlassCard` | `components/hercules/ui/GlassCard.tsx` | Glassmorphism card with hover |
| `HerculesButton` | `components/hercules/ui/HerculesButton.tsx` | Primary/secondary CTA buttons |
| `SectionHeader` | `components/hercules/ui/SectionHeader.tsx` | Eyebrow + title + description |
| `PageHero` | `components/hercules/ui/PageHero.tsx` | Inner page hero sections |
| `PremiumCta` | `components/hercules/ui/PremiumCta.tsx` | Site-wide CTA block |
| `Reveal` | `components/hercules/ui/Reveal.tsx` | Scroll reveal animation |
| `HeroVisual` | `components/hercules/ui/HeroVisual.tsx` | CSS glass sphere hero visual |
| `AboutVisual` | `components/hercules/ui/AboutVisual.tsx` | About section illustration |
| `IconBox` | `components/hercules/ui/IconBox.tsx` | Gradient icon container |

### Homepage sections (`components/hercules/home/`)

- `HerculesHero`, `HerculesLogoStrip`, `HerculesAbout`, `HerculesServices`
- `HerculesProcess`, `HerculesIndustries`, `HerculesTestimonials`, `HerculesFaq`, `HerculesCta`

### CMS hooks

- `useSiteSection(key)` — client-side CMS content (`lib/use-site-content.ts`)
- `getSiteSection(key)` — server-side CMS (`lib/site-content-server.ts`)
- `useProjects`, `useCaseStudies`, `useProjectMediaMap` — data hooks

### Design tokens (CSS)

Defined in `app/globals.css` under **Hercules Reference Design**:
- `.hercules-page`, `.hercules-glass`, `.hercules-glass-soft`
- `.hercules-hero-bg`, `.hercules-section-muted`, `.hercules-section-alt`, `.hercules-section-warm`
- `.hercules-section`, `.container-premium`, `.hercules-gradient-text`

### Legacy (still in repo, not used on homepage)

- `components/home/redesign/HeroRedesign.tsx` — Phase 32 Visual Engine dark hero
- `components/visual-engine/*` — Phase 31 design system; demo at `/internal/design-system`

---

## Public Routes

| Route | Page file | Notes |
|-------|-----------|-------|
| `/` | `app/page.tsx` | Hercules homepage |
| `/about` | `app/about/page.tsx` | Redesign inner sections |
| `/services` | `app/services/page.tsx` | |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | SSR from DB |
| `/portfolio` | `app/portfolio/page.tsx` | |
| `/case-studies` | `app/case-studies/page.tsx` | |
| `/case-studies/[slug]` | `app/case-studies/[slug]/page.tsx` | SSG |
| `/contact` | `app/contact/page.tsx` | Conversational form |
| `/faq` | `app/faq/page.tsx` | |
| `/blog` | `app/blog/page.tsx` | |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | SSG |
| `/pricing` | `app/pricing/page.tsx` | |
| `/careers` | `app/careers/page.tsx` | CMS-only openings |
| `/testimonials` | `app/testimonials/page.tsx` | |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | |
| `/terms-and-conditions` | `app/terms-and-conditions/page.tsx` | |
| `/internal/design-system` | `app/internal/design-system/page.tsx` | Internal Visual Engine lab |

---

## Admin Routes

Protected by `middleware.ts` (JWT `admin_token` cookie).

| Route | Purpose |
|-------|---------|
| `/admin/login` | Admin login |
| `/admin/dashboard` | Dashboard |
| `/admin/site-content` | CMS text content editor |
| `/admin/services` | Services CRUD |
| `/admin/projects` | Projects CRUD |
| `/admin/project-media/[slug]` | Per-project media slots |
| `/admin/testimonials` | Testimonials |
| `/admin/faqs` | FAQs |
| `/admin/blog` | Blog posts |
| `/admin/pricing` | Pricing packages |
| `/admin/team` | Team members |
| `/admin/founder` | Founder profile |
| `/admin/client-logos` | Client logo strip |
| `/admin/leads` | Contact form leads |

---

## APIs

### Public

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/public/[entity]` | GET | Entity list (cached 60s). Entities: `services`, `projects`, `testimonials`, `faqs`, `project-media`, `founders`, `client-logos`, `case-studies`, `blog`, `pricing`, `team` |
| `/api/public/site-content` | GET | All CMS sections |
| `/api/contact` | POST | Contact form submission |
| `/api/projects` | GET | Projects (legacy) |
| `/api/services` | GET | Services (legacy) |
| `/api/testimonials` | GET | Testimonials (legacy) |

### Admin (auth required)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/api/auth/login` | POST | Admin login |
| `/admin/api/auth/logout` | POST | Logout |
| `/api/admin/[entity]` | GET/POST/PUT/DELETE | Generic admin CRUD |
| `/api/admin/site-content` | GET/PUT | CMS content |
| `/api/admin/upload` | POST | File upload (R2 or local) |

---

## Environment Variables

Copy `.env.example` to `.env`. **Never commit `.env`.**

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection (pooled for Neon) |
| `DIRECT_DATABASE_URL` | Yes | Direct DB URL for migrations |
| `DB_MOCK` | Dev | `true` for mock DB; rejected in production |
| `JWT_SECRET` | Prod | Min 32 chars for admin JWT |
| `NEXTAUTH_URL` | Optional | Legacy NextAuth config |
| `NEXTAUTH_SECRET` | Optional | Legacy NextAuth config |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD` | Contact | SMTP |
| `EMAIL_FROM`, `EMAIL_TO` | Contact | Email addresses |
| `SENDGRID_API_KEY` | Optional | SendGrid alternative |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Seed | Default admin credentials |
| `NEXT_PUBLIC_APP_URL` | Yes | Public site URL |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_PUBLIC_URL` | Prod uploads | Cloudflare R2 |
| `USE_R2_UPLOADS` | Dev | `false` to force local uploads |

---

## CMS Content Keys

Stored in `Setting` table as JSON. Defaults in `lib/site-content-defaults.ts`.

Key sections include: `site.nav`, `site.footer`, `site.cta`, `site.client-logos`, `home.hero`, `home.capabilities`, `home.metrics-labels`, `about.hero`, `about.manifesto`, `about.process`, `services.hero`, `portfolio.hero`, `case-studies.hero`, `contact.page`, `faq.page`, `pricing.page`, `blog.page`, `testimonials.page`, `careers.page`, `legal.privacy`, `legal.terms`, and more.

Edit via **Admin → Site Content** or directly in DB.

---

## Features Completed

- Full public marketing site with Hercules premium light design system
- Homepage: hero, logo strip, about, services, process, industries, testimonials, FAQ, CTA
- Inner pages: about, services, portfolio, case studies, contact, FAQ, blog, pricing, careers, testimonials, legal
- Admin CMS for all content types
- Project media system (homepage/portfolio/case study image slots)
- Client logos, founder profile, team
- Case studies derived from `Project` records with `caseStudy: true`
- Contact form with lead storage and email
- JWT admin authentication
- R2 + local upload support
- SEO: metadata, JSON-LD, sitemap, robots
- Phase 31 Visual Engine foundation (`/internal/design-system`)
- Phase 32 Visual Engine hero (legacy, in `components/home/redesign/`)

---

## Features Pending / Optional Next Steps

- Replace CSS `HeroVisual` with real 3D rendered assets (if desired)
- Further polish service detail inner sections (`app/services/[slug]/page.tsx` body blocks)
- Case study detail body layout polish (`components/case-studies/CaseStudyDetail.tsx`)
- Admin UI visual refinement (out of scope for public redesign)
- Migrate middleware to Next.js `proxy` convention (deprecation warning)
- Node engine alignment (package.json specifies Node 20.x)

---

## Known Issues

1. **Node version:** `package.json` requires `>=20 <21`. Development on Node 24 works but shows `EBADENGINE` warnings. Use Node 20 LTS for production parity.
2. **Middleware deprecation:** Next.js 16 warns that `middleware` file convention is deprecated in favor of `proxy`.
3. **npm audit:** 20 moderate/high vulnerabilities in dev dependencies (run `npm audit` for details).
4. **Two design systems coexist:** Hercules (light, public baseline) and Visual Engine (dark, `/internal/design-system`). Homepage uses Hercules only.
5. **Stale `.next` cache:** If TypeScript build fails with cryptic `.next/dev/types/validator.ts` errors, delete `.next` and rebuild.

---

## Dependencies

See `package.json`. Key runtime dependencies:

- `next`, `react`, `react-dom`
- `@prisma/client`, `prisma`
- `framer-motion`, `lucide-react`, `tailwindcss`
- `bcryptjs`, `zod`, `sanitize-html`
- `@aws-sdk/client-s3` (R2)
- `@sendgrid/mail`, `nodemailer`
- `@react-three/fiber`, `@react-three/drei`, `three`

---

## Commands

```bash
npm install          # Install deps + prisma generate
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript check
npm run db:migrate   # Run migrations (production)
npm run db:migrate:dev # Dev migrations
npm run db:seed      # Seed database
```

---

## Handoff Rules for Next Developer

1. **Do not change backend, APIs, auth, or Prisma schema** unless explicitly tasked.
2. **Treat current UI as baseline** — the Hercules design system in `components/hercules/` is the source of truth for public pages.
3. **CMS keys must remain stable** — add new keys to `site-content-defaults.ts` and admin editor if needed.
4. **Test before shipping:** `npm run lint`, `npx tsc --noEmit`, `npm run build`.
5. **Uploads:** Local files go to `public/uploads/`; production uses R2 when configured.

---

## Recent Commit Context

Prior committed phases on `main`:
- Phase 31: Visual Engine foundation
- Phase 32: Dark command-center homepage hero (superseded on homepage by Hercules; code retained)

Uncommitted work at handoff includes the full **Hercules premium redesign** across public pages, documented in this file as the current baseline.
