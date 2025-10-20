---
title: selenium on mac
description: selenium on mac
tags:
  - selenium
created: '2020-11-21'
updated: '2025-10-20'
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

::: tip
[https://gist.github.com/fliedonion/86bb8f60def00d1f531e92c1ff148234](https://gist.github.com/fliedonion/86bb8f60def00d1f531e92c1ff148234)
:::

## tutorial site

- [Selenium with Python](https://selenium-python.readthedocs.io/)
