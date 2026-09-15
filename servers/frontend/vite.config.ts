import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, "../../");
  const env = loadEnv(mode, envDir, "");
  const port = Number(env.VITE_PORT) || 5173;

  return {
    plugins: [react()],
    base: "/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "lucide-react/icons": path.resolve(__dirname, "./node_modules/lucide-react/dist/esm/icons"),
      },
    },
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      },
    },
    server: {
      port,
      host: "0.0.0.0",
      open: true,
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      chunkSizeWarningLimit: 300,
    },
    preview: {
      port,
      host: "0.0.0.0",
    },
    envDir,
  };
});
