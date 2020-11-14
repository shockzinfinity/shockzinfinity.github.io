---
title: Linux 사용 일반
lang: ko-KR
meta:
  - name: description
    content: Linux 사용에 대한 일반적인 내용을 담고 있습니다.
  - name: keywords
    content: linux
tags: ["linux"]
sidebar: auto
feed:
  enable: true
  title: Linux 사용 일반
  description: Linux 사용에 대한 일반적인 내용을 담고 있습니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/linux.html
---

# Linux General

<TagLinks />

[[toc]]

## 디스크 사용량 및 여유공간 확인

- Disk Usage (du)
   > -h 옵션은 용량을 보기 쉽게...
```bash
# 현재 디렉토리 사용량
$ du -sh

# 현재 디렉토리 하위 모든 디렉토리 사용량
$ du -ch

# 디스크 여유공간 확인
$ df -h
```

## find

```bash
# temp 포함하는 파일 찾기
$ find . -name "*temp*"

# 파일 크기에 따른 검색
# 1024 바이트 초과, 2048 바이트 미만 검색
$ find . -size +1024c -and -size -2048c

# 크기 0인 파일 찾기
$ find . -empty

# find + ls
$ find . -name "*.c" -exec ls -l {} \;
```

| 설명                                                        | 명령                                       |
| ----------------------------------------------------------- | ------------------------------------------ |
| 현재 디렉토리에 있는 파일 및 디렉토리 리스트 표시           | find                                       |
| 대상 디렉토리에 있는 파일 및 디렉토리 리스트 표시           | find [PATH]                                |
| 현재 디렉토리 아래 모든 파일 및 하위 디렉토리에서 파일 검색 | find . -name [FILE]                        |
| 전체 시스템(루트 디렉토리)에서 파일 검색                    | find / -name [FILE]                        |
| 파일 이름이 특정 문자열로 시작하는 파일 검색                | find . -name "STR*"                        |
| 파일 이름에 특정 문자열이 포함된 파일 검색                  | find . -name "*STR*"                       |
| 파일 이름이 특정 문자열로 끝나는 파일 검색                  | find . -name "*STR"                        |
| 빈 디렉토리 또는 크기가 0인 파일 검색                       | find . -empty                              |
| 특정 확장자를 가진 모든 파일 검색 후 삭제                   | find . -name "*.EXT" -delete               |
| 검색된 파일 리스트를 줄 바꿈 없이 이어서 출력하기           | find . -name [FILE] -print0                |
| 파일 또는 디렉토리만 검색하기                               | find . -name [FILE] -type f                |
| 파일 크기를 사용하여 파일 검색                              | find . -size +[N]c -and -size -[M]c        |
| 검색된 파일에 대한 상세 정보 출력. (find + ls)              | find . -name [FILE] -exec ls -l {} \;      |
| 검색된 파일의 라인 수 출력. (find + wc)                     | find . -name [FILE] -exec wc-l {} \;       |
| 검색된 파일에서 문자열 찾기. (find + grep)                  | find . -name [FILE] -exec grep "STR" {} \; |
| 검색 결과를 파일로 저장. (find, redirection)                | find . -name [FILE] > [SAVE_FILE]          |
| 검색 중 에러 메시지 출력하지 않기 (find, redirection)       | find . -name [FILE] 2> /dev/null           |
| 하위 디렉토리 검색하지 않기                                 | find . -maxdepth 1 -name [FILE]            |
| 검색된 파일 복사. (find + cp)                               | find . -name [FILE] -exec cp {} [PATH] \;  |

## ls

```bash
# 리스트 형태로 파일 및 디렉토리 이름만...
$ ls | tr '\n' '\n'
```

## tar.gz

```bash
# 압축
$ tar -zcvf [파일명.tar.gz] [폴더명]

# 풀기
$ tar -zxvf [파일명.tar.gz]
```
