import { defineConfig } from "umi";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

export default defineConfig({
  routes: [
    { path: "/", title: "Homepage", component: "index" },
    { path: "/me", title: "Me", component: "me/index" },
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
  proxy: {
    "/eam/api": {
      target: "http://eqw-fat.eam.com",
      changeOrigin: true,
      pathRewrite: { "^/eam": "" },
    },
  },
  links: [{ rel: "icon", href: "/favicon.ico" }],
  title: "Dugan (lvx)",
});
