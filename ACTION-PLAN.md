# SEO Action Plan — motionclinic.com.ar
**Generated:** 2026-03-30
**Priority order:** Critical → High → Medium → Low

---

## CRITICAL — Fix Immediately

### C1: Activate MedicalOrganization Schema
**File:** `src/pages/index.astro` + `src/schemas/medicalOrganization.ts`
**Effort:** 10 min
**Impact:** Schema appears in Google Search results, rich snippets enabled

The schema is fully coded but the prop is never passed. Two changes required:

1. Import and pass schema in `index.astro`:
```astro
---
import medicalOrgSchema from '@/schemas/medicalOrganization';
---
<Layout schema={medicalOrgSchema}>
```

2. Fix the logo URL in `src/schemas/medicalOrganization.ts`:
```ts
"logo": "https://motionclinic.com.ar/svg/logo.svg",  // was /logo.png
```

3. Add missing fields to schema:
```ts
"telephone": "+54-11-XXXX-XXXX",
"address": {
  "@type": "PostalAddress",
  "streetAddress": "YOUR STREET ADDRESS",
  "addressLocality": "Palermo",
  "addressRegion": "Buenos Aires",
  "postalCode": "CXXX",
  "addressCountry": "AR"
},
```

---

### C2: Add Canonical Tags
**File:** `src/layouts/Layout.astro`
**Effort:** 10 min
**Impact:** Eliminates duplicate content risk across all 13 pages

Add to `<head>` in `Layout.astro`:
```astro
---
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<link rel="canonical" href={canonicalURL} />
```

---

### C3: Add Open Graph + Twitter Card Tags
**File:** `src/layouts/Layout.astro`
**Effort:** 20 min
**Impact:** Every social share (WhatsApp, LinkedIn, Instagram) shows rich preview

```astro
---
const {
  title = "Motion Clinic | Centro de Cirugía Robótica en Argentina",
  description = "...",
  image = "/img/welcome.webp",
  schema = null
} = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(image, Astro.site)} />
<meta property="og:locale" content="es_AR" />
<meta property="og:site_name" content="Motion Clinic" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={new URL(image, Astro.site)} />
```

For blog posts, pass the post image from `[slug].astro`:
```astro
<Layout title={blog.SEOtitle} description={blog.metadescription} image={blog.img}>
```

---

### C4: Fix Blog Listing Page `/blog/`
**File:** `src/pages/blog.astro`
**Effort:** 10 min
**Impact:** Eliminates duplicate title/description with individual blog posts

```astro
---
// Replace dynamic title with static blog-page metadata
---
<Layout
  title="Blog de Motion Clinic — Cirugía Robótica y Ortopedia"
  description="Artículos sobre cirugía robótica de cadera y rodilla, tecnología MAKO, artrosis y tratamientos ortopédicos en Argentina."
>
```

---

### C5: Fix WebManifest Placeholder Names
**File:** `public/site.webmanifest`
**Effort:** 2 min

```json
{
  "name": "Motion Clinic",
  "short_name": "Motion Clinic",
  ...
}
```

---

## HIGH — Fix Within 1 Week

### H1: Add BlogPosting Schema to Blog Posts
**File:** `src/pages/blog/[slug].astro`
**Effort:** 45 min
**Impact:** Article rich snippets in search results; E-E-A-T signal

Create `src/schemas/blogPosting.ts`:
```ts
export function createBlogPostingSchema(blog: BlogPost, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.SEOtitle,
    "description": blog.metadescription,
    "image": `${siteUrl}${blog.img}`,
    "datePublished": blog.date,
    "author": {
      "@type": "Person",
      "name": "Andrés Anania",
      "url": `${siteUrl}/#biography`,
      "jobTitle": "Cirujano Ortopedista",
      "affiliation": "Motion Clinic"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Motion Clinic",
      "logo": `${siteUrl}/svg/logo.svg`
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`
    }
  };
}
```

---

### H2: Expand Blog Content (Thin Content Fix)
**File:** `src/data/blogData.json`
**Effort:** 4–8 hours per post
**Impact:** Major ranking improvement for target queries

Each blog post needs minimum **600–1,200 words** structured with H2 and H3 subheadings. Recommended structure:
```
H1: [Blog Title]
  H2: ¿Qué es [topic]?
  H2: Síntomas y diagnóstico
  H2: Opciones de tratamiento
  H2: ¿Cuándo es necesaria la cirugía?
  H2: El rol de la tecnología robótica
  H2: Recuperación y resultados
  H2: Preguntas frecuentes (FAQPage schema opportunity)
```

Consider migrating from JSON to `.md` / `.mdx` files for better content management.

---

### H3: Add Person Schema for Dr. Andrés Anania
**File:** `src/schemas/` (new file) + `src/pages/index.astro`
**Effort:** 30 min
**Impact:** Author authority signal, E-E-A-T, possible Knowledge Panel

```ts
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Andrés Anania",
  "jobTitle": "Cirujano Traumatólogo — Cadera y Rodilla",
  "worksFor": { "@id": "https://motionclinic.com.ar/#medical-organization" },
  "alumniOf": ["Hospital for Special Surgery, New York", "IAE Business School"],
  "url": "https://motionclinic.com.ar/#biography",
  "sameAs": ["https://www.linkedin.com/in/andres-anania"],
};
```

---

### H4: Add Hreflang Tags
**File:** `src/layouts/Layout.astro`
**Effort:** 20 min
**Impact:** Prevents international ranking issues; signals bilingual capability

```astro
<link rel="alternate" hreflang="es-AR" href={canonicalURL} />
<link rel="alternate" hreflang="es" href={canonicalURL} />
<!-- If EN version exists: -->
<!-- <link rel="alternate" hreflang="en" href={enURL} /> -->
<link rel="alternate" hreflang="x-default" href={canonicalURL} />
```

---

### H5: Add Favicon Link Tags to Layout
**File:** `src/layouts/Layout.astro`
**Effort:** 5 min
**Impact:** Ensures all browsers load the correct favicon

```astro
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

---

### H6: Add Phone & Address to Page Footer
**File:** `src/components/Footer.astro`
**Effort:** 30 min
**Impact:** NAP consistency, local search ranking, user trust

Add a visible NAP block:
```html
<address class="not-italic text-sm text-zinc-500 text-center">
  <p>Palermo, Buenos Aires, Argentina</p>
  <a href="tel:+5491139266548">+54 11 3926-6548</a>
</address>
```

---

## MEDIUM — Fix Within 1 Month

### M1: Add Performance Optimizations
**File:** `src/layouts/Layout.astro`
**Effort:** 1 hour

```astro
<!-- Preconnect for Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Preload LCP hero image -->
<link rel="preload" as="image" href="/img/welcome.webp" fetchpriority="high" />

<!-- DNS prefetch for Three.js CDN -->
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
```

Also add `font-display: swap` to Material Symbols CSS load.

---

### M2: Add BreadcrumbList Schema to Blog Posts
**File:** `src/pages/blog/[slug].astro`
**Effort:** 20 min

```ts
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://motionclinic.com.ar/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://motionclinic.com.ar/blog/" },
    { "@type": "ListItem", "position": 3, "name": blog.title, "item": canonicalURL }
  ]
};
```

---

### M3: Fix Blog Image References (.jpg → .webp)
**File:** `src/data/blogData.json`
**Effort:** 10 min

Blog post 6 references `/img/gallery/gallery5.jpg` — the `.webp` version exists. Update:
```json
"img": "/img/gallery/gallery5.webp"
```

---

### M4: Add Sitemap Metadata
**Effort:** 10 min (via astro sitemap config)

In `astro.config.mjs`:
```js
sitemap({
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
})
```

---

### M5: Add FAQPage Schema on Homepage
**File:** `src/pages/index.astro`
**Effort:** 45 min
**Impact:** FAQ rich snippets for "cirugía robótica" queries

Common patient questions to include:
- ¿Qué es la cirugía robótica MAKO?
- ¿Cuánto dura la recuperación de un reemplazo de cadera?
- ¿La cirugía robótica está cubierta por obra social?
- ¿Cuántas cirugías ha realizado el Dr. Anania?

---

### M6: Create llms.txt for AI Search
**File:** `public/llms.txt` (new file)
**Effort:** 30 min
**Impact:** Improves AI citation in ChatGPT, Perplexity, Claude

```markdown
# Motion Clinic

> Motion Clinic es el primer centro integral de cirugía robótica en cadera y rodilla de Argentina. Dirigido por el Dr. Andrés Anania, traumatólogo con fellowship en el Hospital for Special Surgery de Nueva York.

## Especialidades
- Cirugía robótica MAKO de cadera y rodilla
- Reemplazo articular (convencional y robótico)
- Medicina regenerativa (PRP, células madre)
- Medicina deportiva
- Cirugía mini invasiva

## Contacto
- Ubicación: Palermo, Buenos Aires, Argentina
- Web: https://motionclinic.com.ar
- Instagram: @motionclinic.ba

## Blog
- https://motionclinic.com.ar/blog/
```

---

### M7: Improve Contact Page Meta
**File:** `src/pages/contacto.astro`
**Effort:** 5 min

Replace generic title/description:
```astro
<Layout
  title="Contacto — Cirujano Ortopedista en Buenos Aires | Motion Clinic"
  description="Consultá al Dr. Andrés Anania sobre cirugía robótica de cadera y rodilla en Buenos Aires. Respondemos a la brevedad por WhatsApp, email o formulario."
>
```

---

## LOW — Backlog

### L1: Create Individual Treatment Pages
Create `/tratamientos/cirugia-robotica-mako/`, `/tratamientos/medicina-regenerativa/`, etc. for each of the 7 treatments. Currently they only exist as homepage scroll sections — no indexable landing pages.

### L2: Create Doctor Biography Page
Create `/dr-andres-anania/` with full credentials, academic background, publications. Critical for E-E-A-T in medical content.

### L3: Update Three.js to Current Version
Three.js r128 (used via CDN) is significantly outdated. Latest stable is r170+. Consider self-hosting or using a modern alternative.

### L4: Address Security Headers
Add via `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### L5: Add Structured Heading Hierarchy to Blog Articles
Blog article bodies currently have no H2/H3 subheadings within `blog.develop`. When expanding content (H2 above), add proper subheadings to the JSON or migrate to MDX.

### L6: Google Search Console + Analytics Setup
Verify ownership in GSC and submit sitemap. Connect GA4 for organic traffic monitoring.

---

## Implementation Roadmap

```
Week 1 (Critical):   C1, C2, C3, C4, C5
Week 2 (High):       H1, H3, H4, H5, H6
Week 3 (High cont):  H2 (start blog expansion — 2 posts/week)
Week 4 (Medium):     M1, M2, M3, M4, M5, M6, M7
Month 2:             H2 (continue blog), L1, L2
Month 3:             L3, L4, L5, L6
```

---

*Report generated by Claude Code SEO Audit. Based on source code analysis + live site crawl of https://motionclinic.com.ar/*
