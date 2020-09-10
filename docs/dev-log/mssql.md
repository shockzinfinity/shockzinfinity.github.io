---
title: mssql on docker
lang: ko-KR
meta:
  - name: description
    content: mssql on docker
  - name: keywords
    content: mssql
tags: ["mssql", "docker"]
sidebar: auto
---

# mssql on docker

## docker data volume 생성

```bash
$ docker volume create sql_volume
$ docker volume ls
$ docker volume inspect sql_volume
```

## network

> 추후 .net core app 의 connection string 을 단순하게 하기 위해 docker network 를 생성하여 묶어준다.

```bash
$ docker network create todo-api
$ docker network ls
$ docker network inspect todo-api
```

## run

```bash
$ docker run -d -p 1433:1433 -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=y0urStrong!Password" --network=todo-api --name sql1 -v sql_volume:/var/opt/mssql mcr.microsoft.com/mssql/server:2019-latest
```

## DB restore test

> 테스트를 위한 [AdventureWorks](https://docs.microsoft.com/ko-kr/sql/samples/adventureworks-install-configure?view=sql-server-ver15&tabs=ssms) 다운로드  
> SSMS 또는 [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15) (과거 SQL operation studio) 로 테스트

```bash
$ docker exec -d sql1 mkdir /var/opt/mssql/backup
$ docker cp AdventureWorks2019.bak sql1:/var/opt/mssql/backup/AdventureWorks2019.bak

# 삭제 시
$ docker exec -it sql1 rm /var/opt/mssql/backup/AdventureWorks2019.bak
$ docker exec -it -u root sql1 rm /var/opt/mssql/backup/AdventureWorks2019.bak
```
```sql
-- 백업파일 확인
RESTORE FILELISTONLY FROM DISK = N'/var/opt/mssql/backup/AdventureWorks2019.bak'
GO

RESTORE DATABASE AdventureWorks2019 FROM DISK = N'/var/opt/mssql/backup/AdventureWorks2019.bak'
WITH
MOVE 'AdventureWorks2017' TO '/var/opt/mssql/data/AdventureWorks2019.mdf',
MOVE 'AdventureWorks2017_log' TO '/var/opt/mssql/data/AdventureWorks2019_log.ldf'
GO

SELECT Name FROM sys.Databases

-- /var/opt/mssql/backup 에 백업생성
BACKUP DATABASE [AdventureWorks2019] TO DISK = N'/var/opt/mssql/backup/AdventureWorks2019_2.bak'
WITH NOFORMAT, NOINIT, NAME = 'AdventureWorks2019-full', SKIP, NOREWIND, NOUNLOAD, STATS = 10
```
> sqlcmd 이용

```bash
$ docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd -S localhost \
   -U SA -P 'y0urStrong!Password' \
   -Q 'RESTORE FILELISTONLY FROM DISK = "/var/opt/mssql/backup/AdventureWorks2019.bak"' \
   | tr -s ' ' | cut -d ' ' -f 1-2

$ docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd \
   -S localhost -U SA -P 'y0urStrong!Password' \
   -Q 'RESTORE DATABASE AdventureWorks2019 FROM DISK = "/var/opt/mssql/backup/AdventureWorks2019.bak" WITH MOVE "AdventureWorks2017" TO "/var/opt/mssql/data/AdventureWorks2019.mdf", MOVE "AdventureWorks2017_log" TO "/var/opt/mssql/data/AdventureWorks2019_log.ldf"'

$ docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd \
   -S localhost -U SA -P 'y0urStrong!Password' \
   -Q 'SELECT Name FROM sys.Databases'

$ docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd \
   -S localhost -U SA -P 'y0urStrong!Password' \
   -Q "BACKUP DATABASE [AdventureWorks2019] TO DISK = N'/var/opt/mssql/backup/AdventureWorks2019_2.bak' WITH NOFORMAT, NOINIT, NAME = 'AdventureWorks2019-full', SKIP, NOREWIND, NOUNLOAD, STATS = 10"
```

## mssql sa 암호 변경

```bash
$ docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "y0urStrong!Password" -Q 'ALTER LOGIN SA WITH PASSWORD="y0urNewStrong!Password"'
```

## Reference

- [https://docs.microsoft.com/ko-kr/sql/linux/tutorial-restore-backup-in-sql-server-container?view=sql-server-ver15](https://docs.microsoft.com/ko-kr/sql/linux/tutorial-restore-backup-in-sql-server-container?view=sql-server-ver15)
- [https://www.c-sharpcorner.com/article/using-docker-volumes-for-sql-server-in-linux/](https://www.c-sharpcorner.com/article/using-docker-volumes-for-sql-server-in-linux/)
- [https://www.sqlservercentral.com/blogs/docker-containers-and-persistent-data](https://www.sqlservercentral.com/blogs/docker-containers-and-persistent-data)
- [docker 이미지 버전 참조](https://hub.docker.com/_/microsoft-mssql-server)  
- [MSDN](https://docs.microsoft.com/ko-kr/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash)
