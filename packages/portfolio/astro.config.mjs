import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://saintkim12.github.io',
  base: process.env.NODE_ENV === 'production' ? '/portfolio' : '/',
  outDir: '../../dist/portfolio',
  server: {
    host: '0.0.0.0',
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
