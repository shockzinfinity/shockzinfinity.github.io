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
$ du -sh /var/www/vhosts/webroot/wp-content/*

# 현재 디렉토리 하위 모든 디렉토리 사용량
$ du -ch

# depth 지정하여 사용량 현황 보기
$ du -hd 3 /var/www/vhosts/webroot/wp-content/*

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

## ssh 접속 기록, 접속자 현황 등

```bash
# ssh 접속 성공
$ last
# ssh 접속 실패
$ last -f /var/log/btmp

# 현재 로그인한 사용자 
$ user
$ who
$ who -auH
```

## ubuntu firewall

```bash
$ sudo ufw status

$ sudo iptables -L
```

## fail2ban

- 86400분 (60일) 동안
- 10회의 로그인을 실패하면
- 10800분 (180시간) 차단

```bash
$ apt-get install fail2ban

$ vi /etc/fail2ban/jail.conf
```
```bash
[DEFAULT]

## 차단하지 않을 IP
ignoreip = 127.0.0.1/8 192.168.10.0/24

# 접속을 차단할 시간. 600 = 10분
bantime  = 10800

# 최대 허용 횟수
maxretry = 10

#아래 시간동안 maxretry횟수만큼 실패시 차단
findtime  = 86400

# (선택) 메일 알림기능
destemail = sysadmin@example.com
sender = fail2ban@my-server.com
mta = sendmail
action = %(action_mwl)s

[sshd]
enabled = true

#여러 포트를 사용할 경우 port = ssh,10022
port = 22
filter = sshd
logpath = /var/log/auth.log
```
```bash
$ service fail2ban restart

# 현재 차단 현황
$ fail2ban-client status sshd

# 차단 풀기
$ fail2ban-client set sshd unbanip 000.000.000.000
```

## ubuntu update
> apt 는 apt-get 과 apt-cache 의 기능 중에서 잘 사용되지 않는 기능을 제외하고 만든 새로운 tool 이다.  
> apt-get 은 패키지 설치를 담당하고, apt-cache 는 패키지 검색을 담당하는 tool 이다.  
> apt-get 보다는 apt 사용이 권장된다.  
> apt (Advanced Packaging Tool)

```bash
# 업데이트 목록 갱신
$ sudo apt update

# 현재 패키지 업그레이드
$ sudo apt upgrade

# 신규 업데이트 설치
$ sudo apt dist-upgrade
```

## ubuntu booting usb on mac

- usb umount 상태에서 시작
- [ubuntu image download](https://releases.ubuntu.com/20.04/) - 여기서는 desktop image 로 시작
- iso -> img
- .img.dmg 형태로 변환되어 저장되니, .dmg 를 삭제
```bash
$ hdiutil convert -format UDRW -o ~/Downloads/ubuntu-20.04.1-desktop-amd64.img ~/Downloads/ubuntu-20.04.1-desktop-amd64.iso
$ mv ~/Downloads/ubuntu-20.04.1-desktop-amd64.img.dmg ~/Downloads/ubuntu-20.04.1-desktop-amd64.img
```
- disk number 확인
- mount 되어 있다면 unmount 해야 만들수 있음.
```bash
$ diskutil list
$ diskutil unmountDisk /dev/disk2
$ sudo dd if=~/Downloads/ubuntu-20.04.1-desktop-amd64.img of=/dev/disk2 bs=1m
```
- 설치할 머신에서 해당 usb 로 부팅하여 설치 시작
- desktop 버전은 설치된 이후 기본적으로 ssh 가 비활성화 되어 있기때문에 ssh 는 별도 설치가 필요함
```bash
# on ubuntu machine
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install openssh-server
# 보안관련 설정 수정
$ sudo vi /etc/ssh/sshd_config

Port 22000
PermitRootLogin no
UsePrivilegeSeparation yes
PermitEmptyPasswords no
#PubkeyAuthentication yes # 추후 설정
#PasswordAuthentication no # 추후 설정
MaxAuthTries 5
LoginGraceTime 30

$ sudo systemctl enable ssh
$ sudo systemctl start ssh
```
::: tip
- ssh 키 복사 (대상: 192.168.10.1 일 경우)
```bash
$ ssh-copy-id -i ~/.ssh/id_rsa.pub temp@192.168.10.1
```
:::
