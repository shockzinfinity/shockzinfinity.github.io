const { description } = require("../../package");

module.exports = {
  base: "/shockz-vue-press/",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "개발 기록 with vuepress",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    displayAllHeaders: true,
    //activeHeaderLinks: false, // Default: true
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: "Last Updated",
    nav: [
      {
        text: "tags",
        link: "/tags",
      },
      {
        text: "devLog",
        link: "/dev-log/",
        items: [
          { text: "CentOS 8", link: "/dev-log/centos" },
          { text: "vscode-debugging", link: "/dev-log/vscode-debugging" },
          { text: "Podman", link: "/dev-log/podman" },
          { text: "Docker", link: "/dev-log/docker" },
          { text: "Xwiki", link: "/dev-log/xwiki" },
          { text: "Synology NAS", link: "/dev-log/synology" },
          { text: "GitLab", link: "/dev-log/gitlab" },
          { text: "SSL", link: "/dev-log/ssl" },
          { text: "Nginx", link: "/dev-log/nginx" },
          { text: ".net core", link: "/dev-log/dotnetcore" },
        ],
      },
      {
        text: "etc",
        link: "/etc/",
        items: [{ text: "개발환경설정", link: "/etc/devEnv" }],
      },
    ],
    sidebar: {
      // "/dev-log/": [
      //   {
      //     title: "devLog",
      //     collapsable: false,
      //     children: ["vscode-debugging", "centos"],
      //   },
      // ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/back-to-top",
    "@vuepress/medium-zoom",
    "@vuepress/google-analytics",
  ],

  markdown: {
    lineNumbers: true,
  },

  ga: "UA-177405863-1",

  locales: {
    "/": { lang: "ko-KR" },
  },
};
