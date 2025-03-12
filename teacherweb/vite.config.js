import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    '/users': {
      target: 'https://citsciapp.pythonanywhere.com',
      changeOrigin: true,
      rewrite: (path) => path,
    },
    '/projects': {
      target: 'https://citsciapp.pythonanywhere.com',
      changeOrigin: true,
      rewrite: (path) => path, 
    },
    '/classes': {
      target: 'https://citsciapp.pythonanywhere.com',
      changeOrigin: true,
      rewrite: (path) => path, 
    },
    '/class': {
      target: 'https://citsciapp.pythonanywhere.com',
      changeOrigin: true,
      rewrite: (path) => path, 
    },
    '/observations': {
      target: 'https://citsciapp.pythonanywhere.com',
      changeOrigin: true,
      rewrite: (path) => path, 
    },
  },
})
