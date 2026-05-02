import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/choicemaker-portal/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'images/*.png'],
      manifest: {
        name: 'Choicemaker Directory',
        short_name: 'Choicemaker',
        description: 'Find your sanctuary. A directory of Choicemaker experiences.',
        theme_color: '#FAFAED',
        background_color: '#FAFAED',
        display: 'standalone',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/5262/5262013.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
