// vite.config.ts
import { defineConfig } from "file:///Users/albaud/Desktop/Coding++/Crypto/ICP/TS_Bootcamp/node_modules/vite/dist/node/index.js";
import { svelte, vitePreprocess } from "file:///Users/albaud/Desktop/Coding++/Crypto/ICP/TS_Bootcamp/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import environment from "file:///Users/albaud/Desktop/Coding++/Crypto/ICP/TS_Bootcamp/node_modules/vite-plugin-environment/dist/index.js";
import dotenv from "file:///Users/albaud/Desktop/Coding++/Crypto/ICP/TS_Bootcamp/node_modules/dotenv/lib/main.js";
dotenv.config();
var vite_config_default = defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true
      }
    }
  },
  plugins: [
    svelte({
      preprocess: vitePreprocess()
    }),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment({ BACKEND_CANISTER_ID: "" })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWxiYXVkL0Rlc2t0b3AvQ29kaW5nKysvQ3J5cHRvL0lDUC9UU19Cb290Y2FtcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FsYmF1ZC9EZXNrdG9wL0NvZGluZysrL0NyeXB0by9JQ1AvVFNfQm9vdGNhbXAvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FsYmF1ZC9EZXNrdG9wL0NvZGluZysrL0NyeXB0by9JQ1AvVFNfQm9vdGNhbXAvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHN2ZWx0ZSwgdml0ZVByZXByb2Nlc3MgfSBmcm9tIFwiQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZVwiXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAndml0ZS1wbHVnaW4tZW52aXJvbm1lbnQnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJvb3Q6ICdzcmMnLFxuICBidWlsZDoge1xuICAgIG91dERpcjogJy4uL2Rpc3QnLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgZGVmaW5lOiB7XG4gICAgICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMjcuMC4wLjE6NDk0MycsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHN2ZWx0ZSh7XG4gICAgICBwcmVwcm9jZXNzOiB2aXRlUHJlcHJvY2VzcygpLFxuICAgIH0pLFxuICAgIGVudmlyb25tZW50KCdhbGwnLCB7IHByZWZpeDogJ0NBTklTVEVSXycgfSksXG4gICAgZW52aXJvbm1lbnQoJ2FsbCcsIHsgcHJlZml4OiAnREZYXycgfSksXG4gICAgZW52aXJvbm1lbnQoeyBCQUNLRU5EX0NBTklTVEVSX0lEOiAnJyB9KSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsUUFBUSxzQkFBc0I7QUFDdkMsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxZQUFZO0FBRW5CLE9BQU8sT0FBTztBQUVkLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxZQUFZLGVBQWU7QUFBQSxJQUM3QixDQUFDO0FBQUEsSUFDRCxZQUFZLE9BQU8sRUFBRSxRQUFRLFlBQVksQ0FBQztBQUFBLElBQzFDLFlBQVksT0FBTyxFQUFFLFFBQVEsT0FBTyxDQUFDO0FBQUEsSUFDckMsWUFBWSxFQUFFLHFCQUFxQixHQUFHLENBQUM7QUFBQSxFQUN6QztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
