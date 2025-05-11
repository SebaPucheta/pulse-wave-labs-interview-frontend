import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import configs from 'react-youtube-dom';

export default defineConfig({
  plugins: [react(), configs({development: true})],
  assetsInclude: ['**/*.mp3'], // Allow Vite to handle .mp3 files as static assets
  define: {
    global: 'window',
  },
  build: {
    minify: false,
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    disabled: true
  },
});
