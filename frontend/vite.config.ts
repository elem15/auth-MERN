import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from "https";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // target: 'https://jsonplaceholder.typicode.com',
        target: 'https://auth-mern-0pty.onrender.com/api',
        secure: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        agent: new http.Agent()
      },
    },
  },  
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     external: ["core-js-pure"],
  //   }
  // }
})
