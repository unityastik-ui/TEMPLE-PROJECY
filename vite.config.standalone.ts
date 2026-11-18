import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    define: {
      __IS_STANDALONE_DEMO__: true,
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'stub-pwa-register-for-standalone',
        resolveId(id) {
          if (id === 'virtual:pwa-register') {
            return '\0virtual:pwa-register';
          }
          return null;
        },
        load(id) {
          if (id === '\0virtual:pwa-register') {
            return 'export function registerSW() { return () => Promise.resolve(); }';
          }
          return null;
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      outDir: 'dist-standalone',
      emptyOutDir: true,
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          format: 'iife',
          entryFileNames: 'bundle.js',
          assetFileNames: 'bundle.[ext]',
        },
      },
    },
  };
});
