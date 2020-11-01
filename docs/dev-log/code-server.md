---
title: Code Server
lang: ko-KR
meta:
  - name: description
    content: Code Server 사용 및 관련 설정 내용을 다룹니다.
  - name: keywords
    content: code-server
tags: ["code-server"]
sidebar: auto
feed:
  enable: true
  title: Code Server
  description: Code Server 사용 및 관련 설정 내용을 다룹니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/code-server.html
---

# code-server

<TagLinks />

[[toc]]

## 관련 링크

::: tip
[cdr/code-server](https://github.com/cdr/code-server)
:::

## Docker run

```bash
$ sudo firewall-cmd --permanent --add-port=8443/tcp
$ docker create --name=code-server --net=host --env-file="./.env" -v /home/shockz/docker/code-server/config:/config --restart unless-stopped linuxserver/code-server
$ docker start code-server
```

## Synology reverse proxy 설정

- NAS 상에서 nginx reverse proxy 설정이 되어 있다는 가정하에 code-server 는 http 상으로 서비스하고, 인증서 처리는 NAS nginx 에 맡김.
![code-server.reverse](./image/code-server.reverse.2.png)
![code-server.reverse](./image/code-server.reverse.1.png)
