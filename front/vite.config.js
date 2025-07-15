import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ open: true }),],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          antd: ['antd'],
          charts: ['chart.js'],
          date: ['date-fns', 'react-date-range'],
          firebase: ['firebase/app',
            'firebase/auth',
            'firebase/firestore',
            ],
          toast: ['react-toastify'],
          highlight: ['react-highlight-words'],
          axios: ['axios'],
          
        }
      }
    }
  }
});
