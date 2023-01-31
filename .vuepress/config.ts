import { defineUserConfig } from "vuepress";
import { themeConfig } from "./themeConfig";

export default defineUserConfig({
  dest: "./dist",
  theme: themeConfig,
  shouldPrefetch: false,
  title: "天道酬勤",
  head: [
    // meta
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "renfakai" }],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
    ["meta", { "http-equiv": "Expires", content: "0" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
  ],
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  plugins: [],
});
