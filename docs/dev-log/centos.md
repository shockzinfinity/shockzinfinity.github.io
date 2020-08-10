# Cent OS 설정

> podman.shockz.io

### OS 버전 확인

```bash
$ cat /etc/redhat-release
$ cat /etc/os-release
$ cat /etc/system-release
$ hostnamectl

# 커널 버전 확인
$ uname -s -r
$ uname -a
$ uname -v
```

### update

> 참고: [CentOS 설정](https://wnw1005.tistory.com/category/%EB%A6%AC%EB%88%85%EC%8A%A4/CentOS?page=1)
> 참고2: [CentOS 8 설치 후 기본 설정](https://www.onlab.kr/2020/01/02/centos8-initial-settings/)  
> ![default setting](./image/centos8defaultSetting.jpg)

- yum -> dnf
  > EPEL(Extra Packages of Enterprise Linux)
  > 저장소 리스트 위치 (/etc/yum.repos.d)

```bash
$ sudo dnf upgrade
$ bzip2 /etc/yum.repos.d/CentOS-*.repo # 백업
$ rename -v .repo .bak *.repo # 확장자 변경

```

- 저장소 단일파일 관리

```bash
$ vi /etc/yum.repos.d/default.repo

[AppStream]
name=CentOS-$releasever - AppStream
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=AppStream&infra=$infra
##baseurl=http://mirror.centos.org/$contentdir/$releasever/AppStream/$basearch/os/
baseurl=http://mirror.kakao.com/$contentdir/$releasever/AppStream/$basearch/os/
gpgcheck=1
enabled=1
#gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
gpgkey=http://mirror.kakao.com/centos/RPM-GPG-KEY-CentOS-Official

[BaseOS]
name=CentOS-$releasever - Base
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=BaseOS&infra=$infra
##baseurl=http://mirror.centos.org/$contentdir/$releasever/BaseOS/$basearch/os/
baseurl=http://mirror.kakao.com/$contentdir/$releasever/BaseOS/$basearch/os/
gpgcheck=1
enabled=1
#gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
gpgkey=http://mirror.kakao.com/centos/RPM-GPG-KEY-CentOS-Official


[extras]
name=CentOS-$releasever - Extras
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras&infra=$infra
##baseurl=http://mirror.centos.org/$contentdir/$releasever/extras/$basearch/os/
baseurl=http://mirror.kakao.com/$contentdir/$releasever/extras/$basearch/os/
gpgcheck=1
enabled=1
#gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
gpgkey=http://mirror.kakao.com/centos/RPM-GPG-KEY-CentOS-Official

```

- epel reinstall

```bash
$ dnf reinstall epel-release
```

- remi repo install

```bash
$ dnf reinstall https://rpms.remirepo.net/enterprise/remi-release-8.rpm
# remi repo는 기본적으로 활성화되어 있지 않음 -> 활성화 필요
# enabled=1 로 변경
```

### systemctl 사용법

1. 서비스 재실행(sshd 의 경우)  
   systemctl restart sshd.service
2. 서비스 중지(sshd 의 경우)  
   systemctl stop sshd.service
3. 서비스 시작(sshd 의 경우)  
   systemctl start sshd.service
4. 서비스 상태보기(sshd 의 경우)  
   systemctl status sshd.service
5. 부팅시 서비스 시작하기(sshd 의 경우)  
   systemctl enable sshd.service
6. 부팅시 서비스 시작하지 않음(sshd 의 경우)  
   systemctl disable sshd.service
7. 부팅시 실행되는 서비스인지 검사(sshd의 경우)  
   systemctl is-enabled sshd
8. 서비스 목록보기  
   systemctl list-unit-files --type=service

> [RHEL/CentOS 7 systemctl 사용법](https://www.lesstif.com/system-admin/rhel-centos-7-systemctl-24445064.html)

### /etc/bashrc 수정

![bashrc](./image/bashrc.png)

### Podman 설치

[https://podman.io/getting-started/installation.html](https://podman.io/getting-started/installation.html)
