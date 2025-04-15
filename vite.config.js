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
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'] // Explicitly define extensions
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(),
      ],
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
    assetsInlineLimit: 0, // Disable inlining assets
  },
  // Ensure correct MIME types
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  }
}));