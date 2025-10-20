---
title: Todo App tutorial
description: Todo App 을 만드는 꽤 복잡한 방법
tags:
  - todoapp
  - .net core
  - nginx
  - mssql
  - docker
  - ssl
  - swagger
  - seq
  - serilog
  - docker-compose
  - cqrs / es
created: '2020-09-29'
updated: '2025-10-20'
---

# Todo App Tutorial #1 - Introduction

<TagLinks />

---

> 부제: Todo App 을 만드는 **꽤** 복잡한 방법  
> 참고 Repository: [Github Repository](https://github.com/shockzinfinity/todo-app-complicated)

[[toc]]

---

## 개요

Todo App 은 새로운 언어 및 개발 기술을 습득하기 위해 자주 이용되는 방법 중에 하나입니다. (아마 Hello World 다음으로 가장 많지 않을까 합니다.) 인터넷상에 대충 검색해봐도 간단하게 Todo App 을 만드는 방법 Frontend, Backend 가릴 것 없이 다양한 기술 스택으로 구현하는 방법이 굉장히 많습니다.  
다만, 개인적인 생각으로는 각각의 기술로 Todo App 을 구현하는 방법은 많지만 내용들이 너무 파편화가 심한것 같습니다. 특정한 기술 및 언어를 가지고 어떻게 구현하는지에 대한 방법은 셀수 없이 많지만 정작 Todo App 을 처음부터 시작해서 마지막 배포하여 운영하는 전체 과정을 다룬 내용은 아직까지 찾지 못했습니다. (~~검색을 잘 못합니다.~~) Todo App 정도 구현하는데에 많은 방법이 필요한 것은 아니지만, 비즈니스 scope를 어떻게 정의하는지에 따라 다를 수 있다고 생각합니다.  
물론 [RealWorld](https://github.com/gothinkster/realworld)와 같은 훌륭한 프로젝트도 있습니다.

이 Tutorial 의 목적은 다양한 기술 스택에 대해 좀 더 잘 이해하고 능숙해지고자 작성하게 됐습니다. 보유하고 있는 기술 및 아이디어의 한계로 인하여 최고의 방법으로 구현하지는 못할 수 있으나 최소한 생각거리를 제공하고 노하우를 공유하고자 하는 마음으로 작성합니다.

이 Tutorial 에서는 Todo App 이라는 비즈니스 요구사항을 닷넷 기반 혹은 관련 기술들로 구현한다고 가정하겠습니다. 전반적인 기술 스택 및 아키텍처에 대해서는 차차 도식화를 추가할 예정입니다. 여기서 다뤄지는 비즈니스 요구사항은 가정이 많습니다. 현실과 동떨어진 내용이 있을 수 있으니 양해바랍니다.

::: danger 주의
이 Tutorial 은 수시로 업데이트 되며 기술 스택 및 애플리케이션 아키텍처등이 예고없이 변경될 수 있습니다. 가상의 비즈니스 상황에 따라 작성하다 보니 비즈니스 요구사항은 수시로 변경될 수 있고 그에 따라 어떻게 기술 스택에 바꾸고 개선하는지에 대한 내용을 다루고자 합니다. 다만 의식의 흐름에 따라 작성하다 보니 두서 없이 내용이 전개될 수 있으니 참고해주시면 감사하겠습니다.
:::

## Detail steps & Tech Stack

이 Tutorial 에서 다루는 Tech stack 입니다. 이 tech stack 이 최선은 아닙니다. 모든 기술은 현재 가지고 있는 자원에서 가장 효율적으로 원하는 비즈니스 요구사항을 표현하기 위해서 선택되어야 한다고 생각합니다. 여기서는 제가 가지고 있는 기술 스택이 .net 기반이기에 아래의 스택 및 과정으로 표현이 될 뿐이고 얼마든지 Todo App 을 표현하기 위해 효율적이라고 생각되는 기술로 대체될 수 있습니다.

아래의 모든 Tech Stack 은 Todo App 을 만드는데에 있어 필수 사항은 아니며, 각 부분별로 적절한 기술로 대체 가능한 영역입니다.

- API (Backend)

  - ASP.NET core 3.1
  - MS SQL Server 2019
  - Docker
  - Nginx
  - SSL
  - Seq, Serilog Logger
  - Swagger
  - Authentication

- App (Frontend)

  - Vue.js (upcoming)

- Refactoring
  - DDD / CQRS (upcoming)
  - API Gateway with Ocelot

## Reference

- [RealWorld](https://github.com/gothinkster/realworld)
- [자습서: ASP.NET Core를 사용하여 웹 API 만들기](https://docs.microsoft.com/ko-kr/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1&tabs=visual-studio)
- [마이그레이션 적용](https://docs.microsoft.com/ko-kr/ef/core/managing-schemas/migrations/applying?tabs=dotnet-core-cli)
- [자습서: 마이그레이션 기능 사용 - ASP.NET MVC 및 EF Core 사용](https://docs.microsoft.com/ko-kr/aspnet/core/data/ef-mvc/migrations?view=aspnetcore-3.1)
