# Production Deployment — Hostinger + Neon

## Environment variables (required)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon **pooled** connection (`?sslmode=require&pgbouncer=true`) |
| `DIRECT_DATABASE_URL` | Neon **direct** connection for migrations |
| `JWT_SECRET` | ≥32 random characters; unique per environment |
| `NEXT_PUBLIC_APP_URL` | Public site URL (e.g. `https://arrowheaddigitech.com`) |
| `DB_MOCK` | Must be `false` in production |

## Email (recommended)

| Variable | Purpose |
|----------|---------|
| `EMAIL_HOST` | SMTP host |
| `EMAIL_PORT` | SMTP port (587 typical) |
| `EMAIL_USER` | SMTP username |
| `EMAIL_PASSWORD` | SMTP password |
| `EMAIL_FROM` | From address |
| `EMAIL_TO` | Inbound notification recipient (defaults to `info@arrowheaddigitech.com`) |

If SMTP is not configured, contact form submissions are **still saved to Neon**; email notifications are skipped with a structured log warning.

## Build & deploy

```bash
npm ci
npm run db:migrate
npm run build
npm run start
```

Use **Node.js 20.x** (see `package.json` engines).

## Upload strategy (important)

Current uploads write to `public/uploads/` on the local filesystem.

**Hostinger Node.js hosting uses an ephemeral filesystem** — uploaded files may be lost on redeploy or restart.

### Recommended architecture (not migrated in Phase 19)

1. **Object storage** — Cloudflare R2, AWS S3, or Hostinger Object Storage
2. Store URLs in the database (projects, logos, media)
3. Serve via CDN URL; keep upload API but stream to object storage instead of disk

Until migration, treat local uploads as **development/staging only**.

## Security checklist (Phase 19)

- Admin `users` entity removed from generic CRUD API
- Password hashes never returned in API responses
- JWT role=`admin` required for admin routes
- Rate limits on login, contact, upload, admin APIs
- HTML sanitization on blog, FAQs, testimonials, founders, site content
- Upload magic-byte validation; SVG blocked
- Zod validation on login and contact forms

## Post-deploy verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Then verify admin login, contact form lead creation, and public CMS pages.
