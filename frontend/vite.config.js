import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9030,
    allowedHosts: true,
    strictPort: true,
    open: false,
    watch: {
      ignored: ['**/*.mp4', '**/*.webm']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9035',
        changeOrigin: true
      }
    }
  }
});
