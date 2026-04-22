import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pcc-paper.prozensky.com',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
});
