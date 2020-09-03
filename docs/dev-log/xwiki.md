---
sidebar: auto
---

# XWiki 설치

[[toc]]

## Postgresql 설치

> CentOS 8 에 기본 설치 패키지 제거 후 설치  
> PostgreSQL 12 기준  
> [참고](https://computingforgeeks.com/how-to-install-postgresql-12-on-centos-7/)

```bash
$ dnf install https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
$ rpm -qi pgdg-redhat-repo
$ dnf -qy module disable postgresql
$ dnf remove postgresql postgresql-server
# dnf -y reinstall postgresql12 postgresql12-server (재설치)
$ dnf -y install postgresql12 postgresql12-server

# db 초기화
$ /usr/pgsql-12/bin/postgresql-12-setup initdb

# 기존 postgresql 이 실행중일 경우
$ systemctl disable --now postgresql
# default 로 설치 시 기본설정파일 위치 : /var/lib/pgsql/12/data/postgresql.conf
$ systemctl enable --now postgresql-12

$ firewall-cmd --add-service=postgresql --permanent
$ firewall-cmd --reload

# admin 계정 초기화
$ sudo su - postgres
$ psql -c "ALTER USER postgres WITH PASSWORD 'StrongPassword'"

# <vi color 변경> => vi command: color desert
```

## PostgreSQL 설정파일 변경

> /var/lib/pgsql/12/data/postgresql.conf 상에서

```bash
#listen_addresses = 'localhost,172.17.0.1' 로 변경
listen_addresses = '*'
```

::: warning
listen_addresses 를 '\*' 로 설정
시스템 시작 시 docker network listen이 안되는 현상
근본적인 해결책 찾기 전까지는 \* 로 설정
:::

> /var/lib/pgsql/12/data/pg_hba.conf 상에서 (screenshot 참조)

```bash
host    all             all             0.0.0.0/0           md5
```

> ![current config](./image/pg_hba.cfg.png)

```bash
$ netstat -an | grep 5432 # 확인

$ sudo -u postgres psql
postgres=# CREATE DATABASE xwiki;
postgres=# CREATE USER xwikiuser WITH ENCRYPTED PASSWORD 'xwikiuserpassword';
postgres=# GRANT ALL PRIVILEGES ON DATABASE xwiki TO xwikiuser;
postgres=#\q

$ psql -h localhost -U xwikiuser -d xwiki -W
```

## Xwiki docker 설치

```bash
# xwiki
$ docker run  --detach --publish 8000:8080 --name xwiki --restart always --volume /home/shockz/docker/xwiki/data:/usr/local/xwiki/data -e "DB_USER=xwikiuser" -e "DB_PASSWORD=xwikiuserpassword" -e "DB_DATABASE=xwiki" -e "DB_HOST=172.17.0.1" xwiki:stable-postgres

$ docker exec -it -u 0 xwiki bash
$ unlink /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime # in xwiki shell
$ date

# ~/docker/xwiki/data/xwiki.cfg 추가 (volume 연결되어 있음)
xwiki.authentication.ldap=1
xwiki.authentication.class=org.xwiki.contrib.ldap.XWikiLDAPAuthServiceImpl
xwiki.authentication.ldap.ssl=0
xwiki.authentication.ldap.timeout=5000
xwiki.authentication.ldap.trylocal=1
```
