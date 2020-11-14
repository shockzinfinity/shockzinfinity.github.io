const { description } = require('../../package');
const feed_options = { canonical_base: 'https://shockzinfinity.github.io' };
const moment = require('moment');
const { lang } = require('moment');

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
    ['link', { rel: 'icon', href: '/img/icons/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    [
      'meta',
      { name: 'google-site-verification', content: 'hwS5SAeZJGMx-RCbFtzbcv0IGdU4nIN8mAfE2iAMhSA' },
    ],
    [
      'meta',
      { name: 'naver-site-verification', content: 'd795a93480ccc9f079f6ce70e020202b3a7d0a72' },
    ],
    ['meta', { name: 'theme-color', content: '#2196f3' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'ironPot' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    [
      'link',
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/icons/apple-icon-180x180.png' },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/img/icons/android-icon-192x192.png',
      },
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/icons/favicon-32x32.png' },
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/img/icons/favicon-96x96.png' },
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/icons/favicon-16x16.png' },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#2196f3' }],
    ['meta', { name: 'msapplication-TileImage', content: '/img/icons/ms-icon-144x144.png' }],
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
          { text: 'EF core', link: '/dev-log/efcore' },
          { text: 'WordPress', link: '/dev-log/wordpress' },
          { text: 'NPM', link: '/dev-log/npm' },
          { text: 'Jenkins', link: '/dev-log/jenkins' },
          { text: 'code-server', link: '/dev-log/code-server' },
          { text: 'aws', link: '/dev-log/aws' },
          { text: 'linux', link: '/dev-log/linux' },
        ],
      },
      {
        text: 'etc',
        link: '/etc/',
        items: [
          { text: '개발환경설정', link: '/etc/devEnv' },
          { text: 'vscode-debugging', link: '/etc/vscode-debugging' },
          { text: 'VS Code 관련', link: '/etc/vscode' },
          { text: 'mac 사용관련', link: '/etc/mac-etc' },
          { text: 'iPad 사용관련', link: '/etc/iPad' },
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
    [
      'sitemap',
      {
        hostname: 'https://shockzinfinity.github.io',
        dateFormatter: time => moment(time).toISOString(),
      },
    ],
    ['feed', feed_options],
    // [
    //   '@vuepress/last-updated',
    //   {
    //     transformer: (timestamp, lang) => {
    //       moment.locale('ko');
    //       return moment(timestamp).fromNow();
    //     },
    //   },
    // ],
  ],

  markdown: {
    lineNumbers: true,
  },

  ga: 'UA-177405863-1',

  locales: {
    '/': { lang: 'ko-KR' },
  },
};
