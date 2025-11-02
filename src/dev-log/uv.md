---
title: Python 버전 관리
description: Python version management UV
tags:
  - uv
created: '2025-11-02'
updated: ''
---

# UV

<TagLinks />

[[toc]]

## Mac

```bash
$ brew install uv
$ uv --version
$ uv init "project name"
$ cd "project name"
$ uv venv --python 3.13
$ source .venv/bin/activate
$ uv add pandas
$ uv remove pandas
$ uv run main.py
$ uv python pin 3.13
$ uv python install 3.13
$ uv python list
$ uv python update-shell
```
