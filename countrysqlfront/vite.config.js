
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // If you're deploying under a subpath later, swap base accordingly.
  // base: "/country-sql-analytics/",
  base: "./",

  server: {
    proxy: {
      "/getsqlquery": {
        target:
          "https://sqlanalyticsapi20251228063713-hbdgcneufgambgdp.canadacentral-01.azurewebsites.net",
        secure: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getsqlquery/, ""),
      },
    },
  },

  // ✅ Build settings to produce fewer files
  build: {
    // Remove sourcemaps -> fewer *.map files
    sourcemap: false,

    // Merge all CSS into a single file
    cssCodeSplit: false,

    // Inline small assets to cut extra image/font files (tune the threshold)
    assetsInlineLimit: 8 * 1024, // 8 KB

    // Control chunking: one vendor + one app chunk
    rollupOptions: {
      output: {
        // Put all node_modules into a single vendor chunk
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
        // Optional: predictable names
        entryFileNames: "assets/app.[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash][extname]",
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
});
