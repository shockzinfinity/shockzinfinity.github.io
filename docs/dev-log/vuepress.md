---
title: VuePress
lang: ko-KR
meta:
  - name: description
    content: VuePress 관련 설정
  - name: keywords
    content: vuepress
tags: ["vuepress"]
sidebar: auto
---

# VuePress

<TagLinks />

## Google Analytics

> [Google Analytics](https://analytics.google.com/) 에서 추적 Id 발급  
> ![analytics](./image/google.analytics.1.png)

```js
module.exports = {
  ...,
  plugins: [
    ...,
    "@vuepress/google-analytics",
  ],
  ...,
  ga: "추적 ID"
}
```

## 이미지 캡션

> **.vuepress/sytles/index.styl** 에 추가

```css
img + em {
  display: block;
  text-align: center;
}
```

## 각 페이지별 메타 샘플

> frontmatter

```markdown
---
title: VuePress에 검색 엔진 최적화하기
lang: ko-KR
meta:
  - name: description
    content: 검색 엔진 최적화 SEO를 알아보고 VuePress에 적용해봅니다.
  - name: keywords
    content: SEO 검색 엔진 최적화
tags: ["SEO", "검색 엔진 최적화", "VuePress"]
sidebar: auto
---
```

## 루트 페이지 locale 설정

```js
module.exports = {
  ...,
  locales: {
    '/': { lang: 'ko-KR' }
  },
}
```
