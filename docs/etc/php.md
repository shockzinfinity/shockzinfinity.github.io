---
title: PHP 개발환경 설정
lang: ko-KR
meta:
  - name: description
    content: PHP 개발환경 구성에 대해 다룹니다.
  - name: keywords
    content: mac, development, env
tags: ["mac", "dev", "env"]
sidebar: auto
feed:
  enable: true
  title: PHP 개발환경 설정
  description: PHP 개발환경 구성에 대해 다룹니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/etc/php.html
---

# PHP Development Settings on Mac

<TagLinks />

[[toc]]

## 참고 URL

- macOS 11.0 Big Sur Apache Setup
  1. [Part 1: Multiple PHP Versions](https://getgrav.org/blog/macos-bigsur-apache-multiple-php-versions)
  2. [Part 2: MySQL, Xdebug & More...](https://getgrav.org/blog/macos-bigsur-apache-mysql-vhost-apc)
  3. [Part 3: LetsEncrypt SSL](https://getgrav.org/blog/macos-bigsur-apache-ssl)

### 설정 파일 위치

- /usr/local/etc/httpd/httpd.conf
- /usr/local/etc/httpd/extra/httpd-vhosts.conf
- /usr/local/etc/dnsmasq.conf
- /usr/local/etc/php/7.2/php.ini
- /usr/local/etc/php/7.2/conf.d/ext-apcu.ini
- /usr/local/etc/php/7.2/conf.d/ext-yaml.ini
- /usr/local/etc/php/7.2/conf.d/ext-xdebug.ini
- /usr/local/etc/php/7.4/php.ini
- /usr/local/etc/php/7.4/conf.d/ext-apcu.ini
- /usr/local/etc/php/7.4/conf.d/ext-yaml.ini
- /usr/local/etc/php/7.4/conf.d/ext-xdebug.ini
- /usr/local/etc/php/8.0/php.ini
- /usr/local/etc/php/8.0/conf.d/ext-apcu.ini
- /usr/local/etc/php/8.0/conf.d/ext-yaml.ini
- /usr/local/etc/php/8.0/conf.d/ext-xdebug.ini
- ~/.config/letsencrypt/cli.ini

### httpd.conf
> 위의 tutorial 진행 시 오류 부분만 기록
> connection refused 관련 오류 시 참고 : [https://serverfault.com/questions/801325/authz-core-keeps-denying-access](https://serverfault.com/questions/801325/authz-core-keeps-denying-access)

```apacheconf
...
Listen 0.0.0.0:80
User username
Group staff
ServerName localhost
DocumentRoot /Users/shockz/Sites
<Directory /Users/shockz/Sites>
    AllowOverride All
    Require all granted
</Directory>
<Location />
    require all granted
</Location>
...
```

### 맥 기본 php 삭제를 위한 방법

- /usr/bin/ 내의 php 삭제를 위해서는 별도의 작업이 필요함
- SIP (System Integrity Protection) 를 비활성화 하고,
![mac.systemfile.delete](./image/mac.systemfile.delete.1.png)
- `sudo mount -o nobrowse -t apfs /dev/disk1s1 ./` 로 별도 디렉토리에 마운트하여 삭제해야 함
![mac.systemfile.delete](./image/mac.systemfile.delete.2.png)


