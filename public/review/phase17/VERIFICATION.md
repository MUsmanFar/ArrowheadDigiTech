# Phase 17 — Live CMS Verification Report

**Date:** 2026-06-24  
**Environment:** `http://localhost:3001` (Arrowhead DigiTech dev server)  
**Database:** Neon PostgreSQL (`neondb`, ap-southeast-1)  
**Automated marker run:** `P17-1782341936150`  
**Supplement run:** `P17-SUP-1782342567401`

---

## Executive Summary

The full CMS workflow **Admin → Save → Neon DB → Public API → Frontend** is verified for all 12 public site-content sections and all admin-managed entities. **No code changes were required** during this phase.

Site-content pages load copy via client-side `useSiteContent()` (not SSR HTML). Automated SSR HTML checks reported `PARTIAL`; browser verification after hydration confirms **PASS** for all sections.

---

## Section Verification Table

| Section | Admin | Database | API | Frontend | Status |
|---------|-------|----------|-----|----------|--------|
| **Homepage** | PASS | PASS | PASS | PASS | **PASS** |
| **About** | PASS | PASS | PASS | PASS | **PASS** |
| **Services** | PASS | PASS | PASS | PASS | **PASS** |
| **Portfolio** | PASS | PASS | PASS | PASS | **PASS** |
| **Case Studies** | PASS | PASS | PASS | PASS | **PASS** |
| **Blog** | PASS | PASS | PASS | PASS | **PASS** |
| **Pricing** | PASS | PASS | PASS | PASS | **PASS** |
| **FAQ** | PASS | PASS | PASS | PASS | **PASS** |
| **Contact** | PASS | PASS | PASS | PASS | **PASS** |
| **Careers** | PASS | PASS | PASS | PASS | **PASS** |
| **Footer** | PASS | PASS | PASS | PASS | **PASS** |
| **Navigation** | PASS | PASS | PASS | PASS | **PASS** |

### Column evidence

- **Admin:** `PUT /api/admin/site-content` with test marker → restored original (see `verification-report.json`)
- **Database:** `Setting` rows in Neon for all 12 keys (see Neon readout below)
- **API:** `GET /api/public/site-content` returned marker during test; live values confirmed
- **Frontend:** Browser accessibility snapshot + screenshots after client hydration match API/Neon values (e.g. hero `"Building Websites That Actually Grow Businesses."`, nav brand `"Arrowhead"`, footer tagline from CMS)

---

## Entity CRUD Matrix

| Entity | Create | Update | Delete | Restore | Admin | DB | Public API | Status |
|--------|--------|--------|--------|---------|-------|-----|------------|--------|
| Services | PASS | PASS | PASS | N/A | PASS | PASS | PASS (13) | **PASS** |
| Projects | PASS | PASS | PASS | N/A | PASS | PASS | PASS (7) | **PASS** |
| Testimonials | PASS | PASS | PASS | N/A | PASS | PASS | PASS (3) | **PASS** |
| FAQs | PASS | PASS | PASS | N/A | PASS | PASS | PASS (4) | **PASS** |
| Blog posts | PASS | PASS | PASS | N/A | PASS | PASS | PASS (1) | **PASS** |
| Pricing packages | PASS | PASS | PASS | N/A | PASS | PASS | PASS (3) | **PASS** |
| Team members | PASS | PASS | PASS | N/A | PASS | PASS | PASS (1) | **PASS** |
| Client logos | PASS | PASS | PASS | N/A | PASS | PASS | PASS (1) | **PASS** |
| Founders | PASS | PASS | PASS | N/A | PASS | PASS | PASS (0 rows*) | **PASS** |
| Leads | PASS† | PASS | PASS | N/A | PASS | PASS | N/A (admin-only list) | **PASS** |
| Project media | PASS | PASS | PASS | N/A | PASS | PASS | PASS | **PASS** |
| Case studies | — | — | — | N/A | via Projects (`caseStudy=true`) | 7 case studies | PASS | **PASS** |

\*Founders use upsert on `profileKey=primary`; table currently empty in Neon until first save from `/admin/founder`. CRUD API verified via automated tests.  
†Public contact form creates leads via `POST /api/contact` (not `/api/public/leads`). Verified: returns 200, row persisted in Neon.

**Restore:** Not applicable — all entities use hard delete; no soft-delete/restore in schema.

---

## Media Verification

| Operation | Result | Evidence |
|-----------|--------|----------|
| Upload | PASS | `POST /api/admin/upload` → file written under `/uploads/` |
| Replace | PASS | `PUT /api/admin/project-media` upsert with new image URLs |
| Delete | PASS | `DELETE /api/admin/upload?url=...` |
| Reorder | PASS | Gallery order `[url2, url1]` persisted in `ProjectMedia.caseStudyGalleryImages` |
| Refresh page | PASS | `GET /api/public/project-media` reflects upserted data |

---

## Neon Database Evidence

```
Setting keys present: site.nav, home.hero, about.hero, services.hero, portfolio.hero,
  case-studies.hero, blog.page, pricing.page, faq.page, contact.page, careers.page, site.footer

Entity counts:
  projects: 7        services: 13       testimonials: 3
  blogPosts: 1        pricingPackages: 3 teamMembers: 1
  founders: 0         clientLogos: 1     projectMedia: 0
  faqs: 4             leads: 2
```

Sample `home.hero` in Neon matches live homepage headline after hydration.

---

## Public API Snapshot (live)

| Endpoint | Count |
|----------|-------|
| `/api/public/site-content` | 22 section keys |
| `/api/public/services` | 13 |
| `/api/public/projects` | 7 |
| `/api/public/case-studies` | 7 |
| `/api/public/testimonials` | 3 |
| `/api/public/faqs` | 4 |
| `/api/public/blog` | 1 |
| `/api/public/pricing` | 3 |
| `/api/public/team` | 1 |
| `/api/public/founders` | 0 |
| `/api/public/client-logos` | 1 |

---

## Screenshots

| File | Description |
|------|-------------|
| `homepage-cms.png` | Homepage hero + nav from CMS after client hydration |
| `services-cms.png` | Services hero copy from `services.hero` setting |
| `pricing-cms.png` | Pricing hero + 3 CMS packages ($2,500 / $5,000 / Custom) |
| `admin-login.png` | Admin login gate at `/admin/login` |

---

## Workflow Evidence (example: Homepage)

1. **Admin change:** `PUT /api/admin/site-content` `{ key: "home.hero", value: { headline: "P17-…" } }` → 200
2. **Save:** Persisted to `Setting` table in Neon
3. **Refresh public page:** `/` fetched via browser
4. **Frontend:** Client fetches `/api/public/site-content`, renders updated headline (SSR HTML does not include marker — expected)
5. **Restore:** Original `home.hero` restored via admin PUT
6. **No code changes required**

Full automated log: `verification-report.json` + `supplement-report.json`

---

## Notes & Non-Blocking Issues

1. **Client-side site content:** Pages use `useSiteContent()` — frontend verification must wait for hydration (~2s), not inspect raw SSR HTML.
2. **Pricing empty flash:** Snapshot taken immediately on navigation may briefly show "Pricing packages coming soon."; after fetch completes, 3 packages render (see `pricing-cms.png`). Not a bug.
3. **Founders empty in Neon:** Admin upsert works; no founder profile saved yet — About page uses defaults until first save at `/admin/founder`.
4. **Missing legacy uploads:** Some project thumbnails reference deleted files under `/uploads/` (404 in dev logs). Re-upload via admin fixes; not a CMS pipeline bug.
5. **Contact SMTP:** Lead saves to Neon; email alert fails due to unconfigured SMTP credentials (expected in dev).

---

## Conclusion

**Phase 17 verification: PASS.** All editable public sections are wired to the CMS. Admin CRUD, Neon persistence, public APIs, and browser rendering are confirmed. No production code modifications were made during verification.
