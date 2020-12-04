---
title: python 관련
lang: ko-KR
meta:
  - name: description
    content: python 과 관련된 내용을 기록합니다.
  - name: keywords
    content: python
tags: ["python"]
sidebar: auto
feed:
  enable: true
  title: python 관련
  description: python 과 관련된 내용을 기록합니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/python.html
---

# Python

<TagLinks />

[[toc]]

## Python 배우기 좋은 사이트

- [w3schools.com](https://www.w3schools.com/python/)

## Python (on ubuntu)
> pyenv, virtualenv, autoenv

### general

```bash
# python 설치 시 발생하는 문제를 해결하기 위해 사전 패키지 설치
$ sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev
```

### pyenv
> python version management

```bash
$ git clone https://github.com/pyenv/pyenv.git ~/.pyenv
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
$ source ~/.bash_profile
$ pyenv versions

# 필요한 버전 설치
$ pyenv install 3.9.0
$ pyenv shell 3.9.0
$ python -V
```

### virtualenv
> 설정 파일 및 환경 변수를 pyenv 와 함께 관리하기 위해...

```bash
$ git clone https://github.com/yyuu/pyenv-virtualenv.git ~/.pyenv/plugins/pyenv-virtualenv
$ echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
$ source ~/.bash_profile

# 테스트 환경 만들기
$ pyenv virtualenv 3.9.0 test-env
$ pyenv versions
$ pyenv activate test-env
$ pyenv deactivate
```

### autoenv
> 특정 디렉토리로 들어가면 자동을 개발환경 전환 되도록...

```bash
$ git clone git://github.com/kennethreitz/autoenv.git ~/.autoenv
$ echo 'source ~/.autoenv/activate.sh' >> ~/.bash_profile
$ source ~/.bash_profile
$ mkdir test-dir && cd test-dir
$ touch .env
$ echo "pyenv activate test-env" > .env

$ cd test-dir
```

## Tip

- 작업디렉토리 변경 및 이동
  - realpath() : 심볼릭 링크등의 실제경로
  - abspath() : 절대경로
```python
import os

os.path.realpath(__file__)
os.path.abspath(__file__)
os.getcwd()
os.listdir(os.getcwd())
os.chdir("workspace")
os.system("git clone https://temp.shockz.io/shockz/temp.git")
```
