import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          antd: ['antd'],
          charts: ['chart.js', 'react-chartjs-2'],
          date: ['date-fns', 'react-date-range'],
          firebase: ['firebase'],
          toast: ['react-toastify'],
          highlight: ['react-highlight-words'],
          axios: ['axios'],
          
        }
      }
    }
  }
});
