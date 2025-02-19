import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr()
  ],
  targets: [
    {
      src: 'public/_redirects', // Path to _redirects file
      dest: '.' // Copy to dist/
    }
  ],
  build: {
    rollupOptions: {
      external: ['babel-runtime/regenerator']
    }
  },
  define: {
    'process.env': {}, //this ensures compatibility if you're using process.env elsewhere
  },
})
