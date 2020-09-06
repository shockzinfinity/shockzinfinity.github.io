---
sidebar: auto
---

# dotnet core in Cent OS 8

## runtime 및 sdk 설치

```bash
$ dnf info dotnet-runtime-3.1
$ dnf install dotnet-runtime-3.1
$ dnf info aspnetcore-runtime-3.1
$ dnf install aspnetcore-runtime-3.1
$ dnf info dotnet-sdk-3.1
$ dnf install dotnet-sdk-3.1

$ dotnet --version
$ dotnet --info
```

## sql server on linux (docker containerized)

> [docker 이미지 버전 참조](https://hub.docker.com/_/microsoft-mssql-server)  
> [MSDN](https://docs.microsoft.com/ko-kr/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash)

```bash
$ docker run -d -p 1433:1433 -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=strongpassword" --name sql1 mcr.microsoft.com/mssql/server:2019-latest
```

::: tip

> SSMS 와 비슷한 툴 : Azure Data Studio (과거 SQL operation studio)  
> [install](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15)

:::

## mssql SA 암호 변경

```bash
$ docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "password" -Q 'ALTER LOGIN SA WITH PASSWORD="password"'
```
