import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://auth-mern-0pty.onrender.com',
        secure: false,
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },  
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["core-js-pure"],
    }
  }
})
