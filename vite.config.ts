import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [solidPlugin() /*, visualizer({ open: true }) */],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5170,
  },
  build: {
    target: 'esnext',
  },
});
