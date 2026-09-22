import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "https://backend.atcchain.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/+/, "/"),
        headers: {
          Origin: "https://atcchain.com",
          Referer: "https://atcchain.com/",
        },
      },
      "^/(product|settings|banner)": {
        target: "https://backend.atcchain.com",
        changeOrigin: true,
        secure: false,
        headers: {
          Origin: "https://atcchain.com",
          Referer: "https://atcchain.com/",
        },
      },
    },
  },
});
