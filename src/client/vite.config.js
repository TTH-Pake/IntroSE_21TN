import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync("./src/cert/agent2-key.pem"),
      cert: fs.readFileSync("./src/cert/agent2-cert.pem"),
    },
  },
});
