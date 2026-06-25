# Cloudflare R2 Media Storage Setup

ArrowheadDigiTech stores CMS media (founder photos, project galleries, client logos, service thumbnails, etc.) in **Cloudflare R2** using the S3-compatible API. Legacy assets under `/uploads/...` continue to work for backward compatibility.

## Architecture

```
Admin CMS upload  →  POST /api/admin/upload  →  R2 bucket (uploads/…)
                                              →  Public URL saved in Neon
Frontend          →  Cloudflare CDN / custom domain  →  Browser
Legacy assets     →  /uploads/… (local static files, unchanged)
```

## 1. Create an R2 bucket

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **R2 Object Storage** → **Create bucket**.
3. Choose a bucket name (e.g. `arrowhead-media`) and region **Automatic**.
4. **Do not** enable public write access. The bucket should allow reads via a custom domain or R2 public bucket URL; writes go only through API keys on the server.

## 2. Create API credentials

1. R2 → **Manage R2 API Tokens** → **Create API token**.
2. Permissions: **Object Read & Write** for the target bucket (or account-level with bucket scope).
3. Save:
   - **Account ID**
   - **Access Key ID**
   - **Secret Access Key**

Store secrets in Hostinger environment variables — never commit them to git.

## 3. Public access (CDN)

Choose one:

### Option A — Custom domain (recommended)

1. R2 bucket → **Settings** → **Public access** → connect a custom domain (e.g. `media.arrowheaddigitech.com`).
2. Cloudflare proxies traffic and caches assets at the edge.
3. Set `R2_PUBLIC_URL=https://media.arrowheaddigitech.com` (no trailing slash).

### Option B — R2.dev subdomain

1. Enable **Allow Access** on the bucket’s public R2.dev URL.
2. Set `R2_PUBLIC_URL` to that HTTPS URL.

## 4. Environment variables

Add to `.env` (production) and Hostinger Node.js app settings:

| Variable | Description |
|----------|-------------|
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | R2 API token access key |
| `R2_SECRET_ACCESS_KEY` | R2 API token secret |
| `R2_BUCKET` | Bucket name |
| `R2_PUBLIC_URL` | Public CDN base URL (no trailing slash) |
| `USE_R2_UPLOADS` | Optional; set `false` in dev to force local disk even when R2 is set |

Copy from `.env.example` and fill in real values.

**Production:** When `NODE_ENV=production`, uploads require R2. Missing credentials return HTTP 503 with a clear error.

**Development:** If R2 is not configured, uploads fall back to `public/uploads/` automatically.

## 5. Next.js image optimization

`next.config.js` reads `R2_PUBLIC_URL` at build time and adds the hostname to `images.remotePatterns`. Rebuild after changing the public URL.

## 6. Deployment (Hostinger + Neon)

1. Set all `R2_*` variables on Hostinger.
2. Deploy the app (`npm run build` / Hostinger build).
3. No local disk persistence is required for new uploads.
4. Neon continues to store full image URLs — no schema change.

## 7. Testing

```bash
# Build gates
npm run lint
npx tsc --noEmit
npm run build

# Live API verification (dev or prod server must be running)
BASE_URL=http://localhost:3001 npx tsx scripts/phase22-r2-verification.ts
```

Verify in admin: founder, project media, logos, services, case study galleries — upload, replace, delete.

## 8. Migrating existing local files

Local files are **not** deleted automatically. To copy legacy assets to R2:

```bash
# Dry run
node scripts/migrate-local-uploads-to-r2.mjs

# Upload (requires R2 env vars)
node scripts/migrate-local-uploads-to-r2.mjs --execute
```

This uploads files only. Update database URLs separately after validating CDN URLs. Keep local copies until DB migration is complete.

## 9. Security

- Bucket: **no public write**; server uses scoped API keys.
- Upload route: admin JWT required, rate limited, magic-byte validation, 5MB cap, SVG blocked.
- Filenames and subdirs sanitized; no directory traversal.
- Deletes only accept managed URLs (`/uploads/...` or configured `R2_PUBLIC_URL`).

## 10. Troubleshooting

| Symptom | Fix |
|---------|-----|
| `503 Storage unavailable` in production | Set all `R2_*` env vars on Hostinger |
| Images 404 on frontend | Check `R2_PUBLIC_URL`, bucket public access, custom domain DNS |
| `next/image` broken for R2 URLs | Rebuild after setting `R2_PUBLIC_URL` |
| Upload timeout | Retry; check R2 status and network from Hostinger |
| Old `/uploads/` images work, new ones don’t | Confirm new URLs use `R2_PUBLIC_URL` prefix |
| Delete fails for R2 object | Verify URL matches `R2_PUBLIC_URL` host and `uploads/` key path |

## Related files

- `app/api/admin/upload/route.ts` — upload/delete API
- `lib/r2-config.ts`, `lib/r2-storage.ts`, `lib/media-url.ts`, `lib/local-storage.ts`
- `scripts/migrate-local-uploads-to-r2.mjs` — optional legacy migration
- `scripts/phase22-r2-verification.ts` — automated checks
