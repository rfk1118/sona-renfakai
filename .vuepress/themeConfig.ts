import { hopeTheme } from "vuepress-theme-hope";
import { navbarConfig } from "./navbar";
import { sidebarConfig } from "./sidebar";

export const themeConfig = hopeTheme({
  hostname: "https://renfakai.com/",
  docsDir: "docs",
  iconAssets: "//at.alicdn.com/t/c/font_2922463_rmfowz6l95f.css",
  navbar: navbarConfig,
  sidebar: sidebarConfig,
  pageInfo: [
    "Author",
    "Original",
    "Word",
    "ReadingTime",
  ],
  displayFooter: true,
  plugins: {
    blog: true,
    copyright: true,
    mdEnhance: {
      align: true,
      codetabs: true,
      container: true,
      tasklist: true,
      mermaid: true,
      mathjax: true,
      flowchart: true,
      katex: true,
    }
  },
});
