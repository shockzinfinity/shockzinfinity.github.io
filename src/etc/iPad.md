---
title: iPad 사용관련
lang: ko-KR
meta:
  - name: description
    content: iPad 사용관련 내용입니다.
  - name: keywords
    content: mac, development, env
tags: ["ipad", "env"]
sidebar: auto
feed:
  enable: true
  title: iPad 사용관련
  description: iPad 사용관련 내용입니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/etc/iPad.html
---

# iPad 사용 중 관련 내용

<TagLinks />

[[toc]]

## Blink Shell, Mosh

- [Blink Shell](https://apps.apple.com/kr/app/blink-shell-mosh-ssh-client/id1156707581)
- [Mosh](https://mosh.org)
- Blink Shell 에서 Mosh 를 이용하여 ssh 연결을 할 때 필요한 설정
  - 서버에 mosh 패키지 설치
  ```bash
  $ sudo dnf install mosh
  ```
  - firewall 규칙 설정
  ```bash
  # ssh 포트는 이미 열려있다고 가정한 상태
  $ firewall-cmd --permanent --add-port=60000-61000/udp
  ```
