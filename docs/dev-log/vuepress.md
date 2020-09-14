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

## github Actions 를 이용한 자동 배포

일반적으로는 `sh deploy.sh`를 이용하여 **deploy.sh** 를 이용한 배포를 로컬에서 진행하여 github repository 의 **gh-pages** 브랜치로 배포하는 방법을 사용했었음.

이를 자동화 하기 위해 Github Actions를 이용함
```docker
# This is a basic workflow to help you get started with Actions

name: build & deploy

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the gh-pages branch
on:
  push:
    branches: [master]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build-and-deploy:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      - name: install and build
        run: |
          npm install
          npm run build

      - name: deploy build files
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        run: |
          cd docs/.vuepress/dist
          git config --global user.email "shockzinfinity@gmail.com"
          git config --global user.name "Jun Yu"
          git init
          git add -A
          git commit -m 'deploy with vuepress'
          git push -f https://${ACCESS_TOKEN}@github.com/${GITHUB_REPOSITORY}.git master:gh-pages
```
[Github Actions](https://docs.github.com/en/actions)에 Workflow 를 생성한 후 위의 Workflow를 등록합니다.

::: tip
세부 설정은 추후에 설명
:::
