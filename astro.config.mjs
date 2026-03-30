import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://motionclinic.com.ar",
  integrations: [
    tailwind(),
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    envPrefix: 'EMAIL_',
  },
});