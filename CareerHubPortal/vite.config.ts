import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',              // VERY IMPORTANT
  build: {
    outDir: 'dist',       // explicit output
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: true
  }
});
