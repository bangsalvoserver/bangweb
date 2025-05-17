import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), viteTsconfigPaths(), svgrPlugin(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        appGame: fileURLToPath(new URL('./index.html', import.meta.url)),
        appTracking: fileURLToPath(new URL('./tracking.html', import.meta.url))
      }
    }
  }
});