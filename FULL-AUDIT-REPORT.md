# Full SEO Audit — motionclinic.com.ar
**Date:** 2026-03-30
**Framework:** Astro + React (SSG)
**Business type:** Local Medical Service — Hip & Knee Robotic Surgery Clinic (Buenos Aires, Argentina)
**Pages crawled:** 13 (full site)

---

## Overall SEO Health Score: **47 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 45 | 9.9 |
| Content Quality | 23% | 35 | 8.1 |
| On-Page SEO | 20% | 55 | 11.0 |
| Schema / Structured Data | 10% | 15 | 1.5 |
| Performance (CWV) | 10% | 50 | 5.0 |
| AI Search Readiness | 10% | 30 | 3.0 |
| Images | 5% | 70 | 3.5 |
| **TOTAL** | **100%** | — | **42 → 47** |

---

## Executive Summary

Motion Clinic has solid foundational content and strong branding, but several **critical technical SEO errors** are silently blocking its ranking potential. The most urgent issue is that the `MedicalOrganization` schema is fully coded but **never injected into any page** — it's dead code. Combined with missing canonical tags, zero Open Graph tags, and extremely thin blog content (80–150 words per post), the site is leaving significant organic traffic on the table for high-value queries like "cirugía robótica de rodilla Argentina."

### Top 5 Critical Issues
1. Schema defined in code but **never rendered on any page** (schema prop not passed in index.astro)
2. **No canonical tags** on any page — duplicate content risk
3. **No Open Graph / Twitter Card tags** — every social share shows blank previews
4. **Blog listing `/blog/`** uses the latest post's title/meta instead of its own page metadata
5. Blog articles have **80–150 words** each — well below the 600+ word threshold for ranking

### Top 5 Quick Wins
1. Pass `schema={medicalOrgSchema}` in `index.astro` (5 min fix, immediate schema activation)
2. Add canonical tag to `Layout.astro` (15 min fix)
3. Add Open Graph tags to `Layout.astro` (20 min fix)
4. Create a proper title/description for `/blog/` listing page (10 min fix)
5. Fix `site.webmanifest` — rename from "MyWebSite" to "Motion Clinic" (2 min fix)

---

## Technical SEO

### Crawlability & Indexability
| Check | Status | Detail |
|---|---|---|
| robots.txt | ✅ Pass | `Allow: *`, sitemap correctly referenced |
| Sitemap | ⚠️ Partial | Exists at `/sitemap-0.xml`, 13 URLs, but missing `lastmod`, `changefreq`, `priority` |
| Meta robots | ⚠️ Missing | No `<meta name="robots">` tag; relying solely on robots.txt |
| Canonical tags | ❌ Missing | Not present on any page — duplicate content risk |
| HTTPS | ✅ Pass | Site served over HTTPS |
| HTML lang | ✅ Pass | `<html lang="es">` correctly set |
| Charset | ✅ Pass | UTF-8 declared |
| Viewport | ✅ Pass | `width=device-width` set |

### Hreflang / Internationalization
| Check | Status | Detail |
|---|---|---|
| Hreflang tags | ❌ Missing | Nav shows EN/ES language switch but no `hreflang` tags anywhere |
| Language targeting | ⚠️ Risk | Bilingual content without hreflang can cause international ranking confusion |

### Security Headers
Not verifiable without server access, but Astro SSG on Vercel typically lacks:
- `X-Frame-Options`
- `Content-Security-Policy`
- `X-Content-Type-Options`

Recommend adding via `vercel.json` headers config.

---

## Content Quality

### Homepage
- **H1:** "Primer Centro Integral de Cirugía Robótica en Cadera y Rodilla de Argentina." ✅ (inside hero)
- **H2:** "The Perfect Surgery" (English — language mismatch with `lang="es"` page)
- Hero content is **hidden behind JavaScript animation** — content loads only after GSAP + Three.js init. Google can crawl it (Astro pre-renders), but delayed visual reveal may affect perceived CWV.

### Blog Content — CRITICAL ISSUE
All 9 blog posts are stored in a single JSON file (`blogData.json`). Each article consists of a **single paragraph** of 80–150 words. This is classified as **thin content** by Google's quality raters.

| Blog Post | Est. Word Count | Quality Assessment |
|---|---|---|
| Cirugía robótica MAKO | ~90 words | Thin |
| Robot MAKO | ~80 words | Thin |
| Reemplazo de cadera MAKO | ~80 words | Thin |
| Reemplazo de rodilla MAKO | ~85 words | Thin |
| Cirugía robótica de cadera | ~75 words | Thin |
| Cirugía robótica de rodilla | ~85 words | Thin |
| Artrosis de cadera | ~80 words | Thin |
| Artrosis de rodilla | ~85 words | Thin |
| Innovación médica en Palermo | ~90 words | Thin |

**Recommended minimum:** 600–1,200 words per post for competitive medical queries.

### E-E-A-T Signals
| Signal | Status | Detail |
|---|---|---|
| Author attribution | ❌ Missing | No author name/bio on blog posts |
| Doctor credentials | ⚠️ Partial | Biography section on homepage; not on blog pages |
| Medical credentials mentioned | ✅ Present | Fellowship Hospital for Special Surgery NY, Harvard, Stanford |
| External citations | ⚠️ Partial | Source links present (iprofesional, mercado.com.ar) but no inline citations |
| About/team page | ❌ Missing | No dedicated `/sobre-nosotros` or `/dr-anania` page |
| Reviews/testimonials | ✅ Present | TestifyWrapp component on homepage |

### Blog Listing Page `/blog/` — BUG
The blog listing page renders `latestBlog.SEOtitle` and `latestBlog.metadescription` as the page `<title>` and `<meta description>`. When "Cirugía robótica MAKO" is the latest post, the `/blog/` URL uses that post's SEO title instead of a proper "Blog de Motion Clinic — Noticias sobre Cirugía Robótica" title. This causes:
- Duplicate `<title>` between `/blog/` and `/blog/cirugia-robotica-mako/`
- Confusing search appearance for the blog index

---

## On-Page SEO

### Title Tags
| Page | Title | Length | Assessment |
|---|---|---|---|
| Homepage | "Motion Clinic \| Centro de Cirugía Robótica en Argentina" | 56 chars | ✅ Good |
| Contacto | "Contacto \| Motion Clinic" | 25 chars | ⚠️ Too short, not keyword-rich |
| Blog index | Uses latest post title | varies | ❌ Wrong — see above |
| Blog: MAKO | "Cirugía Robótica MAKO \| Motion Clinic" | 37 chars | ✅ Good |
| Blog: Artrosis rodilla | "Artrosis de Rodilla: Causas, Síntomas y Tratamiento \| Motion Clinic" | 68 chars | ✅ Good |

### Meta Descriptions
| Page | Description | Length | Assessment |
|---|---|---|---|
| Homepage (default) | "Cirugía ortopédica y robótica en Argentina con tecnología avanzada..." | 70 chars | ⚠️ Short, generic |
| Contacto | "Contactá a Motion Clinic para consultar lo que quieras..." | 57 chars | ⚠️ Weak CTA, vague |
| Blog posts | Individual meta descriptions in blogData.json | 100–160 chars | ✅ Generally good |

### Heading Hierarchy
| Page | Issue |
|---|---|
| Homepage | H2 "The Perfect Surgery" appears before H1 in DOM order. H1 is semantically correct but in a visually secondary position. |
| Blog posts | H1 = blog title (short, ~3 words). No H2 subheadings within article body. |
| Contacto | H1 = "Hacenos tu consulta" ✅ |

### Internal Linking
- Homepage has only **1 internal link** to a blog post (to "ya-se-hacen-en-argentina...")
- 8 other blog posts are **not linked from the homepage**
- No breadcrumb navigation
- Blog posts link to other blog posts via the "Blog de noticias" section ✅
- No links from blog posts back to treatment/service sections on homepage

### Missing Pages
- No `/sobre-nosotros` or `/dr-andres-anania` page
- No individual `/tratamientos/[slug]` pages — all 7 treatments only described in the homepage scroll
- No `/blog/` listing with all articles accessible

---

## Schema / Structured Data

### Current Implementation
A `MedicalOrganization` schema is defined in `src/schemas/medicalOrganization.ts` but is **never used**:

```astro
// index.astro — CURRENT (broken)
<Layout>   ← schema prop not passed, renders nothing

// index.astro — NEEDED
import medicalOrgSchema from '@/schemas/medicalOrganization';
<Layout schema={medicalOrgSchema}>
```

**Result:** Zero structured data on any page of the site.

### Schema Quality Issues (once fixed)
| Issue | Detail |
|---|---|
| Wrong logo URL | Schema has `"logo": "https://motionclinic.com.ar/logo.png"` but the file is `/svg/logo.svg` |
| Missing phone | No `"telephone"` field |
| Missing street address | `"streetAddress"` is empty — only city/region |
| Missing opening hours | No `"openingHoursSpecification"` |
| Missing geo coordinates | No `"geo"` field for local search |
| Missing priceRange | Not required but helpful for medical context |

### Missing Schema Types
| Schema Type | Priority | Reason |
|---|---|---|
| `Person` (Dr. Andrés Anania) | High | E-E-A-T signal for medical content |
| `BlogPosting` / `Article` | High | Needed on all blog pages |
| `MedicalProcedure` (per treatment) | Medium | Each treatment deserves its own schema |
| `BreadcrumbList` | Medium | Navigation signal to Google |
| `FAQPage` | Medium | High-value for "cirugia robotica" queries |
| `LocalBusiness` | High | Needed alongside MedicalOrganization for local pack |

---

## Performance (Core Web Vitals)

*Field data unavailable (no Google API integration). Estimates based on code analysis.*

### LCP Risk Factors
- **Three.js WebGL shader** loads from CDN (`cdnjs.cloudflare.com/three.js/r128`) on every homepage visit — external CDN dependency adds latency
- Hero image (`/img/welcome.webp`) is loaded inside JavaScript (Three.js texture), not as a native `<img>` or `background-image` — **browser cannot preload it**
- `<link rel="preload">` not used for LCP image
- GSAP imported dynamically, adding JS parse time before content reveal

### CLS Risk Factors
- Hero content starts at `opacity: 0` and animates in — if GSAP/Three.js fails, content stays invisible
- Material Symbols font loaded from Google Fonts API (no `font-display: swap`)

### Render-Blocking Resources
| Resource | Type | Risk |
|---|---|---|
| `fonts.googleapis.com/css2?family=Material+Symbols` | External CSS | ⚠️ Render-blocking |
| Three.js r128 from CDN (dynamically added) | External JS | ⚠️ LCP delay |

### Quick Performance Wins
1. Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `fonts.gstatic.com`
2. Add `<link rel="preload" as="image" href="/img/welcome.webp">` for LCP
3. Add `font-display: swap` to Material Symbols loading
4. Consider self-hosting Three.js or using a newer lightweight alternative

---

## Images

| Check | Status | Detail |
|---|---|---|
| WebP adoption | ⚠️ Partial | Most images converted to .webp. Some gallery images still referenced as .jpg in blogData.json (e.g., `gallery5.jpg` for blog 6) |
| Alt text — clinic images | ✅ Good | Descriptive Spanish alt text ("Clinica de Rehabilitación en Buenos Aires") |
| Alt text — blog thumbnails | ⚠️ Basic | Alt = blog title (e.g., "Cirugía robótica MAKO") — acceptable but could be more descriptive |
| Alt text — logo (footer) | ✅ Good | `alt="Motion Clinic"` |
| Lazy loading | ✅ Present | `loading="lazy"` on blog card thumbnails |
| Image sizing | ⚠️ Unknown | Multiple video files in public (`4K upscaled`, `video.mp4`, `AndresVideo_6.00x_7680x4320`) — large files may impact hosting bandwidth |
| Favicon | ✅ Good | Multiple sizes present (96px, SVG, apple-touch-icon) but not linked in `<head>` |

**Note:** Favicon files exist in `/public/` but `Layout.astro` has no `<link rel="icon">` tag. Browsers will auto-discover `/favicon.ico` but may not find the SVG or 96px variants.

---

## AI Search Readiness (GEO / LLM Visibility)

| Signal | Status | Detail |
|---|---|---|
| llms.txt | ❌ Missing | No `/llms.txt` file to guide AI crawlers |
| Content depth | ❌ Poor | 80–150 words per article — too thin for AI citation |
| Structured facts | ⚠️ Partial | Credential list is present on homepage but not machine-readable |
| Author expertise signals | ❌ Weak | No Person schema, no dedicated bio page |
| Citability | ⚠️ Low | Short articles with no statistics, studies, or original data |
| Brand mention anchors | ⚠️ Partial | "Motion Clinic" and "Andrés Anania" mentioned but not linked externally |
| External citations | ⚠️ Partial | Source links (iprofesional, mercado.com.ar) present but not inline |

---

## Local SEO

| Signal | Status | Detail |
|---|---|---|
| NAP on page | ❌ Missing | No phone number or street address visible on any page |
| NAP in schema | ❌ Incomplete | Schema has city/region only; no street address, phone, or postal code |
| Google Business Profile signals | Unknown | Cannot verify without GBP access |
| WhatsApp CTA | ✅ Present | WhatsApp button with phone embedded in href |
| Location mentions | ⚠️ Partial | "Buenos Aires", "Palermo" mentioned in blog and schema but not in homepage body text |
| Service area | ✅ Present | `areaServed: Argentina` in schema (once schema is fixed) |

---

## Additional Issues Found

### WebManifest Branding
`/public/site.webmanifest`:
- `"name": "MyWebSite"` ← **placeholder never updated**
- `"short_name": "MySite"` ← **placeholder never updated**

This appears in PWA install prompts and browser tab context menus.

### Open Graph — Completely Missing
Every page is missing all social sharing metadata:
```html
<!-- None of these exist anywhere -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="..." />
<meta name="twitter:card" content="summary_large_image" />
```
Every WhatsApp/LinkedIn/Instagram link share will show a blank preview with no image.

### Env Config Mismatch
`astro.config.mjs` sets `vite.envPrefix: 'EMAIL_'` but `ContactForm.astro` uses `import.meta.env.PUBLIC_EMAIL_*`. Astro's `PUBLIC_` prefix is handled separately from Vite's envPrefix. This may be working by accident or may cause issues in some environments.

---

## Sitemap Analysis

**URL:** `https://motionclinic.com.ar/sitemap-0.xml`
**Total pages:** 13
**Missing from sitemap:** None detected — all pages are included
**Issues:**
- No `lastmod` dates — Google uses these to prioritize recrawling
- No `priority` values — missed signal for crawl budget
- `/blog/` index page included, but it duplicates content with individual blog slugs

---

## Summary Score by Category

```
Technical SEO      ████████████░░░░░░░░░░  45/100
Content Quality    ███████░░░░░░░░░░░░░░░  35/100
On-Page SEO        ███████████░░░░░░░░░░░  55/100
Schema/Struct.     ███░░░░░░░░░░░░░░░░░░░  15/100
Performance        ██████████░░░░░░░░░░░░  50/100
AI Readiness       ██████░░░░░░░░░░░░░░░░  30/100
Images             ██████████████░░░░░░░░  70/100
```

**Overall: 47/100**
