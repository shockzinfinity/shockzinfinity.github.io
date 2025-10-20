---
title: Nginx
description: 'Nginx 설정 파일, 기타 내용을 다룹니다.'
tags:
  - nginx
  - reverse proxy
created: '2020-09-06'
updated: '2025-10-20'
---

# Nginx

<TagLinks />

[[toc]]

## nginx.conf

> 기본 골격  
> /etc/nginx/nginx.conf

```bash
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 2048;
}

http {
    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    # access_log off;
    log_not_found off;
    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    reset_timedout_connection on;
    keepalive_requests 1000;
    send_timeout 30;
    keepalive_timeout   65;
    types_hash_max_size 2048;
    server_names_hash_max_size 2048;

    # custom setting start
    server_tokens       off;
    gzip                on;
    gzip_disable        "msie6";
    gzip_comp_level 6;
    gzip_min_length 1100;
    gzip_buffers 16 8k;
    gzip_proxied any;
    gzip_types
        text/plain
        text/css
        text/js
        text/xml
        text/javascript
        application/javascript
        application/x-javascript
        application/json
        application/xml
        application/rss+xml
        image/svg+xml;
    # custom setting stop

    # SSL settings
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
    ssl_prefer_server_ciphers on;

    # Virtual Host Configs
    include /etc/nginx/sites-enabled/*;
}
```

## Vue.js 배포시 설정 추가

- Vue-Router 를 사용하기 위해 `nginx-conf` 혹은 `sites-available`의 설정에 다음을 추가한다.

```bash
location / {
    try_files $uri $uri/ @rewrites;
}

location @rewrites {
    rewrite ^(.+)$ /index.html last;
}

location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {
    expires max;
    add_header Pragma public;
    add_header Cache-Control "public, must-revalidate, proxy-revalidate";
}
```

## https custom port redirection

- e.g. http://todo.shockz.io:8080 -> https://todo.shockz.io:4443 으로 redirection `/etc/nginx/site-available/xxx.xxx.xxx` 상에서 조정

```bash{11,16,50}
server {
    listen       8080;
    server_name  todo.shockz.io;
    charset utf-8;
    rewrite_log  on;
    access_log  /var/log/nginx/todo.shockz.io.access.log  main;
    error_log  /var/log/nginx/todo.shockz.io.error.log  notice;
    client_max_body_size 0;
	root		/var/www/todo.shockz.io;
	location / {
		return 301 https://$host:4443$request_uri;
	}
}

server {
	listen		4443 ssl;
	server_name	todo.shockz.io;
	charset		utf-8;
	rewrite_log	on;
	access_log	/var/log/nginx/todo.shockz.io.access.log	main;
	error_log	/var/log/nginx/todo.shockz.io.error.log	notice;
	client_max_body_size 100M;
	root		/var/www/todo.shockz.io;
	index		index.html;
	ssl on;
	ssl_certificate "/etc/pki/nginx/fullchain.pem";
	ssl_certificate_key "/etc/pki/nginx/private/privkey.pem";
	ssl_session_cache shared:SSL:1m;
	ssl_session_timeout  10m;
	ssl_ciphers PROFILE=SYSTEM;
	ssl_prefer_server_ciphers on;

	# Load configuration files for the default server block.
	include /etc/nginx/default.d/*.conf;

	location / {
		try_files $uri $uri/ @rewrites;
	}

	location @rewrites {
		rewrite ^(.+)$ /index.html last;
	}

	location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {
		expires max;
		add_header Pragma public;
		add_header Cache-Control "public, must-revalidate, proxy-revalidate";
	}

	error_page 497 301 =307 https://$host:$server_port$request_uri;

	error_page 404 /404.html;
	location = /40x.html {
	}

	error_page 500 502 503 504 /50x.html;
	location = /50x.html {
	}
}
```

> 참고:
>
> - [https://ma.ttias.be/force-redirect-http-https-custom-port-nginx/](https://ma.ttias.be/force-redirect-http-https-custom-port-nginx/)
> - [https://k2boys.tistory.com/34](https://k2boys.tistory.com/34)
> - [https://www.kurien.net/post/view/34](https://www.kurien.net/post/view/34)

## nginx reverse proxy containerizing

- nginx 와 letsencrypt 로 reverse proxy 를 docker 로 올리는 방법에 대해 다룹니다.
- reverse proxy image : [https://github.com/nginx-proxy/nginx-proxy](https://github.com/nginx-proxy/nginx-proxy)
- letsencrypt image : [https://github.com/nginx-proxy/docker-letsencrypt-nginx-proxy-companion](https://github.com/nginx-proxy/docker-letsencrypt-nginx-proxy-companion)
- 위의 두 이미지를 통해 [nodejs sample app](https://shockzinfinity.github.io/tutorial/nodejs.sample.app.html) 으로 배포하는 과정까지 진행합니다.

### nginx-proxy container

```bash
# 기준 경로 : /home/temp/nginx-proxy
$ cd /home/temp/nginx-proxy
$ mkdir certs config html log proxy vhost.d
# 실제 proxy 의 container 는 /home/temp/nginx-proxy/proxy 에서 실행
$ cd proxy
$ touch docker-compose.yml
```

- `docker-compose.yml` 를 다음과 같이 작성
  ::: tip
  해당 호스트에서 외부에 서비스 하기 위함이므로, 사전에 docker network 생성이 필요함

```bash
$ docker network create nginx-proxy
```

:::

```yml
version: '3'

services:
  nginx-proxy:
    container_name: nginx-proxy
    image: jwilder/nginx-proxy
    ports:
      - 80:80
      - 443:443
    restart: always
    volumes:
      - /home/temp/nginx-proxy/log:/var/log/nginx
      - /home/temp/nginx-proxy/html:/usr/share/nginx/html
      - /home/temp/nginx-proxy/certs:/etc/nginx/certs
      - /home/temp/nginx-proxy/vhost.d:/etc/nginx/vhost.d
      - /home/temp/nginx-proxy/config:/etc/nginx/conf.d
      - /var/run/docker.sock:/tmp/docker.sock:ro
    labels:
      - com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy

  letsencrypt_nginx_proxy:
    container_name: leten-nginx-proxy
    image: jrcs/letsencrypt-nginx-proxy-companion
    restart: always
    depends_on:
      - nginx-proxy
    volumes:
      - /home/temp/nginx-proxy/certs:/etc/nginx/certs
      - /home/temp/nginx-proxy/vhost.d:/etc/nginx/vhost.d
      - /home/temp/nginx-proxy/html:/usr/share/nginx/html
      - /var/run/docker.sock:/var/run/docker.sock:ro

networks:
  default:
    external:
      name: nginx-proxy
```

```bash
$ docker-compose up -d
$ docker-compose ps
      Name                     Command               State                    Ports
-----------------------------------------------------------------------------------------------------
leten-nginx-proxy   /bin/bash /app/entrypoint. ...   Up
nginx-proxy         /app/docker-entrypoint.sh  ...   Up      0.0.0.0:443->443/tcp, 0.0.0.0:80->80/tcp
```

::: tip

- certs : letsencrypt 를 통해 생성된 인증서들의 저장 위치
- config : reverse proxy 를 통해 추가될때 자동 generation 되는 reverse proxy 의 default.conf 저장 위치
  :::

### sample app container 를 reverse proxy 에 붙이기

- sample app 이미지 생성은 [https://shockzinfinity.github.io/tutorial/nodejs.sample.app.html](https://shockzinfinity.github.io/tutorial/nodejs.sample.app.html) 참조하여 생성했습니다.
- 해당 이미지 (ghcr.io/shockzinfinity/node-sample-app:latest) 를 containerization

```bash
# 원하는 위치에 docker-compose.yml 파일 생성 (여기서는 /your/path/sample)
$ cd /you/path/sample
$ touch docker-compose.yml
```

```yml
version: '3'

services:
  nodejs-test:
    container_name: node-test
    image: ghcr.io/shockzinfinity/node-sample-app:latest
    environment:
      - VIRTUAL_HOST=nodetest.your.domain
      - VIRTUAL_PORT=3000
      - LETSENCRYPT_HOST=nodetest.your.domain
      - LETSCRYPT_EMAIL=email@your.domain

networks:
  default:
    external:
      name: nginx-proxy
```

::: warning

- reverse proxy 의 네트워크상에 같이 위치해야 하므로 networks 는 nginx-proxy 를 이용합니다.
- `VIRTUAL_HOST`, `VIRTUAL_PORT`, `LETSENCRYPT_HOST`, `LETSCRYPT_EMAIL` 는 proxy 할 환경에 맞게 수정이 필요합니다.
- 위의 4가지 환경변수는 추후 reverse proxy 추가할때마다 적절하게 수정이 필요합니다.
  :::

```bash
$ docker-compose up -d
$ docker-compose ps
  Name                 Command               State    Ports
-------------------------------------------------------------
node-test   docker-entrypoint.sh /bin/ ...   Up      3000/tcp

# 생성된 인증서 및 config 내용 확인 (/home/temp/nginx-proxy/config)
$ cd /home/temp/nginx-proxy/config
$ sudo cat default.conf
...
# nodetest.your.domain
upstream nodetest.your.domain {
				## Can be connected with "nginx-proxy" network
			# node-test
			server 172.28.0.4:3000;
}
server {
	server_name nodetest.your.domain;
	listen 80 ;
	access_log /var/log/nginx/access.log vhost;
	# Do not HTTPS redirect Let'sEncrypt ACME challenge
	location /.well-known/acme-challenge/ {
		auth_basic off;
		allow all;
		root /usr/share/nginx/html;
		try_files $uri =404;
		break;
	}
	location / {
		return 301 https://$host$request_uri;
	}
}
server {
	server_name nodetest.your.domain;
	listen 443 ssl http2 ;
	access_log /var/log/nginx/access.log vhost;
	ssl_session_timeout 5m;
	ssl_session_cache shared:SSL:50m;
	ssl_session_tickets off;
	ssl_certificate /etc/nginx/certs/nodetest.your.domain.crt;
	ssl_certificate_key /etc/nginx/certs/nodetest.your.domain.key;
	ssl_dhparam /etc/nginx/certs/nodetest.your.domain.dhparam.pem;
	ssl_stapling on;
	ssl_stapling_verify on;
	ssl_trusted_certificate /etc/nginx/certs/nodetest.your.domain.chain.pem;
	add_header Strict-Transport-Security "max-age=31536000" always;
	include /etc/nginx/vhost.d/default;
	location / {
		proxy_pass http://nodetest.your.domain;
	}
}
...
```

::: tip

- 컨테이너를 올리고 나서 인증서 갱신 때문에 약간의 지연시간이 발생할 수 있습니다.
  :::

### phpmyadmin reverse proxy

```bash
$ pwd
/home/ubuntu
$ mkdir phpmyadmin
$ cd phpmyadmin
$ touch docker-compose.yml
```

```docker
version: '2'

services:
  phpmyadmin:
    container_name: phpmyadmin
    image: phpmyadmin/phpmyadmin
    restart: unless-stopped
    ports:
      - 8080:80
    environment:
      - PMA_HOSTS=dbhost # 여기에 접속할 디비 호스트 주소 (쉼표로 구분하여 복수개 지정 가능)
      - PMA_PORTS=3306 # 디비 호스트 포트 쉼표로 구분 (기본 포트를 사용할 경우는 지정하지 않아도 가능 ex: 13306,,13305)
      - VIRTUAL_HOST=domain.address
      - VIRTUAL_PORT=8080
      - LETSENCRYPT_HOST=domain.address
      - LETSCRYPT_EMAIL=email@email.com

networks:
  default:
    external:
      name: nginx-proxy
```

::: tip

- [phpmyadmin environment 참고](https://hub.docker.com/r/phpmyadmin/phpmyadmin/)

| env              | Description                                                                                    |
| :--------------- | :--------------------------------------------------------------------------------------------- |
| PMA_ARBITRARY    | 로그인 화면에 접속할 서버를 직접 입력할 수 있는 폼을 제공합니다.                               |
| PMA_HOST         | 접속할 서버를 특정합니다. (로그인 화면에서 접속할 서버를 선택할 수 없음)                       |
| PMA_PORT         | 접속할 포트를 특정합니다. (로그인 화면에서 접속할 포트를 선택할 수 없음)                       |
| PMA_HOSTS        | 로그인 화면에 접속할 서버를 선택할 수 있는 드랍다운 폼을 제공합니다.                           |
| PMA_PORTS        | 로그인 화면에 접속할 포트를 선택할 수 있는 드랍다운 폼을 제공합니다.                           |
| PMA_USER         | 서버에 접속할 사용자 계정을 특정합니다. (로그인 화면에서 사용자 계정을 입력할 수 없음)         |
| PMA_PASSWORD     | 서버에 접속할 사용자 비밀번호를 특정합니다. (로그인 화면에서 사용자 비밀번호를 입력할 수 없음) |
| PMA_ABSOLUTE_URI |                                                                                                |

:::
