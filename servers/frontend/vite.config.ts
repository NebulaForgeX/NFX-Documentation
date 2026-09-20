import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const booksRoot = path.resolve(__dirname, "../../books");

function contentTypeFor(file: string): string {
  switch (path.extname(file)) {
    case ".json":
      return "application/json; charset=utf-8";
    case ".md":
      return "text/markdown; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function serveBooks(req: IncomingMessage, res: ServerResponse, next: () => void) {
  const raw = req.url?.split("?")[0] ?? "";
  if (!raw.startsWith("/books/")) {
    next();
    return;
  }
  const rel = decodeURIComponent(raw.slice("/books/".length));
  const file = path.resolve(booksRoot, rel);
  const root = path.resolve(booksRoot);
  if (!file.startsWith(root + path.sep) && file !== root) {
    res.statusCode = 403;
    res.end();
    return;
  }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    next();
    return;
  }
  res.setHeader("Content-Type", contentTypeFor(file));
  fs.createReadStream(file).pipe(res);
}

function serveBooksPlugin(): Plugin {
  return {
    name: "serve-nfx-books",
    configureServer(server) {
      server.middlewares.use(serveBooks);
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveBooks);
    },
  };
}

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, "../../");
  const env = loadEnv(mode, envDir, "");
  const port = Number(env.VITE_PORT) || 5173;

  return {
    plugins: [react(), serveBooksPlugin()],
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
      fs: {
        allow: [envDir],
      },
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
