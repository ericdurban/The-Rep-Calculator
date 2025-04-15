import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
import * as crypto from 'crypto';

// Only apply crypto polyfill if needed and if we're in a Node.js environment
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  if (!globalThis.crypto) {
    globalThis.crypto = crypto.webcrypto;
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  base: mode === 'production' ? '/The-rep-calculator/' : '/',
  resolve: {
    alias: {
        '@': '/src',
        crypto: 'crypto-browserify',
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