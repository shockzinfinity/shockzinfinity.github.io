---
title: Java 버전관리
description: Java version management
tags:
  - jenv
  - java
created: '2025-11-19'
updated: '2025-11-19'
---

# JEnv

<TagLinks />

[[toc]]

## Windows

- [jdk archive](https://jdk.java.net/archive/)
- [microsoft build jdk](https://learn.microsoft.com/ko-kr/java/openjdk/download)

```powershell
> git clone https://github.com/FelixSelter/JEnv-for-Windows.git

# PATH 에 해당 디렉토리 추가

> jenv
> jenv add jdk17 C:\java\jdk-17.0.2
> jenv change jdk17
> java -version
openjdk version "17.0.2" 2022-01-18
OpenJDK Runtime Environment (build 17.0.2+8-86)
OpenJDK 64-Bit Server VM (build 17.0.2+8-86, mixed mode, sharing)

> jenv autoscan "C:\java"
```

## Mac

```bash
$ brew install jenv
```

## Linux

```bash
$ git clone https://github.com/jenv/jenv.git ~/.jenv
# Shell: bash
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(jenv init -)"' >> ~/.bash_profile
# Shell: zsh
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(jenv init -)"' >> ~/.zshrc
```
