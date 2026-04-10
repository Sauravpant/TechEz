import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: [
      "@radix-ui/react-separator",
      "@dnd-kit/utilities",
      "@dnd-kit/modifiers",
      "@dnd-kit/core",
      "@dnd-kit/sortable",
      "@tabler/icons-react",
      "@tanstack/react-table",
    ],
  },
});
