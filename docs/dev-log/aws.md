---
title: AWS
lang: ko-KR
meta:
  - name: description
    content: aws 관련 내용
  - name: keywords
    content: wordpress, redis, docker
tags: ["aws", "redis", "docker", "docker-compose"]
sidebar: auto
feed:
  enable: true
  title: AWS
  description: aws 관련 내용
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/aws.html
---

# AWS 관련 설정 및 팁

## AWS EC2 Linux 2 에 Docker 설치

```bash
$ sudo yum update -y
$ sudo amazon-linux-extras install docker
$ sudo service docker start

# 그룹 추가 후 재접속
$ sudo usermod -a -G docker ec2-user
```
