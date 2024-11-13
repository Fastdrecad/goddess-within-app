import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@layout": path.resolve(__dirname, "./src/components/layout"),
      "@components": path.resolve(__dirname, "./src/components")
    }
  }
});
