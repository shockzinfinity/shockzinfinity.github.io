---
title: Tool 설치 및 구성 관련
lang: ko-KR
meta:
  - name: description
    content: 각종 개발 툴 설치 및 구성에 관련된 내용입니다.
  - name: keywords
    content: 'development, env'
tags:
  - dev
  - env
feed:
  enable: true
  title: Tool 설치 및 구성 관련
  description: 각종 개발 툴 설치 및 구성에 관련된 내용입니다.
  image: /public/img/logo.png
  author:
    - name: shockz
      email: shockzinfinity@gmail.com
      link: 'https://shockzinfinity.github.io/etc/tools.html'
created: '2021-02-08'
updated: '2025-10-20'
---

# Development tool install & configuration

<TagLinks />

[[toc]]

## Medis

> Redis client GUI (free)

> git: [https://github.com/luin/medis](https://github.com/luin/medis.git)

```bash
# git clone
$ git clone https://github.com/luin/medis.git
$ npm install
# compile assets
$ npm run pack
```

::: tip

- 컴파일 하게 되면 Webpack Bundle Analyzer 가 구동된다. (Ctrl-C 해서 구동 중단해도 상관없음)
  ![tools.medis](./image/tools.medis.1.png)
  ![tools.medis](./image/tools.medis.2.png)
  :::

```bash
# 실행 방법
$ npm start

# 패키징 해서 app 형태로 실행
$ node bin/pack.js
$ cd dist/out/Medis-mas-x64

# Medis.app 실행
```

![tools.medis](./image/tools.medis.3.png)
::: tip

- `node bin/pack.js` 를 실행하게 되면 signing 관련 에러를 만나게 됨.
- 단독 사용이므로 무시해도 관계 없음
  ![tools.medis](./image/tools.medis.4.png)
  :::
