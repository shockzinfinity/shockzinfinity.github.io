---
title: AWS
lang: ko-KR
meta:
  - name: description
    content: aws 관련 내용
  - name: keywords
    content: aws, redis, docker
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

<TagLinks />

[[toc]]

## AWS EC2 Linux 2 에 Docker 설치

```bash
$ sudo yum update
$ sudo yum install git
$ sudo yum install docker
$ sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ sudo service docker start
$ sudo usermod -aG docker $USER
```

## ssh console 에서 s3 접근

```bash
$ aws configure
access key : <액세스 키 입력>
secret key : <시크릿 키 입력>
default region : <리전 입력>

$ aws s3 cp s3://주소/20201108_170001_bak.db.sql ./
```
