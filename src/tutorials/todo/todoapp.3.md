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

# Todo App Tutorial #3 - Frontend

<TagLinks />

---

> 부제: Todo App 을 만드는 **꽤** 복잡한 방법  
> 참고 Repository:

- Backend: [Github Repository](https://github.com/shockzinfinity/todo-app-complicated)
- Frontend: [Github Repository](https://github.com/shockzinfinity/todo-app-complicated-trello-copy)

[[toc]]

---

## Frontend (upcoming)

- copy [Trello](https://trello.com)

::: warning
현재까지 버그 및 필요사항

1. input blur 이벤트 버블링에 문제가 있음. 원인 파악중
2. Flow 간 TodoItem 이동 시 FlowId 변경이 안되는 현상
   - Backend API 에서 JsonPatch 적용 필요
3. Category 추가 시 기본 Flow 생성하여 DB 저장 필요
4. 테스트 서버 배포
   :::

### 요구사항 분석 (기본, 추가)

#### 기본 요구사항

1. 홈페이지 접속 - 비인가 접속은 로그인 페이지로 이동
2. 로그인 페이지 접속 - 로그인 수행
3. 홈페이지 리다이렉트
4. 카테고리 조회
5. 카테고리 생성 - 생성한 카테고리 화면 이동
6. 카테고리 조회 - 자동 생성된 리스트 나열 (Todo, Doing, Done)
7. Todo Item 생성 - 타이틀 입력
8. Todo Item 상세 조회 - 모달창
9. Todo Item 수정 - 타이틀, 설명
10. Todo Item 이동 1 - 리스트 안에서 이동
11. Todo Item 이동 2 - 리스트 간에 이동
12. Todo Item 삭제
13. 카테고리 세팅 - 사이드바
14. 카테고리 삭제 - 삭제 후 홈페이지 이동

#### 추가 요구사항

1. 카테고리 수정 - 색상 변경
2. 카테고리 수정 - 이름 변경
3. 플로우 생성
4. 플로우 수정 - 이름 변경
5. 플로우 이동
6. 플로우 삭제

### 관련 필요 기술 준비

- Vue.js
- Vuex
- VueRouter
- Axios
- Dragula
