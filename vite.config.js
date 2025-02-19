import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', 
  plugins: [
    react(), 
    svgr()
  ],
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['babel-runtime/regenerator']
    }
  },
  define: {
    'process.env': {}, //this ensures compatibility if you're using process.env elsewhere
  },
})
