---
title: VisualStudio Code 설정
lang: ko-KR
meta:
  - name: description
    content: VisualStudio Code 에 관한 개인화 설정 및 노트
  - name: keywords
    content: vscode
tags: ["vscode"]
sidebar: auto
feed:
  enable: true
  title: VisualStudio Code 설정
  description: VisualStudio Code 에 관한 개인화 설정 및 노트
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/etc/vscode.html
---

# VisualStudio Code

<TagLinks />

[[toc]]

## 열려있는 편집기 안보이게 처리
```json
"explorer.openEditors.visible": 0
```

## ssh 연결시 key 파일 지정

```
Host api.shockz.io
  HostName api.shockz.io
  User user
  IdentityFile ~/Desktop/AWS-keypair/dev.key.pem
```
