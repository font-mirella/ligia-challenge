import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works from any host or sub-path
// (Vercel, GitHub Pages under /ligia-challenge/, or a plain file server).
export default defineConfig({
  base: './',
  plugins: [react()],
});
