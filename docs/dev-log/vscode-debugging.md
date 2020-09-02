---
sidebar: auto
---

# Using edge debugger in vscode

[[toc]]

## setting

> Vue CLI 3 기준
> _vue.config.js_ 에 추가
> [Debugging in VS Code](https://kr.vuejs.org/v2/cookbook/debugging-in-vscode.html)

```javascript
module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
};
```

> VSCode 에 확장 설치  
> ![Extension 설치](./image/extension.png)

> _{root}/.vscode/lanunch.json_ 에 설정  
> ![setting0](./image/setting.0.png)  
> ![setting1](./image/setting.1.png)

```bash
$ yarn serve # http://localhost:8080
```

> vscode debugger 시작
