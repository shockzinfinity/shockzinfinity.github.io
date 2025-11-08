import { defineConfig, type HeadConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

const googleAdsenseAccount = process.env.VITE_GOOGLE_ADSENSE_ACCOUNT || ''
const googleVerification = process.env.VITE_GOOGLE_VERIFICATION || ''
const naverVerification = process.env.VITE_NAVER_VERIFICATION || ''
const siteUrl = process.env.VITE_SITE_URL || 'https://shockzinfinity.github.io'
const siteTitle = process.env.VITE_SITE_TITLE || 'shockz dev Blog'
const siteDescription = process.env.VITE_SITE_DESCRIPTION || 'shockz dev Blog with vitePress'
const siteKeywords = process.env.VITE_SITE_KEYWORDS || 'VitePress, Vue, TypeScript, 기술블로그, 개발, 프론트엔드, 백엔드'

// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  title: siteTitle,
  lang: 'ko-KR',
  description: siteDescription,
  srcDir: 'src',
  ignoreDeadLinks: [
    // localhost 링크 무시 (개발/데모용)
    /^https?:\/\/localhost/,
    // 상대 경로 링크 무시 (일부 레거시 링크)
    /^\.\.?\//,
  ],
  head: [
    ['link', { rel: 'icon', href: '/img/icons/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    [
      'meta',
      { name: 'google-site-verification', content: googleVerification },
    ],
    [
      'meta',
      { name: 'naver-site-verification', content: naverVerification },
    ],
    ['meta',
      { name: 'google-adsense-account', content: googleAdsenseAccount }
    ],
    ['meta', { name: 'theme-color', content: '#2196f3' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: siteTitle }],
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
    ['meta', { name: 'og:title', content: siteTitle }],
    ['meta', { name: 'og:description', content: siteDescription }],
    ['meta', { name: 'og:url', content: siteUrl }],
    ['meta', { name: 'og:image', content: '/img/logo.png' }],
    // SEO
    ['meta', { name: 'keywords', content: siteKeywords }],
    ['meta', { name: 'author', content: 'Jun Yu (shockz)' }],
    ['link', { rel: 'canonical', href: siteUrl }],
    // Google Analytics는 vitepress-plugin-google-analytics로 처리됨 (theme/index.ts)
  ] as HeadConfig[],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tags', link: '/tags' },
      { text: 'Playground', link: '/playground' },
      { text: 'Examples', link: '/example/markdown-examples' }
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
    hostname: siteUrl,
    transformItems(items) {
      // excludes 폴더만 사이트맵에서 제외 (검색엔진 차단)
      // example 폴더는 포함 (검색엔진 노출)
      return items.filter(item => {
        const url = item.url.toLowerCase();
        return !url.includes('excludes/');
      });
    },
    transformPageData(pageData) {
      if (pageData.relativePath === 'index.md') {
        if (!pageData.frontmatter.hero) {
          pageData.frontmatter.hero = {}
        }

        if (siteTitle) {
          pageData.frontmatter.hero.name = siteTitle
        }

        if (siteDescription) {
          pageData.frontmatter.hero.text = siteDescription
        }
      }

      return pageData
    }
  }
};

const vitePressSidebarOptions = {
  documentRootPath: 'src',
  collapsed: false,
  capitalizeFirst: true,
  // 사이드바에서 제외할 파일/폴더 (Glob 패턴)
  excludePattern: [
    // 콘텐츠 분류 (2가지 제외 규칙)
    'example/**',           // 예제 폴더 (사이드바 제외, 사이트맵 포함, Git 포함)
    'excludes/**',          // 비공개 폴더 (모든 곳에서 제외, Git 제외)

    // 정적 파일
    'public/**',            // 정적 파일 폴더

    // 특수 페이지 (네비게이션/자동으로 접근)
    '404.md',               // 404 페이지
    'tags.md',              // 태그 페이지 (네비게이션 링크)
    'playground.md',        // Playground 페이지 (네비게이션 링크)
  ],
  useFolderLinkFromSameNameSubFile: true,
};

export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarOptions)
)
