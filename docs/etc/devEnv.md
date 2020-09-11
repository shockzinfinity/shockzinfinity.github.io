---
title: 맥 개발환경 설정
lang: ko-KR
meta:
  - name: description
    content: 맥북프로의 개발환경 구성에 대해 다룹니다.
  - name: keywords
    content: mac, development, env
tags: ["mac", "dev", "env"]
sidebar: auto
---

# Development Settings on Mac

<TagLinks />

## 맥 터미널에서 VSCode 실행

```bash
$ vi ~/.zshrc

# ~/.zshrc
code () { VOCODE_CWD ="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}

$ source ~/.zshrc
```

## .net core sdk on mac

```bash
$ brew cask install dotnet-sdk
```

## cmder

![cmder](./image/cmder.1.png)
![cmder](./image/cmder.4.png)
![cmder](./image/cmder.2.png)
![cmder](./image/cmder.3.png)

## 전반적인 설정

> [원문](https://subicura.com/2017/11/22/mac-os-development-environment-setup.html)

![개발환경설정](./image/mac.dev.settings.1.jpg)