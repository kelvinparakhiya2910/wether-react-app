import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "./index.html",
    },
  },
  server: {
    historyApiFallback: true, // Ensures routing works on refresh
  },
});