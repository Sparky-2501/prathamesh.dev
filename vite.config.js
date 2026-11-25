import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "/" works for Vercel, Netlify and Render static sites.
// For GitHub Pages under /repo-name/, change it to base: "/repo-name/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
