import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.SITE_URL || "https://example.com";
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});
