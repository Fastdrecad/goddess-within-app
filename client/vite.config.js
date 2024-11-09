import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create chunks based on dependencies
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "vendor-react";
            }
            if (id.includes("redux")) {
              return "vendor-redux";
            }
            if (id.includes("react-icons")) {
              return "vendor-icons";
            }
            // All other dependencies go into a shared vendor chunk
            return "vendor";
          }
        }
      }
    },
    assetsDir: "assets",
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@layout": path.resolve(__dirname, "./src/components/layout"),
      "@components": path.resolve(__dirname, "./src/components")
    }
  }
});
