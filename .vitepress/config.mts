import { defineConfig, type HeadConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  title: "shockz Blog",
  lang: 'ko-KR',
  description: "shockz Blog with vitePress",
  srcDir: 'src',
  ignoreDeadLinks: [
    // localhost 링크 무시 (개발/데모용)
    /^https?:\/\/localhost/,
    // 상대 경로 링크 무시 (일부 레거시 링크)
    /^\.\.?\//,
  ],
  // Draft 페이지 필터링 (프로덕션 빌드에서 제외)
  transformPageData(pageData) {
    const isDraft = pageData.frontmatter?.draft === true;
    const isProduction = process.env.NODE_ENV === 'production';

    if (isDraft && isProduction) {
      // draft 페이지는 404로 리다이렉트
      pageData.frontmatter.layout = 'page';
      pageData.title = '404 - Page Not Found';
      pageData.description = 'This page is not available.';
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/img/icons/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    [
      'meta',
      { name: 'google-site-verification', content: 'hwS5SAeZJGMx-RCbFtzbcv0IGdU4nIN8mAfE2iAMhSA' },
    ],
    [
      'meta',
      { name: 'naver-site-verification', content: 'cd32f721debd9633141e4a04c83fad98d36a5abc' },
    ],
    ['meta', { name: 'theme-color', content: '#2196f3' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
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
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'ironPot42 dev log site' }],
    ['meta', { name: 'og:description', content: 'Development log for ironPot42' }],
    ['meta', { name: 'og:url', content: 'https://shockzinfinity.github.io' }],
    ['meta', { name: 'og:image', content: '/img/logo.png' }],
    // Google Analytics는 vitepress-plugin-google-analytics로 처리됨 (theme/index.ts)
  ] as HeadConfig[],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Playground', link: '/playground' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shockzinfinity/shockzinfinity.github.io' }
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present shockz'
    }
  },
  sitemap: {
    hostname: 'https://shockzinfinity.github.io',
    transformItem: (items) => {
      return items;
    }
  }
};

const vitePressSidebarOptions = {
  documentRootPath: 'src',
  collapsed: false,
  capitalizeFirst: true,
  // excludeByGlobPattern: ['nodejs.sample.app/']
  excludeFilesByFrontmatterFieldName: "exclude",
  useFolderLinkFromSameNameSubFile: true,
};

export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarOptions)
)
