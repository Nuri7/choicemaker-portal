import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/choicemaker-portal/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'images/*.png'],
      manifest: {
        name: 'Choicemaker Directory',
        short_name: 'Choicemaker',
        description: 'Find your sanctuary. A directory of Choicemaker experiences.',
        theme_color: '#FAFAED',
        background_color: '#FAFAED',
        display: 'standalone',
        icons: [
          {
            src: 'logo.png',
            sizes: '1024x1024',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
