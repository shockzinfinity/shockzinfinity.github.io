---
title: Kubernetes
description: Kubenetes 관련 내용을 포함합니다.
tags:
  - kubernetes
  - k8s
created: '2021-01-04'
updated: '2025-10-20'
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

::: tip

- `virt-manager` 구동 시 다음과 같은 에러가 나오는 경우,

```bash{2-3}
$ virt-manager
libGL error: No matching fbConfigs or visuals found
libGL error: failed to load driver: swrast
```

- swrast 드라이버가 없는 경우이기 때문에 관련 드라이버를 설치해줘야 함.
- `apt install mesa-utils libgl1-mesa-glx`
- 관련 URL: [https://github.com/openai/gym/issues/509](https://github.com/openai/gym/issues/509)
  :::

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

### docker, kubernetes 의 cgroup 변경

> kubernetes 에서 권고하는 cgroup driver 를 systemd 로 변경하기 위한 방법
> kubelet 과 docker 는 cgroupfs 를 사용하고, 나머지 프로세스는 systemd 를 사용하도록 설정된 경우, 리소스가 부족해질때 불안정해지는 현상이 발생될 수 있다. 이로 인한 시스템 리소스 부족 현상이 발생할 수 있으므로 리눅스 init 시스템이 사용하는 cgroups 드라이버와 docker, kubelet 의 드라이버를 맞춰주는 것이 효율적이다.

- docker 의 cgroup 확인

```bash
$ docker info
Client:
 Context:    default
 Debug Mode: false
 Plugins:
  app: Docker App (Docker Inc., v0.9.1-beta3)
  buildx: Build with BuildKit (Docker Inc., v0.5.1-docker)

Server:
 Containers: 1
  Running: 1
  Paused: 0
  Stopped: 0
 Images: 1
 Server Version: 20.10.3
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Native Overlay Diff: true
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Cgroup Version: 1
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
 Swarm: inactive
 Runtimes: io.containerd.runtime.v1.linux runc io.containerd.runc.v2
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 269548fa27e0089a8b8278fc4fc781d7f65a939b
 runc version: ff819c7e9184c13b7c2607fe6c30ae19403a7aff
 init version: de40ad0
 Security Options:
  apparmor
  seccomp
   Profile: default
 Kernel Version: 5.8.0-41-generic
 Operating System: Ubuntu 20.04.2 LTS
 OSType: linux
 Architecture: x86_64
 CPUs: 8
 Total Memory: 7.637GiB
 Name: pulseLinux
 ID: U7YY:IBZG:EEGT:U525:O2RL:R6OR:PFD5:FMRN:PXC6:VHLZ:O6FB:6KRA
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false

$ docker info | grep -i cgroup
 Cgroup Driver: cgroupfs
 Cgroup Version: 1
```

> kubernetes 에서는 systemd 를 권고함.

- docker cgroup driver 수정

```bash
$ cat > /etc/docker/daemon.json << EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2",
  "dns": ["8.8.8.8", "8.8.4.4"]
}
EOF

$ systemctl daemon-reload
$ systemctl restart docker
$ docker info
```

### metrics-server 설치

```bash
$ wget https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.3.7/components.yaml

# metrics-server container 의 args 조정
$ vi components.yaml
...
      containers:
      - name: metrics-server
      ...
        args:
        - --cert-dir=/tmp
        - --secure-port=4443
        - --kubelet-insecure-tls
        - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname

$ k apply -f components.yaml
# 확인
$ k -n kube-system get deploy,svc
$ k top node
```
