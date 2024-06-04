import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/Montevideo-Danger/',
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
