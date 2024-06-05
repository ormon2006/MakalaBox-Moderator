import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteSass from "vite-plugin-sass";

export default defineConfig({
  plugins: [react(), viteSass()],
});
