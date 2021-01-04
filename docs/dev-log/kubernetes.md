---
title: Kubernetes
lang: ko-KR
meta:
  - name: description
    content: Kubenetes 관련 내용을 포함합니다.
  - name: keywords
    content: kubernetes
tags: ["kubernetes", "k8s"]
sidebar: auto
feed:
  enable: true
  title: Kubernetes
  description: Kubenetes 관련 내용을 포함합니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/kubernetes.html
---

# Kubernetes (k8s)

<TagLinks />

[[toc]]

## k8s 환경을 위한 kvm 설치 (on Ubuntu 20.04)

```bash
# 리눅스 배포판 확인
$ cat /etc/*-release | uniq
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=20.04
DISTRIB_CODENAME=focal
DISTRIB_DESCRIPTION="Ubuntu 20.04.1 LTS"
NAME="Ubuntu"
VERSION="20.04.1 LTS (Focal Fossa)"
...

# 가상화 가능 여부 체크
$ egrep -c '(vmx|svm)' /proc/cpuinfo
8 # 1 이상이 나와야 함 (보통 cpu 코어 수가 나옴)

# 아래의 명령을 실행해봤을때 실행이 안된다면
$ sudo kvm-ok
# cpu-checker 를 설치
$ sudo apt install cpu-checker

# kvm 관련 패키지 설치
$ sudo apt install qemu qemu-kvm libvirt-daemon libvirt-clients bridge-utils virt-manager
$ sudo kvm-ok
INFO: /dev/kvm exists
KVM acceleration can be used

$ sudo systemctl status libvirtd
● libvirtd.service - Virtualization daemon
     Loaded: loaded (/lib/systemd/system/libvirtd.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2021-01-04 18:09:08 KST; 2s ago
TriggeredBy: ● libvirtd.socket
             ● libvirtd-admin.socket
             ● libvirtd-ro.socket
       Docs: man:libvirtd(8)
             https://libvirt.org
   Main PID: 7232 (libvirtd)
      Tasks: 19 (limit: 32768)
     Memory: 335.7M
     CGroup: /system.slice/libvirtd.service
             ├─1026 /usr/sbin/dnsmasq --conf-file=/var/lib/libvirt/dnsmasq/default.conf --leasefile-ro --dhcp-script=/usr/lib/libvirt/libvirt_lease>
             ├─1027 /usr/sbin/dnsmasq --conf-file=/var/lib/libvirt/dnsmasq/default.conf --leasefile-ro --dhcp-script=/usr/lib/libvirt/libvirt_lease>
             └─7232 /usr/sbin/libvirtd

$ sudo systemctl enable --now libvirtd

# 재부팅이 필요함

$ lsmod | grep -i kvm
kvm_intel             282624  0
kvm                   663552  1 kvm_intel

$ sudo adduser $(id -un) libvirt
$ sudo adduser $(id -un) kvm

# iso 링크가 동작하지 않거나, size 가 너무 작다면 제대로 받아지지 않은것이므로
# http://isoredirect.centos.org/centos/7/isos/x86_64/ 에서 링크 다시 확인
$ curl -O http://mirror.kakao.com/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso
$ sudo mv CentOS-7-x86_64-Minimal-2009.iso /var/lib/libvirt/images
```

### ssh 를 통한 virt-manager 실행을 위한 작업
> ssh 를 통한 virt-manager 접속은 속도가 많이 느림

- [https://www.xquartz.org](https://www.xquartz.org) 에서 XQuartz 다운로드
- `ssh -X host.domain.name -p port-number` 와 같이 접속하며 `virt-manager` 를 실행하면 xquartz 를 통해 GUI 가 실행된다.

### docker, kubernetes 설치 버전 확인

- CentOS 기준
```bash
$ yum list docker-ce.x86-64 --showduplicates
$ yum list kubernetes.x86-64 --showduplicates
```
