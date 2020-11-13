---
title: npm package
lang: ko-KR
meta:
  - name: description
    content: npm package 배포 관련
  - name: keywords
    content: npm
tags: ["npm"]
sidebar: auto
feed:
  enable: true
  title: npm package
  description: npm package 배포 관련
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/npm.html
---

# npm 배포를 위한 임시 작업 공간

<TagLinks />

[[toc]]

## package.json 예시

```json
{
 // name of the library on npm!
 "name": "vue-example-pkg",
 "version": "0.1.0",
 // If you set "private": true in your package.json, then npm will refuse to publish it.
 "private": false,
 "main": "dist/vue-example-pkg.umd.min.js",

 // this makes sure that library is distributed to a CDN
 "unpkg": "dist/vue-example-pkg.umd.min.js",
 "jsdelivr": "dist/vue-example-pkg.umd.min.js",

 "author": "Your name",
 "license": "MIT", // or whatever you decide
 "description": "",
 "files": [
   "dist/*",
   "src/*"
 ],
 "homepage": "",
 "repository": {
   "type": "git",
   "url": "https://github.com/siegerts/vue-example-pkg.git"
 },
 "bugs": {
   "url": "https://github.com/siegerts/vue-example-pkg/issues"
 },
 "scripts": {
   "serve": "vue-cli-service serve",

   // tell Vue CLI that you want this project built as a library
   "build": "vue-cli-service build --target lib --name vue-example-pkg src/main.js",
   "lint": "vue-cli-service lint",

   // builds the library before publishing to npm; points to `build` script above
   "prepublishOnly": "$npm_execpath build",

   // builds documentation; for use with doc deploy (i.e. Netlify or other)
   "docs:dev": "vuepress dev docs",
   "docs:build": "vuepress build docs"
 },
 "dependencies": {
   ...
 },
 "devDependencies": {
   "@vue/cli-plugin-babel": "^3.3.0",
   "@vue/cli-plugin-eslint": "^3.3.0",
   "@vue/cli-service": "^3.3.0",
   "@vue/eslint-config-prettier": "^4.0.1",
   "babel-eslint": "^10.0.1",
   "eslint": "^5.8.0",
   "eslint-plugin-vue": "^5.0.0",
   "style-resources-loader": "^1.2.1",
   "stylus": "^0.54.5",
   "stylus-loader": "^3.0.2",
   "vue-cli-plugin-style-resources-loader": "^0.1.3",
   "vue-template-compiler": "^2.5.21",
   "vuepress": "^1.0.0-alpha.32"
   ...
 },
 "peerDependencies": {
   "vue": "^2.5.21"
 },

 // once again, SEO
 "keywords": [
   "vue",
   "vuejs"
   ...
 ]
}
```
