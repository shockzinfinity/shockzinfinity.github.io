---
title: Podman
lang: ko-KR
meta:
  - name: description
    content: Podman on CentOS 8
  - name: keywords
    content: podman
tags: ["podman", "centos8"]
sidebar: auto
feed:
  enable: true
  title: Podman
  description: Podman on CentOS 8
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/podman.html
---

# Podman

<TagLinks />

> 테스트 환경 : CentOS 8  
> [http://api.shockz.io:8080](http://api.shockz.io:8080)  
> [http://api.shockz.io:8081](http://api.shockz.io:8081)  
> [http://api.shockz.io:8082](http://api.shockz.io:8082)

[[toc]]

## 기본 명령어

> build 및 run

- podman ps -a
- podman pod ls
- podman pod stop _podName_
- podman pod rm -f _podName_ (force)
- podman pod create --name _podName_ -p _hostPort_:_containerInnerPort_
- podman system prune -a (모든 이미지 삭제)
- podman rmi _imageId_
- podman volume ls
- podman volume create _volumeName_
- podman build -t docker.io/shockz(계정명)/imageName:(태그) .
- podman run -itd --pod=_podName_ --name _containerName_ _sourceImageName_

```bash
# pod 생성
# db data 를 위한 volume 생성
$ podman volume create mongodb_dev

# pod 를 이용하면 pod 간 독립적인 네트워크가 생성됨 (rootless)
# rootfull : 루트사용자
# rootless : 일반사용자
# 그러므로 port 연결은 pod 단위로 매핑하여 연결하는 것이 수월함
# -p 8080:3000 => 외부 노출 포트(8080) : pod 내부 포트(3000)
# -p 27017:27017 => 외부(원격지에서 compass 로 확인하기 위한 포트) : pod 내부 mongodb 포트 (27017)
$ podman pod create --name my-pod -p 8080:3000 -p 27017:27017

# 임시 테스트 이미지 생성
# docker.io registry 에 push/pull 을 위해서는 build 시에 registry를 명시해줘야 함
$ podman build -t nodetest:0.1 .
or
$ podman build -t docker.io/shockz/nodetest:0.1 .

# docker.io 에 push/pull 할 경우,
$ podman login docker.io
$ podman push docker.io/shockz/nodetest:0.1
# 확인을 위해 모든 이미지 삭제
$ podman system prune -a
$ podman pull docker.io/shockz/nodetest:0.1

$ podman run -d --rm --pod=my-pod --name nodetest nodetest:0.1
or
$ podman run -itd --rm --pod=my-pod --name nodetest nodetest:0.1

# 외부 테스트를 위한 방화벽 포트 오픈
$ sudo firewall-cmd --zone=public --add-port=8080/tcp
$ sudo firewall-cmd --zone=public --add-port=27017/tcp

# 데이터 볼륨 연결 (vscode ssh development 로 연결할것이기 때문에 소스 변경 후 바로 적용되도록 하기 위함)
# 주의사항 : 데이터 볼륨 연결 덕분에 node_modules 가 재 복사 되는 문제가 발생하므로 별도의 podman volume를 생성할 필요가 있음
$ podman run -d --rm --pod=my-pod --name mongodb --expose 27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=1234 -v mongodb_dev:/data/db mongo # podman volume 사용
$ podman run -itd --rm --pod=my-pod -v /home/shockz/nodetest:/usr/src/nodetest --name nodetest nodetest:0.4 # host 의 파일시스템 연결

# generate YAML & kubernates
$ podman generate kube my-pod >> my-pod.yaml
$ podman play kube ./my-pod.yaml
```

## pod 단위가 아닌 container 단위로 port mapping 시... (rootless 환경)

```bash
$ podman pod create --name servers --share cgroup,ipc,uts
$ podman run -d --rm --pod=servers --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=1234 -v mongodb_dev:/data/db mongo
$ podman run -itd --rm --pod=servers -v /home/shockz/nodetest:/usr/src/nodetest -p 8080:3000 --name nodetest1 nodetest:0.5
$ podman run -itd --rm --pod=servers -v /home/shockz/nodetest:/usr/src/nodetest -p 8081:3000 --name nodetest2 nodetest:0.5
$ podman run -itd --rm --pod=servers -v /home/shockz/nodetest:/usr/src/nodetest -p 8082:3000 --name nodetest3 nodetest:0.5
# 이후 nginx reverse proxy 에서 load balancing...
```

## Reference

- [https://www.redhat.com/sysadmin/container-networking-podman](https://www.redhat.com/sysadmin/container-networking-podman)
- [https://www.redhat.com/sysadmin/compose-podman-pods](https://www.redhat.com/sysadmin/compose-podman-pods)
- [https://developers.redhat.com/blog/2019/01/15/podman-managing-containers-pods/](https://developers.redhat.com/blog/2019/01/15/podman-managing-containers-pods/)
- [https://www.redhat.com/sysadmin/behind-scenes-podman](https://www.redhat.com/sysadmin/behind-scenes-podman)
- [https://balagetech.com/convert-docker-compose-services-to-pods/](https://balagetech.com/convert-docker-compose-services-to-pods/)
- [https://balagetech.com/managing-podman-pods-with-pods-compose](https://balagetech.com/managing-podman-pods-with-pods-compose)
- [https://stackoverflow.com/questions/60558185/is-it-possible-to-run-two-containers-in-same-port-in-same-pod-by-podman](https://stackoverflow.com/questions/60558185/is-it-possible-to-run-two-containers-in-same-port-in-same-pod-by-podman)