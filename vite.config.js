import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Enables absolute imports
    }
  },
  build: {
    rollupOptions: {
      external: ['babel-runtime/regenerator']
    }
  },
  define: {
    'process.env': {}, // Ensures compatibility for process.env usage
  },
})
