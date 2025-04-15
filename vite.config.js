import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills-node';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  base: mode === 'production' ? '/The-rep-calculator/' : '/',
  resolve: {
    alias: {
        '@': '/src',
    },
  },
  optimizeDeps: {
    include: ['crypto'],
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(),
      ],
    },
  },
}));