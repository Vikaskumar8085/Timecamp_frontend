import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "982d-2401-4900-1c19-d3ba-add3-31cd-51dc-d2c9.ngrok-free.app",
      "192.168.1.13:5173",
    ],
  },
});
