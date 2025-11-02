---
title: Node 버전 관리
description: Node version management NVM
tags:
  - nvm
created: '2025-11-02'
updated: ''
---

# NVM

<TagLinks />

[[toc]]

## Mac

```bash
# install
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

$ nvm install node
$ nvm ls

$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)
$ node -v
v12.22.6
```

## Reference

- [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
