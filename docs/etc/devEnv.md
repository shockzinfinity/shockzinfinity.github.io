---
title: 맥 개발환경 설정
lang: ko-KR
meta:
  - name: description
    content: 맥북프로의 개발환경 구성에 대해 다룹니다.
  - name: keywords
    content: mac, development, env
tags: ["mac", "dev", "env"]
sidebar: auto
feed:
  enable: true
  title: 맥 개발환경 설정
  description: 맥북프로의 개발환경 구성에 대해 다룹니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/etc/devEnv.html
---

# Development Settings on Mac

<TagLinks />

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
