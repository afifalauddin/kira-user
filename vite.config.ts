import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";

import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components/", import.meta.url),
      ),
    },
  },

  plugins: [vue()],
});
