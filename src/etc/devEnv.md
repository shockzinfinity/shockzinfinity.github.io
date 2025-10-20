---
title: 맥 개발환경 설정
lang: ko-KR
meta:
  - name: description
    content: 맥북프로의 개발환경 구성에 대해 다룹니다.
  - name: keywords
    content: 'mac, development, env'
tags:
  - mac
  - dev
  - env
feed:
  enable: true
  title: 맥 개발환경 설정
  description: 맥북프로의 개발환경 구성에 대해 다룹니다.
  image: /public/img/logo.png
  author:
    - name: shockz
      email: shockzinfinity@gmail.com
      link: 'https://shockzinfinity.github.io/etc/devEnv.html'
created: '2020-09-06'
updated: '2025-10-20'
---

# Development Settings on Mac

<TagLinks />

[[toc]]

## 맥 터미널에서 VSCode 실행

```bash
$ vi ~/.zshrc

# ~/.zshrc
code () { VOCODE_CWD ="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}

$ source ~/.zshrc
```

## .net core sdk on mac

```bash
$ brew cask install dotnet-sdk
```

## cmder

![cmder](./image/cmder.1.png)
![cmder](./image/cmder.4.png)
![cmder](./image/cmder.2.png)
![cmder](./image/cmder.3.png)

## 전반적인 설정

> [원문](https://subicura.com/2017/11/22/mac-os-development-environment-setup.html)

![개발환경설정](./image/mac.dev.settings.1.jpg)

## zsh-autosuggestion color

- `.zshrc` 에 다음 라인 추가

```bash
# zsh-autosuggestion suggest color
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=23'
```

## Visual Studio for Mac

[PC 및 Mac용 Visual Studio 비교](https://visualstudio.microsoft.com/ko/vs/mac/#vs_mac_table)

## brew 업데이트

```bash
$ brew update
$ brew upgrade
$ brew cleanup
$ brew doctor
```

## php 개발환경 설정

- [참고사이트](https://getgrav.org/blog/macos-catalina-apache-multiple-php-versions)

- php.ini 위치

```bash{6}
/usr/local/etc/php/5.6/php.ini
/usr/local/etc/php/7.0/php.ini
/usr/local/etc/php/7.1/php.ini
/usr/local/etc/php/7.2/php.ini
/usr/local/etc/php/7.3/php.ini
/usr/local/etc/php/7.4/php.ini
```

- `php.ini` 타임존 설정

```php{4}
[Date]
; Defines the default timezone used by the date functions
; http://php.net/date.timezone
date.timezone = Asia/Seoul
```

- php 설치 후 설정과정 중, 403 Forbidden 현상 발생 시 `httpd.conf` 변경 필요

```bash{19}
#
# DirectoryIndex: sets the file that Apache will serve if a directory
# is requested.
#
<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>

<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>

#
# The following lines prevent .htaccess and .htpasswd files from being
# viewed by Web clients.
#
<FilesMatch ".ht*">
    # Require all denied
    Require all granted
</FilesMatch>
```

- $ curl -L https://gist.githubusercontent.com/rhukster/f4c04f1bf59e0b74e335ee5d186a98e2/raw > /usr/local/bin/sphp
  $ chmod +x /usr/local/bin/sphp

## PHP on VS Code

> 참고사이트: [php on vscode](http://blog.naver.com/PostView.nhn?blogId=haruby511&logNo=221455944336)

## VisualStudio 2019 Community

인코딩 문제 발생 시
![vs2019.encoding](./image/vs2019.encoding.1.png)
![vs2019.encoding](./image/vs2019.encoding.2.png)
![vs2019.encoding](./image/vs2019.encoding.3.png)

## mac 에서 윈도우용 키보드 사용 시

> 시스템 환경설정 > 키보드
> ![mac.keyboard](./image/mac.keyboard.1.png)
> ![mac.keyboard](./image/mac.keyboard.2.png)
> ![mac.keyboard](./image/mac.keyboard.3.png)

## jdk 설치

- openjdk 저장소 추가

```bash
$ brew tap AdoptOpenJDK/openjdk
```

- 설치할 자바 버전 확인

  | Java version                            | JDK                         | JRE                             |
  | :-------------------------------------- | :-------------------------- | :------------------------------ |
  | OpenJDK8 with Hotsopt JVM               | adoptopenjdk8               | adoptopenjdk8-jre               |
  | OpenJDK8 with OpenJ9 JVM                | adoptopenjdk8-openj9        | adoptopenjdk8-openj9-jre        |
  | OpenJDK8 with OpenJ9 JVM, large heap\*  | adoptopenjdk8-openj9-large  | adoptopenjdk8-openj9-jre-large  |
  | OpenJDK9 with Hotsopt JVM               | adoptopenjdk9               | n/a                             |
  | OpenJDK10 with Hotsopt JVM              | adoptopenjdk10              | n/a                             |
  | OpenJDK11 with Hotsopt JVM              | adoptopenjdk11              | adoptopenjdk11-jre              |
  | OpenJDK11 with OpenJ9 JVM               | adoptopenjdk11-openj9       | adoptopenjdk11-openj9-jre       |
  | OpenJDK11 with OpenJ9 JVM, large heap\* | adoptopenjdk11-openj9-large | adoptopenjdk11-openj9-jre-large |
  | OpenJDK12 with Hotsopt JVM              | adoptopenjdk12              | adoptopenjdk12-jre              |
  | OpenJDK12 with OpenJ9 JVM               | adoptopenjdk12-openj9       | adoptopenjdk12-openj9-jre       |
  | OpenJDK12 with OpenJ9 JVM, large heap\* | adoptopenjdk12-openj9-large | adoptopenjdk12-openj9-jre-large |
  | OpenJDK13 with Hotsopt JVM              | adoptopenjdk13              | adoptopenjdk13-jre              |
  | OpenJDK13 with OpenJ9 JVM               | adoptopenjdk13-openj9       | adoptopenjdk13-openj9-jre       |
  | OpenJDK13 with OpenJ9 JVM, large heap\* | adoptopenjdk13-openj9-large | adoptopenjdk13-openj9-jre-large |

- brew cask install version

```bash
$ brew cask install adoptopenjdk8
$ java -version
openjdk version "1.8.0_265"
OpenJDK Runtime Environment (AdoptOpenJDK)(build 1.8.0_265-b01)
OpenJDK 64-Bit Server VM (AdoptOpenJDK)(build 25.265-b01, mixed mode)
```

## pyenv, python, anaconda ([python 개발환경](../dev-log/python)과 비교 필요)

- (BigSur 기준) pyenv 로 python 3.8.6 과 anaconda3-5.3.1 설치 기준

```bash
$ brew install pyenv
or
$ brew upgrade pyenv

# zlib, bzip2 관련 warning 오류 시 (.zshrc 설정은 아래로)
$ brew install zlib bzip2

$ pyenv install --list # 설치 가능한 python 패키지 리스트
# anaconda3-5.3.1
$ pyenv install anaconda3-5.3.1
# python 3.8.6
$ pyenv install 3.8.6

$ pyenv versions # 현재 설치된 패키지 확인
# 기본으로 anaconda3-5.3.1 을 설정
$ pyenv global anaconda3-5.3.1
```

```bash
# .zshrc 내의 pyenv 부분
# for pyenv
#CFLAGS="-I$(brew --prefix openssl)/include"
#LDFLAGS="-L$(brew --prefix openssl)/lib"
export LDFLAGS="-L$(brew --prefix zlib)/lib -L$(brew --prefix bzip2)/lib"
export CPPFLAGS="-I$(brew --prefix zlib)/include -I$(brew --prefix bzip2)/include"
export PATH="$HOME/.pyenv/bin:$PATH"
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi
```

::: tip

- 참고 사이트
  [The right and wrong way to set Python 3 as default on a Mac](https://opensource.com/article/19/5/python-3-default-mac)
  [pyenv wiki](https://github.com/pyenv/pyenv/wiki/Common-build-problems)
  :::

## Redis

```bash
$ brew install redis
$ redis-server --version
Redis server v=6.0.10 sha=00000000:0 malloc=libc bits=64 build=5e44a839a3d17a99

# installation location : /usr/local/Cellar/redis/...
# 설정 파일 : /usr/local/etc/redis.conf

# Starting/Stopping the Redis server as a background service
$ brew services start redis
$ brew services stop redis

# check
$ redis-cli ping
PONG

$ redis-cli monitor

# connect to a different redis server or port
$ redis-cli -h <address> -p <port>
# List users
$ redis-cli ACL LIST
# Continous stat
$ redis-cli --stat
```

- test

```bash
# 실행
$ redis-server

# 클라이언트로 접속
$ redis-cli
127.0.0.1:6379> set shockz https://shockzinfinity.github.io
OK
127.0.0.1:6379> get shockz
"https://shockzinfinity.github.io"
127.0.0.1:6379> keys *
1) "shockz"
127.0.0.1:6379> quit
```
