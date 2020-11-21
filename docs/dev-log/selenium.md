---
title: selenium on mac
lang: ko-KR
meta:
  - name: description
    content: selenium on mac
  - name: keywords
    content: selenium
tags: ["selenium"]
sidebar: auto
feed:
  enable: true
  title: selenium on mac
  description: selenium on mac
  image: /public/imgrkdown/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/etc/selenium.html
---

# SSL tip

<TagLinks />

[[toc]]

## selenium capabilities 관련 오류 발생 시

- Edge on Mac
```python
from selenium import webdriver

edge_options = {
    "executable_path": "/Users/temp/selenium/edgedriver_mac64/msedgedriver",
    "capabilities": {
        "platformName": 'mac os x'
    }
}

browser = webdriver.Edge(**edge_options)
```
::: info
[https://gist.github.com/fliedonion/86bb8f60def00d1f531e92c1ff148234](https://gist.github.com/fliedonion/86bb8f60def00d1f531e92c1ff148234)
:::
