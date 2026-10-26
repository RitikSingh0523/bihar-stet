import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Bihar STET Computer Science – Mock Tests & Notes',
        short_name: 'STET CS',
        description: '20 full mock tests, subject-wise tests and study notes for Bihar STET Paper II Computer Science.',
        theme_color: '#2d5bff',
        background_color: '#f1f5f9',
        display: 'standalone',
        orientation: 'any',
        start_url: './',
        scope: './',
        categories: ['education'],
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Learn', url: './#/learn', icons: [{ src: 'pwa-192.png', sizes: '192x192' }] },
          { name: 'Mock Tests', url: './#/home', icons: [{ src: 'pwa-192.png', sizes: '192x192' }] },
          { name: 'Subject Tests', url: './#/subjects', icons: [{ src: 'pwa-192.png', sizes: '192x192' }] },
        ],
      },
      workbox: {
        // Precache everything (app shell, notes chunks and all 43 test JSON files) so it works fully offline.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json,webmanifest}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
