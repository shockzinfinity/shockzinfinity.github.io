---
title: Docker 사용방법
lang: ko-KR
meta:
  - name: description
    content: docker 사용 및 관련 설정 내용을 다룹니다.
  - name: keywords
    content: docker in centos 8
tags: ['docker']
sidebar: auto
feed:
  enable: true
  title: Docker 사용방법
  description: docker 사용 및 관련 설정 내용을 다룹니다.
  image: /public/img/logo.png
  author:
    - name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/docker.html
---

# Docker

<TagLinks />

:::warning
Podman 의 네트워크 설정 및 compose 기능 미완성으로 인해 당분간 Docker를 사용 (2020년8월24일 기준)
:::

[[toc]]

## Installation on CentOS 8

> Podman 을 삭제하지 않고 진행

```bash
# 안전을 위해 sudo 로 진행
$ sudo dnf makecache
$ sudo dnf install dnf-utils device-mapper-persistent-data lvm2 fuse-overlayfs wget
$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
$ sudo dnf makecache
# CentOS 8은 docker 설치 시 containerd.io 패키지와 podman 패키지 사이의 라이브러리 충돌문제가 있음
# /tmp 디렉토리에서 작업
$ cd /tmp
# containerd.io-1.2.13-3.2.el7.x86_64.rpm 이 현재(20.8.24 기준) 버전
$ wget https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.2.13-3.2.el7.x86_64.rpm
$ sudo dnf localinstall ./containerd.io-1.2.13-3.2.el7.x86_64.rpm # localinstall 은 deprecated 됨
$ sudo dnf install docker-ce docker-ce-cli
$ sudo systemctl status docker
$ sudo systemctl start docker
$ sudo systemctl enable docker
$ sudo systemctl status docker
# docker 커맨드를 sudo 없이 사용하기 위해 그룹 조정
$ sudo usermod -aG docker $(whoami)
$ sudo reboot
# test
$ docker version
$ docker run hello-world

# docker-compose install (release 다운로드 위치: https://github.com/docker/compose/releases) 버전 확인해서 해당 버전으로 변경 후 다운로드
# global install
# /tmp 에서 작업
$ curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o docker-compose
$ sudo mv docker-compose /usr/local/bin && sudo chmod +x /usr/local/bin/docker-compose

# per-user installation
$ sudo dnf install python3-pip
$ pip3.6 install docker-compose --user
$ docker-compose -version

# docker-compose 삭제
$ sudo rm /usr/local/bin/docker-compose
# docker-compose 삭제 (pip 로 설치한 경우)
$ pip3.6 uninstall docker-compose

# podman 삭제는 진행하지 않음
```

## network 설정 (firewalld 관련)

> CentOS 8 상황에서 firewalld 로 인하여 네트워크 rule 추가가 필요함

```bash
# open all IPs starts with "172" so that all the containers may communicate each other
$ firewall-cmd --permanent --zone=public --add-rich-rule='rule family=ipv4 source address=172.0.0.0/8 accept'
# make out container able to visit the network outside
$ firewall-cmd --permanent --zone=public --add-masquerade
# apply the change
$ firewall-cmd --reload
$ cat /etc/firewalld/zones/public.xml
```

## nodetest 관련

> [docker testing](https://github.com/shockzinfinity/docker-test) 에서 소스 확인

```bash
# docker-compose 와 nginx reverse proxy를 이용하여 container load balancing (round-robin)
# 테스트를 위한 port
$ sudo firewall-cmd --zone=public --add-port=4000/tcp --permanent
$ sudo firewall-cmd --zone=public --add-port=27017/tcp --permanent # just for test
$ sudo firewall-cmd --reload

# docker data volume
$ docker volume create --name mongodb_dev
$ docker volume ls

$ docker stop $(docker ps -aq)
$ docker rm $(docker ps -aq)
$ docker system prune -a

$ docker run -d -p 27017:27017 --rm --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=1234 -v mongodb_dev:/data/db mongo

# for test
$ docker run -it -p 3000:3000 --rm --name node -v ~/nodetest:/usr/src/nodetest shockz/nodetest:0.2 # tty output
$ docker run -d -p 3000:3000 --rm --name node -v ~/nodetest:/usr/src/nodetest shockz/nodetest:0.2 # background

# wait-for-it.sh 는 사전에 실행권한 부여
$ chmod +x wait-for-it.sh

# 세부내용은 docker-compose.yaml 참고
$ docker-compose up --build
$ docker-compose up -d # background run
```

::: tip
현재 docker 컨테이너 중지 및 삭제

```bash
$ docker stop $(docker ps -aq)
$ docker rm $(docker ps -aq)
```

:::

## docker image export/import/save/load

1. save / load

- docker 이미지를 tar 로 저장하고 로드

```bash
$ docker save -o nginx.tar nginx:latest
$ docker load -i nginx.tar
```

2. export / import

- container 를 tar 로 저장하고 로드

```bash
$ docker export container_id > temp.tar
$ docker impoort <temp.tar or url> - [image name[:tag name]]
```

::: tip

- export / import 는 컨테이너 동작에 필요한 모든 파일을 포함, 루트 파일시스템 전체가 포함됨
- save / load 는 레이어 구조까지 포함한 형태로 압축
  :::

## Reference

- [Install Docker CE on CentOS 8](https://linuxhint.com/install_docker_ce_centos8/)
- [How to install Docker CE on RHEL 8 / CentOS 8](https://linuxconfig.org/how-to-install-docker-in-rhel-8)
- [Testing with podman - Complete uninstall/reinstall](http://crunchtools.com/testing-with-podman-complete-uninstall-reinstall/)

## docker stats

```bash
$ docker stats
$ docker stats --no-stream
$ docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
$ docker stats --format "table {{.Container}}:       {{.CPUPerc}}"
```

::: tip

- 사용 가능한 format string
- .Container, .Name, .ID, .CPUPerc, .MemUsage, .NetIO, .BlockIO, MemPerc, .PIDs
  :::

## apt 패키지 설치시 사용자 상호 작용 방지

```docker{4}
FROM ubuntu:latest

FROM ubuntu
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y  bash git openssh-server rsync augeas-tools libdbd-mysql-perl python3
...
```

## ENV vs ARG

- ENV
  - 환경변수 지정
  - $변수 혹은 ${변수} 형태로 표현 가능
  - 또한, ${변수:-값}으로 값을 기본값으로 표현 가능
  - ${변수:+값}의 경우는 반대에 경우인데 사용할 일이 있을까 싶다.
  - docker run 시에 --e 옵션을 활용하여 오버라이딩 할 수 있다.
- ARG
  - build 시점에만 사용되는 변수
  - ARG 변수 혹은 ARG 변수=값 형태로 표현 가능
  - ENV처럼 ${변수:+값}, ${변수:-값}으로도 표현 가능
  - docker build 시에 --build-arg 옵션을 활용하여 오버라이딩 할 수 있다.

## CMD vs ENTRYPOINT

- CMD
  - 컨테이너가 시작될 때 실행
  - Dockerfile에서 한번만 사용 가능
  - 마지막 CMD만 사용
  - CMD ["실행 파일", "매개 변수", "매개 변수 ..."]
  - docker run [IMAGE] [COMMAND]에서 COMMAND를 넣으면 CMD가 무시
- ENTRYPOINT
  - CMD와 동일하게 컨테이너가 시작될 때 실행
  - CMD와 같이 있으면 ENTRYPOINT는 실행 파일, CMD는 매개변수 역할을 함
  - docker run --entrypoint="[COMMAND] [IMAGE]"를 사용하여 무시 가능

## ADD vs COPY

- ADD
  - 파일 복사
  - 압축 파일인 경우, 압축을 품
  - 단, URL로 가져온 파일은 압축만 해제하고 풀지는 않음
  - OS에 따라서 압축 해제 여부가 있음
  - 파일은 소유 root:root과 기존 권한을 가짐
  - URL은 소유 root:root과 600 권한을 가짐
- COPY
  - 파일 복사
  - ADD와 달리 파일 그대로 가져옴
  - 권한 그대로 설정
  - 공통적으로 .dockerignore에 명시된 영역은 제외

## docker 재설치

- container 중지 및 삭제

```bash
$ docker stop $(docker ps -q)
$ docker rm $(docker ps -q)
$ docker rmi $(docker images -q)
$ sudo systemctl stop docker
$ sudo systemctl stop containerd
```

- docker 패키지 확인

```bash
$ yum list installed | grep docker
```

- 이전 버전 제거

```bash
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

$ sudo yum erase containerd.io.x86_64
$ sudo yum erase docker-ce.x86_64
$ sudo yum erase docker-ce-cli.x86_64
```

- 관련 파일 삭제

```bash
$ cd /var/lib/docker
# 주의!
$ rm -rf *

$ cd /var/run
# 서비스가 중지됐다면 docker.pid 는 없음
$ rm docker.sock docker.pid
# 주의!
$ rm -rf docker
```

- 설치 시 종속성 관련 에러가 발생되는 경우가 있음
- 기본 저장소에는 containerd 의 버전이 늦는 경우가 있음

```bash
# 확인
$ sudo yum list installed | grep docker

# 저장소 추가
$ sudo yum install -y yum-utils
$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 특정 버전 설치시
$ sudo yum list docker-ce --showduplicates | sort -r

# docker-ce 설치
$ sudo yum install docker-ce
```

- 서비스 시작 및 자동 시작 등록

```bash
$ sudo systemctl enable docker
$ sudo systemctl enable containerd
$ sudo systemctl start docker
$ sudo systemctl start containerd
$ sudo systemctl status docker
$ sudo systemctl status containerd
```

## docker tag

```bash
$ docker tag 0186e4019f7a ghcr.io/shockzinfinity/name:latest
```

## docker shared volume permission denied

- `docker run` 사용 시 `--privileged` 옵션 혹은 `docker-compose.yml` 상에 `privileged: true` 사용

```docker{5}
services:
  service_temp:
    container_name: service_temp
    image: service_temp:latest
    privileged: true
```
