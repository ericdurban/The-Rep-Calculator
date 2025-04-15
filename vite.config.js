import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    nodePolyfills({
      crypto: true,
    }),
  ],
  base: mode === 'production' ? '/The-rep-calculator/' : '/',
  resolve: {
    alias: {
        '@': '/src',
    },
  },
}));