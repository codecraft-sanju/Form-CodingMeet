import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://form-codingmeet.onrender.com',
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
});
