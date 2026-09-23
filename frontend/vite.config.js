import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9020,
    allowedHosts: true,
    open: false,
    watch: {
      ignored: ['**/*.mp4', '**/*.webm']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9025',
        changeOrigin: true
      }
    }
  }
});
