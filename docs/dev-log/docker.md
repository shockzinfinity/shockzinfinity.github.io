---
sidebar: auto
---

# Docker

> Podman 의 네트워크 설정 및 compose 기능 미완성으로 인해 당분간 Docker를 사용 (2020년8월24일 기준)

### Installation on CentOS 8
> Podman 을 삭제하지 않고 진행
~~~bash
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

# docker-compose install (release 다운로드 위치: https://github.com/docker/compose/releases)
# /tmp 에서 작업
$ curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o docker-compose
$ sudo mv docker-compose /usr/local/bin && sudo chmod +x /usr/local/bin/docker-compose

# per-user installation (현재는 이 방법)
$ sudo dnf install python3-pip
$ pip3.6 install docker-compose --user
$ docker-compose -version

# podman 삭제는 진행하지 않음
~~~

### Reference
- [Install Docker CE on CentOS 8](https://linuxhint.com/install_docker_ce_centos8/)
- [How to install Docker CE on RHEL 8 / CentOS 8](https://linuxconfig.org/how-to-install-docker-in-rhel-8)
- [Testing with podman - Complete uninstall/reinstall](http://crunchtools.com/testing-with-podman-complete-uninstall-reinstall/)
