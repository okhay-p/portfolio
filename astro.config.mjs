import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://oakkarphyo.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [mdx()],
  devToolbar: { enabled: false },
});
