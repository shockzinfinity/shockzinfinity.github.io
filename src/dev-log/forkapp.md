---
title: Fork app 에서의 precommit (husky) 문제 해결
description: Fork app 에서의 precommit (husky) 문제 해결
tags:
  - fork
  - husky
  - precommit
created: '2025-11-02'
updated: '2025-11-02'
---

# Precommit problem on Fork app

## 문제상황

- husky 를 이용하여 precommit 을 설정했을때
- Fork gui git client 를 사용하고 있는 상황
- precommit 에서 환경변수를 제대로 사용하지 못하는 상황

- `precommit.sh` 가 아닌 `precommit` 이어야 함.
- Fork app 에서 ENV 를 system 으로 설정 - 첨부이미지 예정
