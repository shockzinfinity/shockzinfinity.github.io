---
title: Nginx
lang: ko-KR
meta:
  - name: description
    content: Nginx 설정 파일, 기타 내용을 다룹니다.
  - name: keywords
    content: nginx
tags: ["nginx", "reverse proxy"]
sidebar: auto
feed:
  enable: true
  title: Nginx
  description: Nginx 설정 파일, 기타 내용을 다룹니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/nginx.html
---

# Nginx

<TagLinks />

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
