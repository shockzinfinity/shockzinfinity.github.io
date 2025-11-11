---
title: Python 버전 관리
description: Python version management UV
tags:
  - uv
created: '2025-11-02'
updated: '2025-11-11'
---

# UV

<TagLinks />

[[toc]]

## Mac

> Mac, Linux install

```bash
# Mac, Linux
$ curl -LsSf https://astral.sh/uv/install.sh | sh
# Mac
$ brew install uv
```

> Windows install

```bash
$ powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

```bash
$ uv --version
$ uv init "project name"
$ cd "project name"
$ uv venv --python 3.13
$ source .venv/bin/activate
$ uv add pandas
$ uv remove pandas
$ uv run main.py
$ uv lock
$ uv python pin 3.13
$ uv python install 3.13
$ uv python list
$ uv python update-shell
$ uv pip install -r requirements.txt
```
