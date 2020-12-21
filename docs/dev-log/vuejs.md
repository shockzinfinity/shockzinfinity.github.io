---
title: Vue.js 관련
lang: ko-KR
meta:
  - name: description
    content: Vue.js 관련을 다룹니다.
  - name: keywords
    content: vuejs
tags: ["vuejs"]
sidebar: auto
feed:
  enable: true
  title: Vue.js 관련
  description: Vue.js 관련을 다룹니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/vuejs.html
---

# Vue.js

<TagLinks />

[[toc]]

## Nginx + Vue.js 배포를 위한 설정

### Step 1. 기본 위치 설정
- target server: linux (centos 8)
- 배포 방식: docker-compose 를 이용한 nginx container
```bash
# 배포 디렉토리
$ mkdir dist
# certbot 인증서 저장경로
$ mkdir certbot-etc
# nginx config
$ mkdir nginx-conf
```
- `dist` : vue app 빌드한 결과를 여기에 넣고 호스팅하기 위한 디렉토리
- `certbot-etc` : letsencrypt 인증서 저장 디렉토리
- `nginx-conf` : nginx config 디렉토리

### Step 2. certbot 을 통한 인증서 생성

- 인증서 생성만을 위한 `nginx.conf` 작성
```bash{5}
server {
	listen 80;
	listen [::]:80;

	server_name temp.temp.io;
	index index.html index.htm;
	root /var/www/html;

	location ~ /.well-known/acme-challenge {
		allow all;
		root /var/www/html;
	}

	location / {
		try_files $uri $uri/ /index.html;
	}

	location ~ /\.ht {
		deny all;
	}

	location = /favicon.ico {
		log_not_found off; access_log off;
	}

	location = /robots.txt {
		log_not_found off; access_log off; allow all;
	}

	location ~* \.(css|gif|ico|jpeg|jpg|js|png)$ {
		expires max;
		log_not_found off;
	}
}
```
- `docker-compose.yml` 를 통해 인증서 생성 시작
```yml{11}
version: '3'

services:
    certbot:
        depends_on:
            - webserver
        image: certbot/certbot
        volumes:
            - ./certbot-etc:/etc/letsencrypt
            - ./dist:/var/www/html
        command: certonly --webroot --webroot-path=/var/www/html --email temp@gmail.com --agree-tos --no-eff-email --staging -d temp.temp.io

    webserver:
        image: nginx:alpine
        restart: unless-stopped
        ports:
            - "80:80"
            - "443:443"
        volumes:
            - ./dist:/var/www/html
            - ./nginx-conf:/etc/nginx/conf.d
            - ./certbot-etc:/etc/letsencrypt
        networks:
            - app-network

volumes:
    certbot-etc:
    dist:
    nginx-conf:

networks:
    app-network:
        driver: bridge
```
::: tip
certbot 의 --staging 은 테스트 한다는 의미  
email, domain 은 적절하게 수정
:::
```bash{4}
$ docker-compose up -d
   Name                 Command               State                     Ports
-----------------------------------------------------------------------------------------------
certbot      certbot certonly --webroot ...   Exit 0
webserver    /docker-entrypoint.sh ngin ...   Up       0.0.0.0:443->443/tcp, 0.0.0.0:80->80/tcp
```
::: tip
certbot 은 Exit 0 가 되는 것이 맞음. 인증서 생성이 되면 ./certbot-etc 에 가면 확인할 수 있음
:::
- `docker-compose.yml` 의 certbot command 수정
```bash{9}
...
    certbot:
        depends_on:
            - webserver
        image: certbot/certbot
        volumes:
            - ./certbot-etc:/etc/letsencrypt
            - ./dist:/var/www/html
        command: certonly --webroot --webroot-path=/var/www/html --email temp@gmail.com --agree-tos --no-eff-email --force-renewal -d temp.temp.io
...
```
```bash
$ docker-compose up --force-recreate --no-deps certbot
```

### Step 3. ssl 적용

- ssl 관련 설정 다운로드
```bash
$ curl -sSLo nginx-conf/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf
```

- nginx 설정 수정
```bash
server {
	listen 80;
	listen [::]:80;

	server_name temp.temp.io;
	index index.html index.htm;
	root /var/www/html;

	location ~ /.well-known/acme-challenge {
		allow all;
		root /var/www/html;
	}

	location / {
		rewrite ^ https://$host$request_uri? permanent;
		try_files $uri $uri/ /index.html;
	}
}

server {
	listen 443 ssl http2;
	listen [::]:443 ssl http2;
	server_name temp.temp.io;

	index index.html index.htm;
	root /var/www/html;

	server_tokens off;
	client_max_body_size 100M;

	ssl_certificate /etc/letsencrypt/live/temp.temp.io/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/temp.temp.io/privkey.pem;
	ssl_trusted_certificate /etc/letsencrypt/live/temp.temp.io/chain.pem;
	include /etc/nginx/conf.d/options-ssl-nginx.conf;

	add_header X-Frame-Options "SAMEORIGIN" always;
	add_header X-XSS-Protection "1; mode=block" always;
	add_header X-Content-Type-Options "nosniff" always;
	add_header Referrer-Policy "no-referrer-when-downgrade" always;
	add_header Content-Security-Policy "default-src * data: 'unsafe-eval' 'unsafe-inline'" always;
	# add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
	# enable strict transport security only if you understand the implications

	location / {
		try_files $uri $uri/ /index.html;
	}
}
```
```bash
$ docker-compose up -d --force-recreate --no-deps webserver
```

- 인증서 자동 갱신을 위한 스크립트 작성 후 crontab 에 등록
- `ssl_renew.sh`
```bash{5}
#!/bin/bash
COMPOSE="/usr/local/bin/docker-compose --no-ansi"
DOCKER="/usr/bin/docker"

cd /home/temp/vuejsapp/
$COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP webserver
$DOCKER system prune -af
```
```bash
$ chmod +x ssl_renew.sh
$ sudo crontab -e

0 12 * * * /home/temp/vuejsapp/ssl_renew.sh >> /var/log/cron.log 2>&1
```
- `docker-compose.yml` 의 certbot command 수정
```bash{9}
...
    certbot:
        depends_on:
            - webserver
        image: certbot/certbot
        volumes:
            - ./certbot-etc:/etc/letsencrypt
            - ./dist:/var/www/html
        command: renew
...
```
```bash
$ docker-compose up --force-recreate --no-deps certbot
```

### Step 4. /dist vue.js 앱 배포

- `yarn build` 등을 통해 빌드된 결과를 `/dist` 에 복사
