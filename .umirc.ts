import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    {path: "/*", component: "@/pages/404"},
    
  ],
  npmClient: 'yarn',
});
