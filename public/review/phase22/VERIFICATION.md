# Phase 22 — R2 Migration Verification

**Marker:** P22-1782388317950  
**Date:** 2026-06-25T11:52:37.854Z  
**Base URL:** http://localhost:3001  
**Storage:** local  
**R2 configured:** false

## Summary

| Status | Count |
|--------|-------|
| PASS | 30 |
| FAIL | 0 |
| WARN | 1 |
| SKIP | 1 |

## Checks

- **WARN** [config] R2 configured: local fallback
- **PASS** [config] storage backend: local (dev)
- **PASS** [helpers] isLocalMediaUrl: /uploads/logos/test.png
- **PASS** [helpers] buildObjectKey: uploads/logos/test.png
- **PASS** [helpers] objectKeyFromLocal: uploads/logos/test.png
- **SKIP** [helpers] R2 URL helpers: R2 not configured in env
- **PASS** [helpers] isManagedMediaUrl local: local path
- **PASS** [server] BASE_URL reachable: http://localhost:3001
- **PASS** [auth] admin login: 200
- **PASS** [security] file too large: HTTP 400
- **PASS** [security] SVG rejected: HTTP 400
- **PASS** [security] unauthorized upload: HTTP 401
- **PASS** [upload] upload-founder: /uploads/founder/1782388344274-P22-1782388317950-upload-founder.png (storage=local)
- **PASS** [delete] delete-founder: removed /uploads/founder/1782388344274-P22-1782388317950-upload-founder.png
- **PASS** [upload] upload-logos: /uploads/logos/1782388344363-P22-1782388317950-upload-logos.png (storage=local)
- **PASS** [delete] delete-logos: removed /uploads/logos/1782388344363-P22-1782388317950-upload-logos.png
- **PASS** [upload] upload-projects/yalaride: /uploads/projects/yalaride/1782388344431-yalaride.png (storage=local)
- **PASS** [delete] delete-projects/yalaride: removed /uploads/projects/yalaride/1782388344431-yalaride.png
- **PASS** [upload] upload-services: /uploads/services/1782388344508-P22-1782388317950-upload-services.png (storage=local)
- **PASS** [delete] delete-services: removed /uploads/services/1782388344508-P22-1782388317950-upload-services.png
- **PASS** [upload] replace-first-logos: /uploads/logos/1782388344574-P22-1782388317950-replace-first-logos.png (storage=local)
- **PASS** [replace] logos: /uploads/logos/1782388344574-P22-1782388317950-replace-first-logos.png -> /uploads/logos/1782388344634-P22-1782388317950-replace.png
- **PASS** [compat] homepage renders: HTTP 200
- **PASS** [compat] legacy /uploads/ URL: http://localhost:3001/uploads/logos/1782222831635-test-logo.png HTTP 200
- **PASS** [frontend] /: HTTP 200
- **PASS** [frontend] /portfolio: HTTP 200
- **PASS** [frontend] /about: HTTP 200
- **PASS** [frontend] /services: HTTP 200
- **PASS** [frontend] /case-studies: HTTP 200
- **PASS** [frontend] /blog: HTTP 200
- **PASS** [frontend] /pricing: HTTP 200
- **PASS** [frontend] /contact: HTTP 200
