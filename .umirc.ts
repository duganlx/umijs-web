import { defineConfig } from "umi";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/tools", component: "tools/index" },
    { path: "/*", component: "@/pages/404" },
  ],
  npmClient: "yarn",
  chainWebpack(config) {
    config.plugin("monaco").use(MonacoWebpackPlugin, [
      {
        languages: ["yaml"],
      },
    ]);
  },
});
