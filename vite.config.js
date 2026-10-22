import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/leaflet/")) return "leaflet";
          if (
            id.includes("/node_modules/chart.js/") ||
            id.includes("/node_modules/react-chartjs-2/")
          ) {
            return "charts";
          }
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8787",
    },
  },
});
