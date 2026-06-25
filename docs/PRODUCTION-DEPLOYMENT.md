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

## Upload strategy (Phase 22 — Cloudflare R2)

New uploads use **Cloudflare R2** when `R2_*` environment variables are set. In production (`NODE_ENV=production`), R2 is **required** — uploads return HTTP 503 if not configured.

Legacy assets under `/uploads/...` in `public/uploads/` continue to work for backward compatibility. They are not deleted automatically.

### Required R2 variables (production)

| Variable | Purpose |
|----------|---------|
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | R2 API access key |
| `R2_SECRET_ACCESS_KEY` | R2 API secret |
| `R2_BUCKET` | Bucket name |
| `R2_PUBLIC_URL` | Public CDN base URL (no trailing slash) |

Full setup: [docs/CLOUDFLARE-R2-SETUP.md](./CLOUDFLARE-R2-SETUP.md)

Optional: `USE_R2_UPLOADS=false` in development forces local disk even when R2 is configured.

To migrate existing local files to R2 (optional, does not update DB):

```bash
node scripts/migrate-local-uploads-to-r2.mjs          # dry-run
node scripts/migrate-local-uploads-to-r2.mjs --execute  # upload only
```

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
