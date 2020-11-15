---
title: mariaDB
lang: ko-KR
meta:
  - name: description
    content: mariaDB 설정 파일, 기타 내용을 다룹니다.
  - name: keywords
    content: mariaDB
tags: ["mariaDB"]
sidebar: auto
feed:
  enable: true
  title: mariaDB
  description: mariaDB 설정 파일, 기타 내용을 다룹니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/maria.html
---

# mariaDB

<TagLinks />

[[toc]]

## General

```bash
# aws s3 를 이용하여 이동 - aws configure 를 통해 미리 인증정보 등록되어 있다고 가정
$ aws s3 cp s3://버킷주소/backup.db.sql ./
# 업로드는
$ aws s3 cp backup.db.sql s3://버킷주소/backup.db.sql

# 디비 백업
$ mysqldump -h DB주소 -uwordpress -p --databases 디비명 > backup.db.sql

# 디비 복원 시
MariaDB > CREATE DATABASE database_name;
MariaDB > grant all privileges on database_name.* to 'wordpress'@'%';
MariaDB > flush privileges;

# 디비 복원
$ mysql -uwordpress -p database_name < ./backup.db.sql

# 디비 접속 확인
$ mysql -uwordpress -p

# 디비 리스트
MariaDB > show databases;

# 디비 사용자 리스트
MariaDB > use mysql;
MariaDB > select host, user, password from user;

# 원격접속 가능토록...
MariaDB > grant all privileges on *.* to 'wordpress'@'%' identified by 'password';

# 외부에서 maria db 찾지 못할때 확인
$ cat /etc/mysql/my.cnf
# bind-address = 127.0.0.1 부분이 있으면 주석처리 후 mysql 재시작
```

## 워드프레스 가입자 체크 (월별)

```sql
SELECT DATE_FORMAT(user_registered, '%Y%m') AS date, COUNT(*) FROM wp_users wu
GROUP BY DATE_FORMAT(user_registered, '%Y%m')
ORDER BY date DESC
```

## restore 시 에러

- **ERROR 1227 (42000) at line 3825: Access denied; you need (at least one of) the SUPER, SET USER privilege(s) for this operation**

```bash
# 위와 같이 나오면서 복원이 안되는 경우는
# 오류가 난 파일을 살펴보니 프로시저를 정의할때 프로시저명 앞에 DEFINER가 정의가 되어 있었음.
# 이 DEFINER의 권한으로 DB접속을 해서 import를 하든지, 혹은 import하는 파일 내용중에서 DEFINER부분을 삭제하면 됨.

$ sed -i 's/DEFINER=[^*]*\*/\*/g' backup.db.sql
```
