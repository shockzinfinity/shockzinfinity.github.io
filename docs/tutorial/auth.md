---
title: Auth API tutorial
lang: ko-KR
meta:
  - name: description
    content: (.net core) Email sign up, Verification email, Authentication and Forgot password
  - name: keywords
    content: auth
tags: ["authentication", ".net core", "swagger"]
sidebar: auto
disqus: yes
feed:
  enable: true
  title: Auth API tutorial
  description: (.net core) Email sign up, Verification email, Authentication and Forgot password
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/tutorial/auth.html
---

# Authe API tutorial

<TagLinks />

---

[[toc]]

---

## 기능 정의
- Email sign up and verification
- JWT authentication with refresh token
- Role based authorization (User, Admin)
- Forgot password and reset password
- Account management
- Swagger

## 필요 사항

- SMTP setting
- HTTP only cookie (prevent XSS)
- Refresh token rotation (prevent CSRF)
- Secret key for generating a JWT signing

# Postman 테스팅

1. Register a new account
2. Verify an account
3. Access an account with forgotten password
4. Reset the password of an account
5. Authenticate to get a JWT token and a refresh token
6. Get a list of all accounts
7. Update an account
8. Use a refresh token to get a new JWT token
9. Revoke a refresh token
10. Delete an account

