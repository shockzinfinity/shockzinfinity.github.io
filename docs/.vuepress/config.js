const { description } = require('../../package');

module.exports = {
  base: '/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'ironpot devLog',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  logo: '/img/logos/favicon.png',
  // algolia: {
  //   apiKey: '',
  //   indexName: '',
  // },

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#3eaf7c',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    displayAllHeaders: true,
    //activeHeaderLinks: false, // Default: true
    // editLinks: false,
    // editLinkText: "",
    docsDir: '',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'tags',
        link: '/tags',
      },
      {
        text: 'Tutorial',
        link: '/tutorial/',
      },
      {
        text: 'devLog',
        // link: "/dev-log/",
        ariaLabel: 'Developement Log',
        items: [
          { text: 'CentOS 8', link: '/dev-log/centos' },
          { text: 'Podman', link: '/dev-log/podman' },
          { text: 'Docker', link: '/dev-log/docker' },
          { text: 'Xwiki', link: '/dev-log/xwiki' },
          { text: 'Synology NAS', link: '/dev-log/synology' },
          { text: 'GitLab', link: '/dev-log/gitlab' },
          { text: 'SSL', link: '/dev-log/ssl' },
          { text: 'Nginx', link: '/dev-log/nginx' },
          { text: '.net core', link: '/dev-log/dotnetcore' },
          { text: 'Konva Test', link: '/dev-log/konva' },
          { text: 'VuePress', link: '/dev-log/vuepress' },
          { text: 'mssql', link: '/dev-log/mssql' },
        ],
      },
      {
        text: 'etc',
        link: '/etc/',
        items: [
          { text: '개발환경설정', link: '/etc/devEnv' },
          { text: 'vscode-debugging', link: '/etc/vscode-debugging' },
        ],
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
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom',
    '@vuepress/google-analytics',
    '@vuepress/nprogress',
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
  ],

  markdown: {
    lineNumbers: true,
  },

  ga: 'UA-177405863-1',

  locales: {
    '/': { lang: 'ko-KR' },
  },
};
