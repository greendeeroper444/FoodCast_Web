import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr()
  ],
  build: {
    rollupOptions: {
      external: ['babel-runtime/regenerator'],
      input: {
        main: 'index.html'
      }
    }
  },
  define: {
    'process.env': {}, //this ensures compatibility if you're using process.env elsewhere
  },
  server: {
    fs: {
      allow: ['public']
    }
  }
})
