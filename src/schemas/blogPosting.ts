interface BlogPost {
  id: number;
  title: string;
  date: string;
  img: string;
  develop: string;
  source?: string;
  SEOtitle: string;
  metadescription: string;
}

export function createBlogPostingSchema(blog: BlogPost, slug: string) {
  const siteUrl = "https://motionclinic.com.ar";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    "headline": blog.SEOtitle,
    "description": blog.metadescription,
    "image": `${siteUrl}${blog.img}`,
    "datePublished": blog.date,
    "dateModified": blog.date,

    "author": {
      "@type": "Physician",
      "@id": `${siteUrl}/#dr-andres-anania`,
      "name": "Andrés Anania",
      "url": `${siteUrl}/#biography`
    },

    "publisher": {
      "@type": "Organization",
      "@id": `${siteUrl}/#medical-organization`,
      "name": "Motion Clinic",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/svg/logo.svg`
      }
    },

    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}/`
    },

    "url": `${siteUrl}/blog/${slug}/`,

    "inLanguage": "es-AR",

    "about": {
      "@type": "MedicalCondition",
      "name": blog.title
    }
  };
}

export function createBreadcrumbSchema(blogTitle: string, slug: string) {
  const siteUrl = "https://motionclinic.com.ar";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": `${siteUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blogTitle,
        "item": `${siteUrl}/blog/${slug}/`
      }
    ]
  };
}
