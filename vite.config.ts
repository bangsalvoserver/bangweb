import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), eslint(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    rollupOptions: {
      input: {
        appGame: fileURLToPath(new URL('./index.html', import.meta.url)),
        appTracking: fileURLToPath(new URL('./tracking.html', import.meta.url)),
        appAllCards: fileURLToPath(new URL('./all_cards.html', import.meta.url))
      }
    }
  }
});