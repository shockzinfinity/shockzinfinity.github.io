---
title: Datalust/Seq
lang: ko-KR
meta:
  - name: description
    content: datalust seq 사용에 관한 내용입니다.
  - name: keywords
    content: seq
tags: ["seq"]
sidebar: auto
feed:
  enable: true
  title: Datalust/Seq
  description: datalust seq 사용에 관한 내용입니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/seq.html
---

# Seq

<TagLinks />

[[toc]]

## seq docker-compose

- 구동환경: nginx reverse proxy 를 통해 구동
- reverse proxy 는 jwilder/nginx-proxy 를 이용
- `docker-compose.yml`
```docker
version: "3.7"

services:
  seq:
    image: datalust/seq:latest
    container_name: seq
    expose:
        - "80"
        - "5341"
    restart: "unless-stopped"
    environment:
        - ACCEPT_EULA=Y
        - SEQ_API_INGESTIONPORT=5341
        - VIRTUAL_HOST=logdomain.xxx.xxx
        - VIRTUAL_PORT=80
        - LETSENCRYPT_HOST=logdomain.xxx.xxx
        - LETSCRYPT_EMAIL=email@yourmail.com
    ports:
        - "5341:5341"
    volumes:
        - ./data:/data

networks:
  default:
    external:
      name: nginx-proxy
```
- ingestion port 는 http 전송

## netcore 에서 Seq 사용

- netcore 코드 상에서 Serilog 등을 이용하여 ingestion port 로 전송
- logger configuration 을 조정하여 `Program.cs` 혹은 `Startup.cs` 에 등록하여 사용
```csharp
var seqUri = Configuration.GetValue<string>("SeqConfiguration:Uri");
var apiKey = Configuration.GetValue<string>("SeqConfiguration:ApiKey");

Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .Enrich.WithProperty("Envrionment", context.HostingEnvironment.EnvrionmentName)
            .Enrich.WithProperty("Application", context.HostingEnvironment.ApplicationName)
            .Enrich.WithMachineName()
            .WriteTo.Debug()
            .WriteTo.Console()
            .WriteTo.Seq(seqUri, apiKey: apiKey)
            .CreateLogger();
```
![seq.ingestion](./image/seq.ingestion.1.png)
