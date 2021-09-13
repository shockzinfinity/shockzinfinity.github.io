---
title: 맥 사용상 문제해결
lang: ko-KR
meta:
  - name: description
    content: 맥북프로 사용 시 참고할 만한 문제해결 방법
  - name: keywords
    content: mac, development, env
tags: ["mac", "dev", "env"]
sidebar: auto
feed:
  enable: true
  title: 맥 사용상 문제해결
  description: 맥북프로 사용 시 참고할 만한 문제해결 방법
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/etc/mac-etc.html
---

# mac 사용상 문제해결

<TagLinks />

[[toc]]

## 마우스 끊김/버벅임 현상 해결과정

- [맥 OS에서 일반 무선 마우스 끊김/버벅임 현상 해결 과정](https://korog.tistory.com/2)
- 나의 경우는 블루투스 초기화  
  > \<Shift\> \+ \<Option\> 키 누른 상태로 `Bluetooth` 아이콘 클릭
![mac.mouse](./image/mac.mouse.1.png)

## Operation Not Permitted

- vscode 로 python 작업 시, 스크립트 실행 중 `Operation Not Permitted` 에러가 계속 나올 경우
- Mac OSX 의 SIP (System Integrity Protection) 때문에 발생하는 문제라고 함.
- `보안 및 개인 정보 보호 탭 > 개인 정보 보호 > 전체 디스크 접근 권한`에서 Terminal, iTerm, vscode 등 필요한 앱에 권한 할당
![vscode.operation](./image/vscode.operationnotpermitted.1.png)
![vscode.operation](./image/vscode.operationnotpermitted.2.png)

## .DS_STORE 파일 삭제

![ds.store.file.delete](./image/ds.store.file.delete.1.png)
