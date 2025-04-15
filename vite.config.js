import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';

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
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(),
      ],
    },
  },
}));