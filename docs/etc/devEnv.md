---
sidebar: auto
---

# Development Settings on Mac

## 맥 터미널에서 VSCode 실행

```bash
$ vi ~/.zshrc

# ~/.zshrc
code () { VOCODE_CWD ="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}

$ source ~/.zshrc
```

## 전반적인 설정

> [원문](https://subicura.com/2017/11/22/mac-os-development-environment-setup.html)  

![개발환경설정](./image/mac.dev.settings.1.jpg)