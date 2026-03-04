import { defineConfig } from 'astro/config';
import remarkBreaks from 'remark-breaks';

export default defineConfig({
  site: 'https://saintkim12.github.io',
  base: process.env.NODE_ENV === 'production' ? '/portfolio' : '/',
  outDir: '../../dist/portfolio',
  server: {
    host: '0.0.0.0',
  },
  markdown: {
    remarkPlugins: [remarkBreaks],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
