import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/tools", component: "tools/index" },
    { path: "/*", component: "@/pages/404" },
  ],
  npmClient: "yarn",
});
