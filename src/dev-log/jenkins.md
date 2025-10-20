---
title: Jenkins
lang: ko-KR
meta:
  - name: description
    content: Jenkins 관련 설정을 다룹니다.
  - name: keywords
    content: jenkins
tags:
  - jenkins
  - docker
sidebar: auto
feed:
  enable: true
  title: Jenkins
  description: Jenkins 관련 설정을 다룹니다.
  image: /public/img/logo.png
  author:
    - name: shockz
      email: shockzinfinity@gmail.com
      link: 'https://shockzinfinity.github.io/dev-log/jenkins.html'
created: '2020-10-14'
updated: '2025-10-20'
---

# Jenkins

<TagLinks />

[[toc]]

## docker run

```bash
$ docker run -d -p 8181:8080 -v jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:lts
```
