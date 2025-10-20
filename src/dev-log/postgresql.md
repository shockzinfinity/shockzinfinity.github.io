---
title: PostgreSQL
lang: ko-KR
meta:
  - name: description
    content: PostgreSQL 관련 설정
  - name: keywords
    content: postgresql, docker
tags: ["postgresql", "docker"]
sidebar: auto
feed:
  enable: true
  title: PostgreSQL
  description: PostgreSQL 관련 설정
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/postgresql.html
---

# PostgreSQL 관련

<TagLinks />

[[toc]]

## docker 설치

```bash
$ docker pull postgres:latest
$ docker run --name pgsql -d -p 5432:5432 -e POSTGRES_PASSWORD=postgresql postgres
```
- [Azure Data Studio](https://docs.microsoft.com/ko-kr/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15) 로 연결 테스트  
![postgresql](./image/postgresql.1.png)

