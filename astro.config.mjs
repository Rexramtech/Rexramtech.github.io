import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.SITE_URL || "https://sergioybarbara.com";
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site,
  base,
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://script.google.com https://docs.google.com",
        "frame-src 'self' https://docs.google.com",
        "form-action 'self' https://script.google.com https://docs.google.com",
      ],
      styleDirective: {
        resources: [
          "'self'",
          "https://fonts.googleapis.com",
        ],
      },
    },
  },
});
