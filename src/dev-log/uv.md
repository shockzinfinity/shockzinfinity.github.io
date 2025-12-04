---
title: Python 버전 관리
description: Python version management UV
tags:
  - uv
created: '2025-11-02'
updated: '2025-12-04'
---

# UV

<TagLinks />

[[toc]]

## Mac, Linux

> Mac, Linux

```bash
Linux
$ curl -LsSf https://astral.sh/uv/install.sh | sh
# Mac
$ brew install uv
```

> Windows install

```powershell
> powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

```bash
$ uv --version

# init
$ uv init "project name"
$ cd "project name"

# venv
$ uv venv
$ uv venv --python 3.13
# mac, linux
$ source .venv/bin/activate
# windows
$ .venv\Scripts\activate

$ uv run main.py

$ uv add pandas
$ uv remove pandas
$ uv lock
$ uv pip freeze > requirements.txt
$ uv pip install -r requirements.txt

$ uv python pin 3.13
$ uv python install 3.13
$ uv python list
$ uv python update-shell
```

## 패키지 관리 명령어

```bash
# 기본 패키지 설치
uv pip install requests  # requests 패키지 설치

# 특정 버전 설치
uv pip install requests==2.31.0  # requests 2.31.0 버전 설치
uv pip install "requests>=2.31.0"  # requests 2.31.0 이상 버전 설치
uv pip install "requests<3.0.0"  # requests 3.0.0 미만 버전 설치

# 개발 의존성 설치
uv pip install --dev pytest  # 개발 환경에서만 필요한 패키지 설치
uv pip install --dev black isort mypy  # 여러 개발 도구 한 번에 설치

# 패키지 제거
uv pip uninstall requests  # requests 패키지 제거
uv pip uninstall -y requests  # 확인 없이 바로 제거

# 패키지 업그레이드
uv pip install --upgrade requests  # requests 패키지 최신 버전으로 업그레이드
uv pip install --upgrade pip  # pip 자체 업그레이드

# 패키지 검색
uv pip search "data science"  # 키워드로 패키지 검색

# 패키지 정보 확인
uv pip show requests  # requests 패키지 상세 정보 확인
uv pip list  # 설치된 모든 패키지 목록 확인
uv pip list --outdated  # 업그레이드가 필요한 패키지 목록 확인
```

## 프로젝트 관리 명령어

```bash
# 새 프로젝트 생성
uv init my-project  # 기본 프로젝트 생성
uv init my-project --python 3.11  # 특정 Python 버전으로 프로젝트 생성
uv init my-project --no-venv  # 가상환경 없이 프로젝트 생성

# 의존성 관리
uv add requests  # requests 패키지 추가
uv add requests==2.31.0  # 특정 버전의 requests 추가
uv add --dev pytest  # 개발 의존성으로 pytest 추가
uv add -e ./local-package  # 로컬 패키지를 개발 모드로 추가

# 의존성 제거
uv remove requests  # requests 패키지 제거
uv remove --dev pytest  # 개발 의존성 제거

# 의존성 동기화
uv sync  # 모든 의존성 설치/업데이트
uv sync --dev  # 개발 의존성 포함하여 동기화
uv sync --no-dev  # 개발 의존성 제외하고 동기화

# 의존성 잠금
uv lock  # 현재 의존성 상태를 잠금 파일에 저장
uv lock --dev  # 개발 의존성 포함하여 잠금
uv lock --no-dev  # 개발 의존성 제외하고 잠금
```

## 가상환경 명령어

```bash
# 가상환경 생성
uv venv  # 기본 가상환경 생성
uv venv --python 3.11  # Python 3.11로 가상환경 생성
uv venv --name myenv  # 특정 이름으로 가상환경 생성
uv venv --clear  # 기존 가상환경 삭제 후 새로 생성

# 가상환경 활성화
# macOS/Linux
source .venv/bin/activate  # 기본 가상환경 활성화
source myenv/bin/activate  # 특정 이름의 가상환경 활성화

# Windows
.venv\Scripts\activate  # 기본 가상환경 활성화
myenv\Scripts\activate  # 특정 이름의 가상환경 활성화

# 가상환경 비활성화
deactivate  # 모든 운영체제에서 동일
```

## Python 버전 관리 명령어

```bash
# Python 설치
uv python install 3.11  # Python 3.11 설치
uv python install 3.11.0  # 특정 마이너 버전 설치
uv python install 3.11 --force  # 강제로 재설치

# Python 버전 관리
uv python list  # 설치된 Python 버전 목록
uv python remove 3.11  # Python 3.11 제거
uv python pin 3.11  # 현재 디렉토리의 Python 버전을 3.11로 고정

# 특정 Python 버전 사용
uv run --python 3.11 script.py  # Python 3.11로 스크립트 실행
uv run --python 3.11 -m pytest  # Python 3.11로 pytest 실행
```

## 스크립트 실행 명령어

```bash
# 기본 스크립트 실행
uv run script.py  # script.py 실행
uv run -m module  # Python 모듈 실행

# 의존성과 함께 실행
uv run --with-deps script.py  # 필요한 의존성 설치 후 스크립트 실행
uv run --no-deps script.py  # 의존성 설치 없이 스크립트 실행

# 인자 전달
uv run script.py --arg1 value1 --arg2 value2  # 스크립트에 인자 전달
uv run -m pytest tests/ --verbose  # pytest에 옵션 전달

# 환경 변수 설정
uv run --env VAR1=value1 --env VAR2=value2 script.py  # 환경 변수 설정
```
