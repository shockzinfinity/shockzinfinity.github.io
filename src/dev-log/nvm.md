---
title: Node 버전 관리
description: Node version management NVM
tags:
  - nvm
created: '2025-11-02'
updated: '2025-11-17'
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

## Windows

> [NVM for Windows](https://github.com/coreybutler/nvm-windows)

```powershell

> nvm version
1.2.2
> nvm install lts
Downloading node.js version 24.11.1 (64-bit)...
Extracting node and npm...
Complete
Installation complete.
If you want to use this version, type:

nvm use 24.11.1
> nvm use 24
Now using node v24.11.1 (64-bit)
> nvm ls

  * 24.11.1 (Currently using 64-bit executable)
```

## Reference

- [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
- [Windows](https://github.com/coreybutler/nvm-windows)
