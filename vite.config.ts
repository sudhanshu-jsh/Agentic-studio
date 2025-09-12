import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Tempo plugin for automatic route generation
function tempo() {
  return {
    name: 'tempo-routes',
    resolveId(id: string) {
      if (id === 'tempo-routes') {
        return id;
      }
    },
    load(id: string) {
      if (id === 'tempo-routes') {
        // Generate routes for storyboards with absolute paths
        const routes = `
import { lazy } from 'react';

const routes = [
  {
    path: '/tempobook/storyboards/cd16afd7-113d-4fbf-87cd-f51ceeaef6c0',
    element: lazy(() => import('/src/tempobook/storyboards/cd16afd7-113d-4fbf-87cd-f51ceeaef6c0/index.tsx'))
  }
];

export default routes;
        `;
        return routes;
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), tempo()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
    host: true,
    port: 5173,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "esnext",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
          ],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});