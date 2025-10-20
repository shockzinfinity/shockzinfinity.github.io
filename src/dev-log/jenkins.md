---
title: Jenkins
description: Jenkins 관련 설정을 다룹니다.
tags:
  - jenkins
  - docker
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
