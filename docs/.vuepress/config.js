const { description } = require("../../package");

module.exports = {
  base: "/shockz-vue-press/",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "개발 기록 및 각종 문서화 with vuepress",
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
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      // {
      //   text: "Guide",
      //   link: "/guide/",
      // },
      // {
      //   text: "Config",
      //   link: "/config/",
      // },
      {
        text: "devLog",
        link: "/dev-log/",
      },
    ],
    sidebar: {
      // "/guide/": [
      //   {
      //     title: "Guide",
      //     collapsable: false,
      //     children: ["", "using-vue"],
      //   },
      // ],
      "/dev-log/": [
        {
          title: "devLog",
          collapsable: false,
          children: ["vscode-debugging", "centos"],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],

  markdown: {
    lineNumbers: true,
  },
};
