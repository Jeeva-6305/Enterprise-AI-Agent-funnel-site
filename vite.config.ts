import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9070,
    host: '0.0.0.0',
    allowedHosts: true,
    watch: {
      // Exclude backend directory from file watching to avoid ENOSPC error
      ignored: ['**/backend/**', '**/node_modules/**']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9075',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 9070,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
