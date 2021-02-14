---
title: Windows 개발 환경 관련
lang: ko-KR
meta:
  - name: description
    content: Windows 개발 환경 구성 시 참고
  - name: keywords
    content: windows, development, env
tags: ["windows", "dev", "env"]
sidebar: auto
feed:
  enable: true
  title: Windows 개발 환경 관련
  description: Windows 개발 환경 구성 시 참고
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/etc/windows.html
---

# Windows 개발 환경 구성

<TagLinks />

[[toc]]

## Cmder + Windows Terminal

- Cmder 위치
    %APPDATA%\Cmder
- 환경 변수 세팅
    CMDER_ROOT, CmdEmuDir
- UTF-8 세팅
    chcp utf-8
- 기본 환경 설정

- Windows Terminal 연계
    default setting 변경
- Windows Terminal 세팅
    기타 설정
![windows.cmder](./image/windows.cmder.1.png)
![windows.cmder](./image/windows.cmder.2.png)
![windows.cmder](./image/windows.cmder.3.png)

## yarn global path 지정

```bash
$ yarn global bin
C:\Users\user\AppData\Local\Yarn\bin
```
- 해당 path를 windows path 변수에 등록
![windows.path](./image/windows.path.1.png)
